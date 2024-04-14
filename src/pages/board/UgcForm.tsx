import { Button, Card, Container, Grid, TextField, TextareaAutosize, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { CodeMasterVO } from "../common/vo/code.vo";
import axios from "axios";
import { BoardUgcVO } from "./vo/board.vo";
import { useNavigate } from "react-router-dom";

export default function UgcForm() {
    const [codes,setCodes] = useState([] as CodeMasterVO[]);
    const [ugc, setUgc] = useState({} as BoardUgcVO);
    const navigate = useNavigate();
    const save = () =>{
        console.log(ugc)
        if(!ugc.ugcTypeCd) {
            alert("카테고리를 선택해주세요");
            return;
        } 
        if(!ugc.title || !ugc.title.trim()) {
            alert("제목을 입력해주세요");
            return;
        } 
        if(!ugc.contents || !ugc.contents.trim()) {
            alert("내용을 입력해주세요.");
            return;
        } 
        axios.post("/board/ugc",ugc).then(()=>{
            navigate("/ugcs");
        })
    }

    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        const { value, name } = e.target;
        setUgc({...ugc,[name]: value});
    };
        
    const categoryChange = (
        event: React.MouseEvent<HTMLElement>,
        ugcTypeCd: string,
      ) => {
        setUgc({...ugc,ugcTypeCd: ugcTypeCd})
    };    
    
    useEffect(()=>{
        axios.get(`/code/007`).then((r)=>{
            setCodes(r.data);
        })        
    },[])
    
    return(
        <Container maxWidth="lg" sx={{ py: 5, height: '100%'}}>
            <Card sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
                {
                    codes && codes.length &&
                    <ToggleButtonGroup
                        sx={{ width:'100%'}}
                        size="large"
                        color="primary"
                        value={ugc.ugcTypeCd}
                        exclusive
                        aria-label="Platform"
                        onChange={categoryChange}
                        >
                            {
                                codes.map((item)=>{
                                    return <ToggleButton 
                                                key={item.code}
                                                value={item.code}
                                                sx={{ flexGrow:1 }}
                                            >
                                                {item.codeNm}
                                            </ToggleButton>
                                })                                
                            }
                    </ToggleButtonGroup>                
                }
                <Typography sx={{ pt:4, pb:2}} variant="subtitle1">
                    제목
                </Typography>                
                <TextField 
                    multiline 
                    id="standard-basic" 
                    label="제목을 입력해주세요."
                    name="title"
                    onChange={handleChange}
                    value={ugc.title}
                />
                <Typography sx={{ pt:4, pb:2}} variant="subtitle1">
                    내용
                </Typography>                
                <TextField 
                    id="standard-basic" 
                    value={ugc.contents}
                    multiline
                    rows={5}
                    sx={{ pb:5}}
                    name="contents"
                    onChange={handleChange}
                    label="내용을 입력해주세요."/>
                <Button
                    type="submit"
                    variant="contained"           
                    sx={{ py:3}}
                    onClick={save}
                >
                    작성하기
                </Button>
            </Card>
        </Container>
    )
}