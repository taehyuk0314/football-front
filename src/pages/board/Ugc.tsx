import { Avatar, Box, Button, Card, CardContent, CardMedia, Container, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoardReplyVO, BoardUgcVO } from "./vo/board.vo";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import MessageIcon from '@mui/icons-material/Message';
import CommonReadMore from "../common/CommonReadmore";

export default function Ugc() {
    const params = useParams();
    const navigation = useNavigate();
    const [board,setBoard] = useState({} as BoardUgcVO);
    const [reply,setReply] = useState({} as BoardReplyVO);
    const [replies,setReplies] = useState([] as BoardReplyVO[]);
    const [param,setParam] = useState({ dataUrl:"/board/ugc/replies/"+params.boardNo} as any);

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
    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        const { value, name } = e.target;
        setReply({...reply,[name]: value});
    };
    const insertReply = () => {
        axios.post("/board/reply",reply).then(()=>{
            setReply({...reply,contents:""});
        })
    }
    const contents = () => {
        console.log("1"+replies)
        return (
            <div>
                {
                    replies && replies.map((item)=>{
                        return <div key={item.replyNo}>
                            {item.contents}
                        </div>
                    })
                }
            </div>
        ) as JSX.Element
    }

    useEffect(()=>{
        setReply({...reply, boardNo: Number(params.boardNo)})
        axios.get(`/board/ugc/${params.boardNo}`).then((r: any)=>{
            if(r && r.data) {
              setBoard(r.data);
            }
          })        
    },[params.boardNo])

    return(
        <>
        
            <Container maxWidth="lg" sx={{ py: 5, height: '100%',width:'100%'}}>
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
                <CommonReadMore dataUrl={param.dataUrl} updateItem={setReplies} content={contents()} />
            </Container>
            <Box maxWidth="lg" 
                sx={{ px:0, position: 'fixed',bottom:0 ,borderRadius: '16px',justifyContent: "center", margin: '0 auto', left: 0, right: 0}}
            >
                <Card 
                    sx={{ 
                        border:1,
                        borderRadius: '16px',
                        alignItems: 'center',
                        backgroundColor:'white',
                        display: 'flex'
                    }}
                >
                    <Grid sx={{width:'80%'}}>
                        <TextField 
                            name="contents"
                            placeholder="소중한 댓글을 달아주세요."
                            multiline
                            onChange={handleChange}
                            sx={{ width:'100%' }} 
                            color="success"
                            rows={2}
                            />
                    </Grid>
                    <Grid sx={{width:'20%'}}>
                        <Button 
                            onClick={()=>{insertReply()}}
                            sx={{
                                width:'100%'
                            }}
                            color="inherit"
                            startIcon={
                                <MessageIcon />
                            }
                        >
                            댓글달기
                        </Button>                
                    </Grid>
                </Card>                
            </Box>         
        </>
    )
}