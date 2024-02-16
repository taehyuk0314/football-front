import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { OrderVO } from "./vo/order.vo";
import { Avatar, Button, Card, Container, Divider, List, ListItem, ListItemAvatar, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { getNumber } from "../../commonUtils";

export default function Order() {
    const [order, setOrder] = useState({} as OrderVO);
    const params = useParams();
    const navigation = useNavigate();

    const btnPayment = () =>{
        axios.post(`/order/${params.orderNo}`,order).then(()=>{
            navigation("/payment")
        })
    }
    const totalPrice = () => {
        if(!order.products) {
            return 0;
        }
        const price = order.products.map(a => a.totalPrice).reduce(function(a, b)
        {
          return a + b;
        });
        return getNumber(price)+ "원"
    }
    useEffect(()=>{
        axios.get("/order/"+params.orderNo).then((r: any)=>{
            if(!r.data.orderNo) {
                navigation("/payment/complete");
            }
            setOrder(r.data);
        }) 
    },[])

    return(
        <Container maxWidth="lg" sx={{ py: 5, height: '100%',width:'100%'}}>
            <Card>
                <Typography sx={{ py:3}} variant="h5" color="text.secondary" component="div">
                  배송지
                </Typography>                      
            </Card>
            <Card sx={{px:3, pb:3}}>
                <Typography sx={{ py:3}} variant="h5" color="text.secondary" component="div">
                  주문 상품
                </Typography> 
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>상품명</TableCell>
                            <TableCell align="right">갯수</TableCell>
                            <TableCell align="right">할인금액</TableCell>
                            <TableCell align="right">주문금액</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {order.products && order.products.map((item)=>{
                            return <TableRow
                            key={item.seq}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.productNm}
                                        secondary={
                                            <Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                        >
                                            옵션: 
                                        </Typography>
                                            {item.optionNm}
                                        </Fragment>
                                        }
                                    />
                                </TableCell>
                                <TableCell align="right">{getNumber(item.orderCnt)} 개</TableCell>
                                <TableCell align="right">{getNumber(item.discountPrice)}</TableCell>
                                <TableCell align="right">{getNumber(item.totalPrice)}원</TableCell>
                            </TableRow>
                        })}
                        </TableBody>
                    </Table>
                    </TableContainer>                
            </Card>
            <Card sx={{px:3}}>
                <Typography sx={{ py:3}} variant="h5" color="text.secondary" component="div">
                  총 금액
                  <Button 
                    sx={{mt: 5,  height:100, width:'100%', bgcolor:'black', fontSize:30 }}                                         
                    variant="contained" 
                    onClick={btnPayment}
                >
                    구매하기 {totalPrice()}
                </Button>                    
                </Typography>  

            </Card>
        </Container>
    )

}