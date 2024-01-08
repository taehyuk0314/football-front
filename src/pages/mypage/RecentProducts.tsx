import { Avatar, Container, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { CartMasterVO } from "./vo/mypage.vo";
import axios from "axios";
import { getLocalStorageObject } from "../../commonUtils";
import Constants from "../../constants";
import { useNavigate } from "react-router-dom";

export default function RecentProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([] as CartMasterVO[]); 
    const recentList = () => {
        let recentProducts = getLocalStorageObject(Constants.RECENT_PRODUCTS);
        recentProducts = recentProducts.filter((i: string | number) => {
            try {
              return Number(i);
            } catch (e) {
              return false;
            }
        });
        axios.post("/mypage/recent-products",recentProducts).then((r)=>{
            setProducts(r.data);
        })
    } 
    useEffect(()=>{
        recentList();
    },[])
    return (
        <Container maxWidth="md">
          {
            products && products.length > 0?
            <List>
            {
                products.map((item: CartMasterVO)=>{
                  return <ListItem 
                              key={item.productNo}
                              secondaryAction={
                                <></>
                            }
                          >
                              <ListItemAvatar>
                                  <Avatar alt="Profile Picture"/>
                              </ListItemAvatar>
                              <ListItemText 
                                sx={{ cursor:"pointer"}} 
                                onClick={()=>navigate("/product/"+item.productNo)} 
                                primary={item.productNm} 
                                secondary={item.brandNm} 
                              />
                          </ListItem>
                })
            } 
          </List>:
          <div>최근 본 상품이 없습니다.</div>
         }  
        </Container>
    )
} 