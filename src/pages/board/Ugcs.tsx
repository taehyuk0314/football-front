import axios from "axios";
import React, { useEffect, useState } from "react";
import { BoardUgcVO } from "./vo/board.vo";
import { Avatar, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, SpeedDial, SpeedDialAction } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import ModeIcon from '@mui/icons-material/Mode';
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

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

    }

    useEffect(()=>{
      axios.get("/board/ugcs").then((r)=>{
        setUgcs(r.data);
      })
    },[])
    return(
        <Container maxWidth="lg" sx={{ py: 5, height: '100%'}}>
          <Grid>
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper: SwiperClass) => console.log(swiper)}
            >
              <SwiperSlide>Slide 1</SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>          
          </Grid>
          <List>
          {ugcs.map(( item, index) => (
            <ListItem key={index} onClick={()=>{navigate("/ugc/"+item.boardNo)}}>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={"/board/:id"} />
              </ListItemAvatar>
              <ListItemText primary={item.title} secondary={item.contents} />
            </ListItem>
          ))}
          </List>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 100, right: 16 }}
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