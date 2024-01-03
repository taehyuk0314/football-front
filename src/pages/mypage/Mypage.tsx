import { Avatar, Grid, ListItemText, MenuItem, MenuList, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { MypageVO } from "./vo/mypage.vo";

export default function Mypage() {
    const [member,setMember] = useState({} as MypageVO)
    useEffect(()=>{
        console.log("dddd")
        axios.get("/mypage").then((r)=>{
            if(r && r.data) {
                setMember(r.data);
            }
        })
    },[])
    return(
        <>
            <Grid sx={{ display:'flex', bgcolor: 'black', px: 5, py: 10 }}>
                <Avatar sx={{ width: 56, height: 56 }} alt="Profile Picture"/>
                <Typography color={"white"} component="div" variant="h3">
                    {member && member.memNm} 
                </Typography>
                <Typography variant="subtitle1" color={"white"} component="div">
                    일반회원
                </Typography>
            </Grid>
            <Grid container spacing={2} sx={{ display: 'flex', px: 5, pt: 3,  pb: 10}}>
                <Grid item xs={6} md={2}>
                    <MenuList dense>
                        <Typography  component="div" variant="h6">
                            나의 쇼핑 활동 
                        </Typography>                
                        <MenuItem>
                            <ListItemText>구매후기</ListItemText>
                        </MenuItem>
                        <MenuItem>
                        <ListItemText>주문내역조회</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText>1:1 문의</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText>좋아요</ListItemText>
                        </MenuItem>
                        <Typography  component="div" variant="h6">
                            내 정보 
                        </Typography>                       
                        <MenuItem>
                            <ListItemText>내 정보 수정</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Grid>
                <Grid item xs={6} md={10}>
                    dd
                </Grid>
            </Grid>
        </>
    )
}