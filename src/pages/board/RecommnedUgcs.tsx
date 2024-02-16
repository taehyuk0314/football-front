import axios from "axios";
import React, { useEffect, useState } from "react";
import { BoardUgcVO } from "./vo/board.vo";
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, IconButton, SpeedDial, SpeedDialAction, Typography } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import ModeIcon from '@mui/icons-material/Mode';
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Favorite, FavoriteBorder } from "@mui/icons-material";

export default function RecommendUgcs() {
    const [recommendUgcs,setRecommendUgcs] = useState([] as BoardUgcVO[]);
    const navigate = useNavigate();

    const btnLiked = (item: BoardUgcVO) =>{
      const params = { likeTypeCd: "003001", targetNo : item.boardNo };
      let findLiked = recommendUgcs.findIndex(ugc => ugc.boardNo === item.boardNo);
      let copiedItems = [...recommendUgcs];            
      if (!item.isLiked) {
        axios.post(`/board/like`, params).then(() => {
          copiedItems[findLiked].isLiked = true;
          setRecommendUgcs(copiedItems);
          return;
        });
        return;
      }
      axios.delete(`/board/like`, { params }).then(() => {
        copiedItems[findLiked].isLiked = false;
        setRecommendUgcs(copiedItems);       
        return;
      });        
    }
    
    useEffect(()=>{
      axios.get("/board/special-ugcs").then((r: any)=>{
        if(r && r.data) {
          setRecommendUgcs(r.data.recommendUgcs);
        }
      })
    },[])

    return(
          <>
            {
              (recommendUgcs && recommendUgcs.length) && 
              <>
                <Typography sx={{ py:3}} variant="h5" color="text.secondary" component="div">
                  추천 커뮤니티
                </Typography>               
                <Grid>
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={3.3}
                    onSwiper={(swiper: SwiperClass) => console.log(swiper)}
                  >
                    {
                      recommendUgcs.map((item: BoardUgcVO)=>{
                          return  <SwiperSlide key={item.boardNo}>
                                    <CardActionArea sx={{my:2}} component="a" onClick={()=>{navigate("/ugc/"+item.boardNo)}}>
                                      <Grid item xs={12} sm={6} md={4}>
                                        <Card
                                          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                        >
                                          <CardMedia
                                            component="div"
                                            sx={{
                                              // 16:9
                                              pt: '56.25%',
                                            }}
                                            image="https://source.unsplash.com/random?wallpapers"
                                          />
                                          <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                              { item.title }
                                            </Typography>
                                            <Typography>
                                            { item.contents }
                                            </Typography>
                                          </CardContent>
                                        </Card>
                                      </Grid>      
                                    </CardActionArea>                    
                                  </SwiperSlide>
                      })
                    }
                  </Swiper>          
                </Grid>
              </>
            }
        </>
    )
}