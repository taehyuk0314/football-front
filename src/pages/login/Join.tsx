import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { JoinVO } from "./vo/Join.vo";

export default function Join () {
    const defaultTheme = createTheme();
    const [member, setMember] = useState({} as JoinVO);

    const join = () => {
        if(!member.memId.trim()) {
            alert("아이디를 입력하세요.");
            return;
        }

        if(!member.password.trim()) {
            alert("비밀번호를 입력하세요.");
            return;
        }

        if(!member.email.trim()) {
            alert("이메일을 입력해주세요.");
            return;
        }
        
        axios.post("/join",member).then(()=>{
            alert("회원가입 온료");
        }) 
    };     

    return (
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
                        FOOT
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="memId"
                        label="아이디"
                        name="memId"
                        // onChange={setMember()}
                        value={ member.memId || ""}
                        autoComplete="email"
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
                        // onChange={this.handleChange}
                        value={ member.password || "" }
                        autoComplete="current-password"
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="이메일"
                        type="email"
                        id="email"
                        // onChange={this.handleChange}
                        value={ member.email || "" }
                        autoComplete="email"
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={join}
                        sx={{ mt: 3, mb: 2 }}
                        >
                        회원가입
                        </Button>
                    </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
  }