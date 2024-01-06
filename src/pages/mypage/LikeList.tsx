import { Avatar, Container, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { CartMasterVO } from "./vo/mypage.vo";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LikeList(props: any) {
    const [likes,setLikes] = useState([] as CartMasterVO[]);

    const btnLiked = (item: CartMasterVO) =>{
        const params = { likeTypeCd: "003002", targetNo : item.productNo };
        let findLiked = likes.findIndex(item => item.likeNo === item.likeNo);
        let copiedItems = [...likes];            
        if (!item.isLiked) {
          axios.post(`/product/like`, params).then(() => {
        
            copiedItems[findLiked].isLiked = true;
            setLikes(copiedItems);
            return;
          });
          return;
        }
        axios.delete(`/product/like`, { params }).then(() => {
            copiedItems[findLiked].isLiked = false;
            setLikes(copiedItems);            
          return;
        });        
    }
    useEffect(()=>{
        setLikes(props.products)
    },[props])

    return(
        <Container maxWidth="md">
          {
            likes && likes.length > 0?
            <List>
            {
                likes.map((item: CartMasterVO)=>{
                  return <ListItem 
                              key={item.likeNo}
                              secondaryAction={
                                  <IconButton onClick={()=>{btnLiked(item)}} edge="end" aria-label="delete">
                                    {
                                        item.isLiked?   
                                        <Favorite color="error"/>
                                        :<FavoriteBorder/>
                                    }
                                  </IconButton>
                                }
                          >
                              <ListItemAvatar>
                                  <Avatar alt="Profile Picture"/>
                              </ListItemAvatar>
                              <ListItemText primary={item.productNm} secondary={item.brandNm} />
                          </ListItem>
                })
            } 
          </List>:
          <div>좋아요한 상품이 없습니다.</div>
         }  
        </Container>
    )
}