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

export default function Ugcs() {
    const [ugcs,setUgcs] = useState([] as BoardUgcVO[]);
    const [bestUgcs,setBestUgcs] = useState([] as BoardUgcVO[]);
    const [recommendUgcs,setRecommendUgcs] = useState([] as BoardUgcVO[]);
    const [category, setCategory] =useState("");
    const navigate = useNavigate();
    const actions = [
      { icon: <ShareIcon />, name: 'Share' },
      { icon: <ModeIcon />, name: 'new', onclick: ()=>{navigate("/ugc/new")} },
    ];    

    const onSearch = () => {
      axios.get("/board/ugcs").then((r)=>{
        setUgcs(r.data);
      })
    }
    const btnLiked = (item: BoardUgcVO) =>{
      const params = { likeTypeCd: "003001", targetNo : item.boardNo };
      let findLiked = ugcs.findIndex(ugc => ugc.boardNo === item.boardNo);
      let copiedItems = [...ugcs];            
      if (!item.isLiked) {
        axios.post(`/board/like`, params).then(() => {
      
          copiedItems[findLiked].isLiked = true;
          setUgcs(copiedItems);
          return;
        });
        return;
      }
      axios.delete(`/board/like`, { params }).then(() => {
          copiedItems[findLiked].isLiked = false;
          setUgcs(copiedItems);            
        return;
      });        
  }
    useEffect(()=>{
      axios.get("/board/special-ugcs").then((r: any)=>{
        if(r && r.data) {
          console.log(r.data)
          setRecommendUgcs(r.data.recommendUgcs);
        }
      })
      onSearch();
    },[])
    return(
        <Container maxWidth="lg" sx={{ py: 5, height: '100%'}}>
          {
            
            (recommendUgcs && recommendUgcs.length) && 
            <>
              <Typography sx={{ py:3}} variant="h5" color="text.secondary" component="div">
                추천 커뮤니티
              </Typography>               
              <Grid>
                <Swiper
                  spaceBetween={50}
                  slidesPerView={3}
                  onSlideChange={() => console.log('slide change')}
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
          <Grid container>
            <Grid item md={12}>
              <Box
                sx={{
                  position: 'flex'
                }}
              > 
                {
                  ugcs.map((item) => {
                  return <CardActionArea sx={{my:2}}  key={item.boardNo} component="a" onClick={()=>{navigate("/ugc/"+item.boardNo)}}>
                            <Card sx={{ display: 'flex' }}>
                              <CardMedia
                                component="img"
                                sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                                image="https://source.unsplash.com/random?wallpapers"
                              />
                              <CardContent sx={{ flex: 1 }}>
                                <Typography component="h2" variant="h5">
                                  {item.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                  {item.regDt}
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                  {item.contents}
                                </Typography>
                              </CardContent>
                              <CardContent sx={{ width:'10%', display:'flex' }}>
                                <IconButton onClick={()=>{btnLiked(item)}} aria-label="delete">
                                  {
                                      item.isLiked?   
                                      <Favorite color="error"/>
                                      :<FavoriteBorder/>
                                  }
                                </IconButton>
                              </CardContent>
                            </Card>
                          </CardActionArea>  
                  })
                }
              </Box>
            </Grid>
          </Grid>            
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 100, right: 30 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action,index) => (
              <SpeedDialAction
                key={index}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.onclick}
              />
            ))}
          </SpeedDial>
        </Container>
    )
}