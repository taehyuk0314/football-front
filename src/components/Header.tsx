import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../reducer/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import { CssBaseline, Grid, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Header() {
    const member = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logout = async () => {
        const result = await axios.get("/logout");
        if(result) {
            dispatch(clearUser(member));
            alert("로그아웃 성공")
        }
    }
    return(
        <header>
            <CssBaseline/>
            <Box sx={{ flexGrow: 1 }}>
                <BrowserView>
                    <AppBar position="static" sx={{ bgcolor:'black', boxShadow:'none', px:10 }}>
                        <Toolbar variant="dense" sx={{ alignSelf: 'flex-end' }}>
                            <Typography sx={{ fontSize:13, height:'35px',cursor: 'pointer' }} component="div">
                                {
                                    member.memNo?
                                    <Typography sx={{ fontSize:13, display:'flex', alignItems: 'center'}}>
                                        <div onClick={()=>navigate("/mypage")}>마이페이지</div>
                                        <div className='css-bulkhead'></div>
                                        <div onClick={logout}>로그아웃</div>
                                    </Typography>                                    
                                    :
                                    <Typography sx={{ fontSize:13, display:'flex', alignItems: 'center'}}>
                                        <div onClick={()=>navigate("/login")}>로그인</div>
                                        <div className='css-bulkhead'></div>
                                        <div onClick={()=>navigate("/join")}>회원가입</div>
                                    </Typography>
                                }
                            </Typography>
                        </Toolbar>
                        <Grid container spacing={3} sx={{ height:'60px', alignItems: 'center', justifyContent: 'space-between'}} >
                            <Grid item md={6}>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    onClick={()=>navigate("/")}
                                    sx={{ display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
                                >
                                    센터
                                </Typography>
                            </Grid>
                            <Grid item md={6} sx={{ display: 'flex', flexDirection: 'row-reverse'}}>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new cart"
                                    color="inherit"
                                    onClick={()=>{navigate("/cart")}}
                                >
                                    <FavoriteIcon />
                                </IconButton>                                    
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new cart"
                                    color="inherit"
                                    onClick={()=>{navigate("/cart")}}
                                >
                                    <Badge badgeContent={0} color="error">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>                                    
                            </Grid>
                        </Grid>
                        <AppBar position="static" color='transparent'>
                            <Grid container spacing={3} sx={{ height:'70px', width:1, alignItems: 'center', justifyContent: 'space-between'}}>
                                <Grid item md={2}>
                                </Grid>
                                <Grid item md={8} sx={{ display:'flex', justifyContent: 'center', alignItems: 'center',cursor: 'pointer'}}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        onClick={()=>navigate("/products")}
                                        sx={{ display: { xs: 'none', sm: 'block' } }}
                                    >
                                        새상품
                                    </Typography>
                                    <div className='css-bulkhead'></div>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        onClick={()=>navigate("/ugcs")}
                                        sx={{ display: { xs: 'none', sm: 'block' } }}
                                    >
                                        커뮤니티
                                    </Typography>
                                </Grid>
                                <Grid item md={2}>
                                </Grid>
                            </Grid>
                        </AppBar>                        
                    </AppBar>
                </BrowserView>
                <MobileView>
                    <AppBar position="static" color='transparent'>
                        <Toolbar>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new cart"
                                    color="inherit"
                                    onClick={()=>{navigate("/cart")}}
                                >
                                    <Badge badgeContent={0} color="error">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                                {
                                    member.memNo && 
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        onClick={logout}
                                        color="inherit"
                                    >
                                        <LogoutIcon />
                                    </IconButton>
                                }
                            </Box>
                        </Toolbar>
                    </AppBar>
                </MobileView>
            </Box>
        </header>            
    )
}