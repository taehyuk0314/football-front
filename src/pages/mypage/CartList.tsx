import { Avatar, Container, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { CartMasterVO } from "./vo/mypage.vo";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import axios from "axios";

export default function CartList(props: any) {
    const [carts,setCarts] = useState([] as CartMasterVO[]);

    const btnDeleteCart = (product:CartMasterVO) =>{
        const params = product;
        axios.delete("/mypage/cart",{ params }).then(()=>{
            let findOrder = carts.findIndex(item => item.cartNo === product.cartNo);
        
            let copiedItems = [...carts];
    
            copiedItems.splice(findOrder,1 );
            setCarts(copiedItems);            
            
        })
    }
    useEffect(()=>{
        setCarts(props.products)
    },[props])

    return(
        <Container maxWidth="md">
          {
            carts && carts.length > 0?
            <List>
            {
                  
                carts.map((item: CartMasterVO)=>{
                  return <ListItem 
                              key={item.cartNo}
                              secondaryAction={
                                  <IconButton onClick={()=>{btnDeleteCart(item)}} edge="end" aria-label="delete">
                                    <DeleteIcon />
                                  </IconButton>
                                }
                          >
                              <ListItemAvatar>
                                  <Avatar alt="Profile Picture"/>
                              </ListItemAvatar>
                              <ListItemText primary={item.productNm+"["+item.optionNm+"]"} secondary={item.optionCnt?"남은재고: "+item.optionCnt:""} />
                          </ListItem>
                })
            } 
          </List>:
          <div>장바구니 담긴 상품이 없습니다.</div>
         }  
        </Container>
    )
}