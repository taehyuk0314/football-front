import axios from "axios";
import React from "react";
import { BoardUgcVO } from "./vo/board.vo";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export default class Ugcs extends React.Component<any,any>{
    state = {
        ugcs: [] as BoardUgcVO[]
    }
    componentDidMount(): void {
        axios.get("/board/ugcs").then((r)=>{
            this.setState({
              ugcs: r.data    
            });
        })
    }
    render(): React.ReactNode {
        const { ugcs } = this.state;
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
}