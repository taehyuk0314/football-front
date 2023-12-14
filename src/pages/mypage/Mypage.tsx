import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MypageVO } from "./vo/mypage.vo";
import { useSelector } from "react-redux";

export default function Mypage() {
    const [member,setMember] = useState({} as MypageVO)
    // const memNm = useSelector((state: any) => state);
    useEffect(()=>{
        axios.get("/mypage").then((r)=>{
            setMember(r.data);
        })
    },[])
    return(
        <Container maxWidth="md">
            <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    {member.memNm}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Mac Miller
                </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                </Box>
            </Box>
            </Card>
            <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                </Box>    
            </Card>        
        </Container>
    )
}