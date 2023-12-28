import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Container, FormControlLabel, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProductVO } from "./vo/product.vo";
import axios from "axios";
import { CodeMasterVO } from "../common/vo/code.vo";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getNumber } from "../../commonUtils";

export default function Products() {
    
    const [codes, setCodes] =useState([] as CodeMasterVO[])
    const [products,setProducts] = useState([] as ProductVO[]);
    const [ productTypeCd, setProductTypeCd ] = useState([]);
    const codeType = '004';

    const search = () =>{
        axios.get('/products').then((r)=>{
            setProducts(r.data);
        })
    }
    const productLike = (event: React.ChangeEvent<HTMLInputElement>) =>{
        console.log(event)
    }
    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) =>{
        console.log(event)
    }

    useEffect(()=>{
        axios.get(`/code/groups/${codeType}`).then((r)=>{
            setCodes(r.data);
        })
        search();
    },[])

    return(
        <>
            <Grid sx={{ px: 4, py: 8, display: 'flex' }} container spacing={2}>
                <Grid item xs={3}>
                    {
                        codes.map((item)=>{
                            return  item.codes.length?
                                    <Accordion key={item.sortNo}>
                                                <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                >
                                                    <Typography>{item.codeNm}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>
                                                        <FormControlLabel
                                                            label="전체"
                                                            control={
                                                                <Checkbox
                                                                onChange={handleChange1}
                                                                />
                                                            }
                                                        />  
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                                            {
                                                                    item.codes.map((category)=>{
                                                                    return <FormControlLabel
                                                                        label={category.codeNm}
                                                                        control={<Checkbox />}
                                                                    />
                                                                })
                                                            }
                                                        </Box>
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>: null
                        })
                    }
                </Grid>                
                <Grid item xs={9} container spacing={4}>
                    {products.map((item) => (
                    <Grid item key={item.productNo} xs={12} sm={6} md={4}>
                        <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                // 16:9
                                pt: '56.25%',
                                }}
                                image="https://source.unsplash.com/random?wallpapers"
                            />
                            <CardContent sx={{ flexGrow: 1, textAlign: 'left'}}>
                                <Typography gutterBottom variant="h6" component="h2">
                                { item.productNm }
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button sx={{ width: '100%'}} variant="outlined" color="inherit" startIcon={<ShoppingCartIcon />}>
                                    담기
                                </Button>                                
                            </CardActions>
                            {
                                item.salePrice?
                                <CardContent sx={{ textAlign: 'left', py: 0}}>
                                    <Typography gutterBottom sx={{color: 'rgb(181, 181, 181)', textDecoration: 'line-through'}}>
                                    { getNumber(item.price) }원
                                    </Typography>
                                </CardContent>: null                            
                            }
                            <CardContent sx={{ flexGrow: 1, py: 0, textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Typography gutterBottom variant="h6" component="h2">
                                { getNumber(item.totalPrice) }원
                                </Typography>
                                <Checkbox  
                                    checked={item.isLiked} 
                                    icon={<FavoriteBorder />} 
                                    checkedIcon={<Favorite />} 
                                    onChange={productLike}
                                />
                            </CardContent>                            
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Grid>        
        </>
    )
}