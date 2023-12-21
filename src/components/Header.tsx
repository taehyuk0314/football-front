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
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='transparent'>
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }} />
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
            </Box>
        </header>            
    )
}