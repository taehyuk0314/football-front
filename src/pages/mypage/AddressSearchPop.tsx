import { Button, Card, Checkbox, DialogContent, DialogTitle, FormControlLabel, InputLabel, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { ChangeEvent, Fragment, forwardRef, useEffect, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { MemberDeliveryVO } from '../member/vo/member.vo';

export interface Props {
  addr: any;
}
const AddressSearchPop =forwardRef(
  ({
    addr        
  }: Props,ref
) => {

    const [deliveries, setDeliveries] = useState([] as MemberDeliveryVO[]);
    const [delivery, setDelivery] = useState({} as MemberDeliveryVO);
    const open = useDaumPostcodePopup();

    const handleComplete = (data: any) => {
      let param = {} as MemberDeliveryVO;
      param.postNo = data.zonecode;
      param.city = data.sido;
      param.addr = data.address;
      param.addrType = data.userSelectedType == 'R' ? '01': '02';
      setDelivery(param);
    }; 

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setDelivery({
        ...delivery, 
        [name]: value 
      });
    };

    const handleClick = () => {
      open({ onComplete: handleComplete });
    };
    const save = () => {
      axios.post("/mypage/delivery",delivery).then(()=>{
        addressList();
      })
    }

    const updateAddr = (item: MemberDeliveryVO) =>{
      addr(item)
    }
    const addressList = () =>{
      axios.get("/mypage/deliveries").then((r)=>{
        setDeliveries(r.data);
        setDelivery({} as MemberDeliveryVO);
      })
    }
    const modify = () => {

    }
    useEffect(()=>{
      addressList();
    },[])
    
    return (
    <>
      <DialogTitle sx={{ display: 'flex', justifyContent:'space-between' }}>
        <div>
          배송지 조회
        </div>
        <Button          
          onClick={handleClick}
        >
            배송지 추가
        </Button>
      </DialogTitle>
      <DialogContent>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          { delivery.addr &&
            <ListItem sx={{ display: 'flex', flexDirection: 'column' }} alignItems="flex-start"> 
              <Typography variant="h5" component="div">
                {delivery.addr}
              </Typography>              
              <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                받는 사람: <TextField sx={{ my:1, width: '50ch' }} onChange={onChange} name='recvNm' value={delivery.recvNm || ""} id="outlined-basic" label="받는 사람" variant="outlined" />
              </InputLabel>
              <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                주소 상세: <TextField sx={{ my:1, width: '50ch' }} onChange={onChange} name='addrDetail' value={delivery.addrDetail || ""} id="outlined-basic" label="주소 상세" variant="outlined" />
              </InputLabel>
              <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                전화 번호: <TextField sx={{ my:1, width: '50ch' }} onChange={onChange} name='hpNo' value={delivery.hpNo || ""} id="outlined-basic" label="전화번호" variant="outlined" />
              </InputLabel>
              <InputLabel sx={{ width:'100%', display: 'flex', justifyContent:'space-between' }}>
                <div>
                  기본 배송지 : <Checkbox name="defaultDlvryYn" onChange={onChange} checked={delivery.defaultDlvryYn} defaultChecked />
                </div>
                <Button variant="contained" onClick={save}>저장</Button>
              </InputLabel>
            </ListItem>
          }
          {
            deliveries && deliveries.map((item)=>{
              return <ListItem key={item.deliveryNo} sx={{ width:'100%', display: 'flex', flexDirection: 'column' }} alignItems="flex-start"> 
                        <Typography variant="h5" component="div">
                          {item.recvNm}
                        </Typography> 
                        <ListItemText>
                          주소 : {item.addr+"("+ item.addrDetail+")"}
                        </ListItemText>
                        <InputLabel sx={{ width:'100%', display: 'flex', justifyContent:'space-between' }}>
                          <Button variant="contained" onClick={modify}>수정</Button>
                          <Button variant="contained" onClick={()=>{updateAddr(item)}}>선택</Button>
                        </InputLabel>
                      </ListItem> 
            })
          }
        </List>
      </DialogContent>
    </>
  )
})
export default AddressSearchPop