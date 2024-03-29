import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActionArea, CardActions, CardMedia, Checkbox, FormControl, FormControlLabel, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProductVO } from "./vo/product.vo";
import axios from "axios";
import { CodeMasterVO } from "../common/vo/code.vo";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getNumber } from "../../commonUtils";
import { useNavigate } from "react-router-dom";
import ProductOptionDialog from "../../components/ProductOptionDialog";


export default function Products() {
    const [open, setOpen] = useState(false);
    const [productNo, setProductNo] = useState(0);
    const [codes, setCodes] =useState([] as CodeMasterVO[])
    const [products,setProducts] = useState([] as ProductVO[]);
    const [productTypeCd, setProductTypeCd] = useState([]);
    
    const codeType = '004';
    const navigate = useNavigate();

    const search = () =>{
        axios.get('/products',{params:{}}).then((r)=>{
            setProducts(r.data);
        })
    }

    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) =>{
        console.log(event)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
    }

    const btnLiked = (item: ProductVO) =>{
        const params = { likeTypeCd: "003002", targetNo : item.productNo };
        let findLiked = products.findIndex(product => product.productNo === item.productNo);
        let copiedItems = [...products];            
        if (!item.isLiked) {
          axios.post(`/product/like`, params).then(() => {
        
            copiedItems[findLiked].isLiked = true;
            setProducts(copiedItems);
            return;
          });
          return;
        }
        axios.delete(`/product/like`, { params }).then(() => {
            copiedItems[findLiked].isLiked = false;
            setProducts(copiedItems);            
          return;
        });        
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
                                            <FormControl>
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
                                                                key={category.code}
                                                                label={category.codeNm} 
                                                                control={
                                                                    <Checkbox
                                                                        onChange={handleChange1}
                                                                    />
                                                                }                                                                    />
                                                        })
                                                    }
                                                </Box>
                                            </FormControl>
                                        </AccordionDetails>
                                    </Accordion>: null
                        })
                    }
                </Grid>                
                <Grid item xs={9} container spacing={4}>
                    {products.map((item) => (
                    <Grid item key={item.productNo} xs={12} sm={6} md={4}>
                        <CardActionArea onClick={()=>{navigate("/product/"+item.productNo)}}>
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
                                <CardActions sx={{ flexGrow: 1, textAlign: 'left'}}>
                                    <Typography gutterBottom variant="h6" component="h2">
                                    { item.productNm }
                                    </Typography>
                                </CardActions>
                                <CardActions>
                                    <Button 
                                        onClick={(event)=>{event.stopPropagation(); handleClickOpen()}} 
                                        sx={{ width: '100%'}} 
                                        variant="outlined" 
                                        color="inherit" 
                                        startIcon={<ShoppingCartIcon />}
                                    >
                                        담기
                                    </Button>                                
                                </CardActions>
                                <CardActions sx={{ height:25, textAlign: 'left', py: 0}}>
                                    {
                                        item.salePrice?
                                        <Typography gutterBottom sx={{color: 'rgb(181, 181, 181)', textDecoration: 'line-through'}}>
                                        { getNumber(item.price) }원
                                        </Typography>: null
                                    }
                                </CardActions>
                                <CardActions sx={{ flexGrow: 1, pb:3,  textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Typography gutterBottom variant="h6" component="h2">
                                    { getNumber(item.totalPrice) }원
                                    </Typography>
                                    <IconButton onClick={(event)=>{event.stopPropagation(); btnLiked(item)}} aria-label="delete">
                                    {
                                        item.isLiked?   
                                        <Favorite color="error"/>
                                        :<FavoriteBorder/>
                                    }
                                    </IconButton>
                                </CardActions>                            
                            </Card>
                        </CardActionArea> 
                    </Grid>
                    ))}
                </Grid>
            </Grid>   
            <ProductOptionDialog
                productNo={productNo}
                open={open}
                onClose={handleClose}
            />                 
        </>
    )
}