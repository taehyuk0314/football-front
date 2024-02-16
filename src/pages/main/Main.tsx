import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import { BoardMasterVO } from "../board/vo/board.vo";
import RecommendUgcs from "../board/RecommnedUgcs";

export default function Main() {
    const [board,setBoard] = useState([] as BoardMasterVO[]);
    
    useEffect(()=>{
        axios.get("/login/simple-details").then((r) => {
            console.log(r)
        });     
    },[])

    const hello = () => {
        axios.get("/board/ugcs").then((r: any)=>{
            alert(JSON.stringify(r))
        }) 
    }

    return(
        <>
            <CssBaseline />
            <main>
                
                <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
                >
                <RecommendUgcs/>    
                <Container maxWidth="sm">
                    <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    >
                    Album layout
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Something short and leading about the collection below—its contents,
                    the creator, etc. Make it short and sweet, but not too short so folks
                    don&apos;t simply skip over it entirely.
                    </Typography>
                    <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    >
                    <Button onClick={hello} variant="contained">Main call to action</Button>
                    <Button variant="outlined">Secondary action</Button>
                    </Stack>
                </Container>
                </Box>
            </main>
        </>
    )
}