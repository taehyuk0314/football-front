import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Container, FormControlLabel, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProductVO } from "./vo/product.vo";
import axios from "axios";

export default function Product() {
    
    const [product,setProduct] = useState({} as ProductVO);

    useEffect(()=>{
    },[])

    return(
        <>
\
        </>
    )
}