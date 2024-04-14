import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BoardUgcVO } from "./vo/board.vo";
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, IconButton, Pagination, SpeedDial, SpeedDialAction, Typography } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import ModeIcon from '@mui/icons-material/Mode';
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RecommendUgcs from "./RecommnedUgcs";
import CommonPagination from "../common/CommonPagination";

export default function Ugcs() {
    const [ugcs,setUgcs] = useState([] as BoardUgcVO[]);
    const [bestUgcs,setBestUgcs] = useState([] as BoardUgcVO[]);
    const navigate = useNavigate();
    const childComponentRef = useRef();

    const actions = [
      { icon: <ShareIcon />, name: 'Share' },
      { icon: <ModeIcon />, name: 'new', onclick: ()=>{navigate("/ugc/new")} },
    ];    

    // const onSearch = () => {
    //   axios.get("/board/ugcs").then((r)=>{
    //     setUgcs(r.data);
    //   })
    // }
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

    const contents = () => {
      return (
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
                          <IconButton onClick={(event)=>{event.stopPropagation(); btnLiked(item)}} aria-label="delete">
                            {
                                item.isLiked?   
                                <Favorite color="error"/>
                                :<FavoriteBorder color="error"/>
                            }
                          </IconButton>
                        </CardContent>
                      </Card>
                    </CardActionArea>  
            })
          }
        </Box>
      ) as JSX.Element
  }

    // useEffect(()=>{
    //   onSearch();
    // },[])
    return(
        <Container maxWidth="lg" sx={{ py: 5, height: '100%'}}>
          <RecommendUgcs/>
          <Grid container>
            <Grid item md={12}>
              <CommonPagination ref={childComponentRef} dataUrl={"/board/ugcs"} updateItem={setUgcs} content={contents()} />
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