import axios from "axios";
import React, { useEffect, useState } from "react";
import { BoardUgcVO } from "./vo/board.vo";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export default function Ugcs() {
    const [ugcs,setUgcs] = useState([] as BoardUgcVO[]);
    useEffect(()=>{
      axios.get("/board/ugcs").then((r)=>{
        setUgcs(r.data);
      })
    },[])
    return(
        <List>
        {ugcs.map(( item, index) => (
          <ListItem button key={index}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={"/board/:id"} />
            </ListItemAvatar>
            <ListItemText primary={item.title} secondary={item.contents} />
          </ListItem>
        ))}
      </List>
    )
}