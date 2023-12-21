import axios from "axios";
import React, { useEffect, useState } from "react";
import { BoardUgcVO } from "./vo/board.vo";
import { Avatar, Container, List, ListItem, ListItemAvatar, ListItemText, SpeedDial, SpeedDialAction } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import ModeIcon from '@mui/icons-material/Mode';
import { useNavigate } from "react-router-dom";

export default function Ugcs() {
    const [ugcs,setUgcs] = useState([] as BoardUgcVO[]);
    const navigate = useNavigate();
    const actions = [
      { icon: <ShareIcon />, name: 'Share' },
      { icon: <ModeIcon />, name: 'new', onclick: ()=>{navigate("/ugc/new")} },
    ];    
    useEffect(()=>{
      axios.get("/board/ugcs").then((r)=>{
        setUgcs(r.data);
      })
    },[])
    return(
        <Container maxWidth="md">
          <List>
          {ugcs.map(( item, index) => (
            <ListItem key={index}>
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
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.onclick}
              />
            ))}
          </SpeedDial>
        </Container>
    )
}