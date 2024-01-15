import { Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoardUgcVO } from "./vo/board.vo";

export default function Ugc() {
    const params = useParams();
    const navigation = useNavigate();
    const [board,setBoard] = useState({} as BoardUgcVO);
    useEffect(()=>{
        axios.get(`/board/ugc/${params.boardNo}`).then((r: any)=>{
            if(r && r.data) {
              setBoard(r.data);
            }
          })        
    },[params.boardNo])
    return(
        <Container maxWidth="lg" sx={{ py: 5, height: '100%'}}>
            <Card sx={{ display: 'flex', width:'100%', flexDirection: 'column'}}>
                <CardMedia
                    component="div"
                    sx={{ width: '100%', pt: '50%', display:'flex', alignItems:'center' }}
                    image="https://source.unsplash.com/random?wallpapers"
                /> 
                <CardContent sx={{ flex: '1' }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    { board.title }
                    </Typography>
                    <Typography>
                    { board.contents }
                    </Typography>                    
                </CardContent>
            </Card>           
        </Container>
    )
}