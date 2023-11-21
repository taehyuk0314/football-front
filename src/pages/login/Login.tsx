import React from "react";
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

export default class Login extends React.Component {
    defaultTheme = createTheme();
    render(): React.ReactNode {
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            if(!data.get('memId')) {
                alert("아이디를 입력하세요.");
            }

            if(!data.get('password')) {
                alert("비밀번호를 입력하세요.");
            }

            console.log({
                memId: data.get('memId'),
                password: data.get('password'),
            });
        }; 

        return(
            <>
            <ThemeProvider theme={this.defaultTheme}>
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="memId"
                        label="아이디"
                        name="memId"
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
                        autoComplete="current-password"
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
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
}