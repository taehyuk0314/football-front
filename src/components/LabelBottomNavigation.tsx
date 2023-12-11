import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import React from "react";
import { Link } from "react-router-dom";

export default class LabelBottomNavigation extends React.Component {
    
    render(): React.ReactNode {
        return (
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    >
                    <BottomNavigationAction component={Link} to="/" icon={<HomeIcon />} /> 
                    <BottomNavigationAction component={Link} to="/" icon={<FavoriteIcon />} />
                    <BottomNavigationAction component={Link} to="/ugcs" icon={<NotificationsRoundedIcon />} />
                    <BottomNavigationAction component={Link} to="/mypage" icon={<AccountBoxRoundedIcon />} />
                </BottomNavigation>
            </Paper>
        )
    }
}