import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
    return(
        <>
            <Box sx={{ bgcolor: 'text.disabled', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                푸터지만 없어질지도 모르는 존재
                </Typography>
                <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
                >
                푸푸 터터
                </Typography>
            </Box>            
        </>
    )
}