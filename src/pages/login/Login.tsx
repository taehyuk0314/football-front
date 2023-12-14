import React, { ChangeEvent, useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoginIVO } from "./vo/login.vo";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginUser } from "../../reducer/userSlice";
import { useNavigate } from 'react-router-dom';

export default function Login () {
    const navigate = useNavigate();
    const defaultTheme = createTheme();
    const dispatch = useDispatch();
    const [member, setMember] = useState({} as LoginIVO);
    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        const { value, name } = e.target;
        setMember({...member,[name]: value});
    };

    const btnLogin = () => {
        if(!member.id.trim()) {
            alert("아이디를 입력하세요.");
            return;
        }

        if(!member.password.trim()) {
            alert("비밀번호를 입력하세요.");
            return;
        }
        axios.post("/login", member).then(() => {
            alert("로그인 성공!")
            next();
        })
    }; 

    const next = () => {
        // vue세션에 회원정보 저장
        axios.get("/login/simple-details").then((r: any) => {
            console.log(r.data)
            dispatch(loginUser(r.data));
            navigate("/");
        });
    }    

    return(
        <>
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    로고
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="id"
                    label="아이디"
                    name="id"
                    autoComplete="email"
                    onChange={handleChange}
                    value={ member.id || ""}
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="비밀번호"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    value={ member.password || "" }
                    autoComplete="current-password"
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={btnLogin}
                    sx={{ mt: 3, mb: 2 }}
                    >
                    로그인
                    </Button>
                    <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            비밀번호를 잊어버리셨습니까?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            계정이 없으십니까?
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
            </ThemeProvider>
        </>
    )
}