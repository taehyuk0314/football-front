import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';

export default function Header() {

    const logout = async () => {
        const result = await axios.get("/logout");
        if(result) {
            alert("로그아웃 성공")
        }
    }

    return(
        <header>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='transparent'>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            FOOT
                            {/* <Link to="/"></Link> */}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                            </IconButton>
                            <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                            </IconButton>
                            <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            // aria-controls={menuId}
                            aria-haspopup="true"
                            // onClick={handleProfileMenuOpen}
                            color="inherit"
                            >
                            <AccountCircle />
                            </IconButton>
                            <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            onClick={logout}
                            color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                            size="large"
                            aria-label="show more"
                            // aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            // onClick={handleMobileMenuOpen}
                            color="inherit"
                            >
                            <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            {/* {renderMobileMenu} */}
            {/* {renderMenu} */}
            </Box>
        </header>            
    )
}