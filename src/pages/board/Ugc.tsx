import { Avatar, Button, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoardUgcVO } from "./vo/board.vo";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import MessageIcon from '@mui/icons-material/Message';

export default function Ugc() {
    const params = useParams();
    const navigation = useNavigate();
    const [board,setBoard] = useState({} as BoardUgcVO);

    const btnLiked = () =>{
        const params = { likeTypeCd: "003001", targetNo : board.boardNo };
        if (!board.isLiked) {
          axios.post(`/board/like`, params).then(() => {
            setBoard({...board,isLiked: true,likeCnt: board.likeCnt++});
            return;
          });
          return;
        }
        axios.delete(`/board/like`, { params }).then(() => {
            setBoard({...board,isLiked: false,likeCnt: board.likeCnt--});
          return;
        });        
    }

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
                <CardContent sx={{ flex: '1',  display:'flex', alignItems: 'center'}}>
                    <Button 
                        sx={{ flex: '1', justifyContent: 'flex-start' }}
                        color="inherit"
                        startIcon={ 
                            <Avatar src="/broken-image.jpg" />
                        }
                    >
                        { board.nickNm}님
                    </Button>
                    <Typography gutterBottom variant="body1">
                        작성일 : { board.regDt }
                    </Typography>
                </CardContent>
                <CardContent sx={{ flex: '1' }}>
                <Button 
                    color="inherit"
                    onClick={()=>{btnLiked()}}
                    startIcon={
                        board.isLiked?   
                        <Favorite color="error"/>
                        :<FavoriteBorder color="error"/>
                    }
                >
                    좋아요 { board.likeCnt}
                </Button>
                <Button 
                    color="inherit"
                    startIcon={
                        <MessageIcon />
                    }
                >
                    댓글 
                </Button>
                </CardContent>
            </Card>           
        </Container>
    )
}