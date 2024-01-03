import { Box, Button, Card, CardContent, CardMedia, Checkbox, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { OrderMasterVO, ProductOptionVO, ProductVO } from "./vo/product.vo";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getNumber } from "../../commonUtils";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


export default function Product() {
    const params = useParams();
    const navigation = useNavigate();
    const [product,setProduct] = useState({} as ProductVO);
    const [options,setOptions] = useState([] as ProductOptionVO[]);
    const [orders,setOrders] = useState([] as OrderMasterVO[]);

    const [option,setOption] = useState({} as ProductOptionVO);


    const handleChange = (event: SelectChangeEvent ) => {
        const {target: { value }} = event;

        const order = JSON.parse(value) as OrderMasterVO;
        if(order.optionCnt < 1) {
            alert("품절된 상품입니다.");
            return;
        }
        setOrders({...orders, [orders.length-1]: order});
    }

    const btnCart = () => {
        console.log(orders)
        if(!orders.length) {
            alert("구매하실 상품을 선택해주세요.")
            return;
        }
        orders.forEach((item)=>{
            if(item.orderCnt < 0) {
                alert("상품 개수는 1개이상 입니다.")
                return;
            }
        })
        setOrders([]);
    } 

    const btnLiked = () =>{
        const params = { likeTypeCd: "003002", targetNo : product.productNo };
        if (!product.isLiked) {
          axios.post(`/product/like`, params).then(() => {
            setProduct({...product,isLiked: true,likeCnt: product.likeCnt++});
            return;
          });
          return;
        }
        axios.delete(`/product/like`, { params }).then(() => {
            setProduct({...product,isLiked: false,likeCnt: product.likeCnt--});
          return;
        });        
    }
    useEffect(()=>{
        if(!params.productNo) {
            navigation(-1);
        }
        axios.get(`/product/${params.productNo}`).then((r)=>{
            setProduct(r.data);
        })
    },[navigation, params.productNo])

    return(
        <Container maxWidth="lg" sx={{ py: 5, height: '100%'}}>
            <Card sx={{ display: 'flex'}}>
                <CardMedia
                component="div"
                sx={{ width: '40%', pt: '50%' }}
                image="https://source.unsplash.com/random?wallpapers"
            />
                <Box sx={{ width: '60%',px: 10, py: 5,   display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1' }}>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            { product.brandNm }
                        </Typography>                        
                        <Typography component="div" variant="h5">
                            {product.productNm}
                        </Typography>
                        <Typography sx={{ pt:5 }} variant="h4" component="div">
                            { getNumber(product.totalPrice) }원
                        </Typography>                         
                        <Box sx={{ pt: 5, display: 'flex', flexDirection: 'column' }}>
                            <FormControl fullWidth>
                                <InputLabel id="option-select-label">선택</InputLabel>
                                <Select
                                    labelId="option-select-label"
                                    id="demo-simple-select"
                                    value={option.optionNm}
                                    label="선택"
                                    onChange={handleChange}
                                >
                                    {
                                        product.options && product.options.map((item)=>{
                                            return !item.optionCnt?
                                            <MenuItem
                                                key={item.optionNo}
                                                placeholder=""
                                            >
                                                 {item.optionNm + "(품절)"}
                                            </MenuItem>:
                                            <MenuItem
                                                key={item.optionNo}
                                                value={JSON.stringify(item)}
                                            >
                                                {item.optionNm + "("+item.optionCnt+")"}
                                            </MenuItem>

                                        })
                                    }
                                </Select>
                            </FormControl>
                                {
                                    orders.length?
                                    <div>
                                        {
                                            orders.map((item)=>{
                                              return <></>  
                                            })
                                        }
                                    </div>
                                    :
                                    null
                                }
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Button sx={{mt: 5,  height:100, width:'100%' }} variant="contained" color="success">
                                        구매하기
                                    </Button>                                    
                                </Grid>
                                <Grid item xs={2}>
                                    <Button 
                                        onClick={btnCart} 
                                        sx={{mt: 5,  height:100, width:'100%' }} 
                                        variant="contained" 
                                        color="inherit"
                                    >
                                        <ShoppingCartOutlinedIcon/>
                                    </Button>                                       
                                </Grid>
                                <Grid item xs={2} >
                                    <Button 
                                        onClick={btnLiked} 
                                        sx={{mt: 5,  height:100, width:'100%' }} 
                                        variant="contained" 
                                        color="inherit"
                                    >
                                        {
                                            product.isLiked?
                                            <Favorite color="error"/>
                                            :<FavoriteBorder />
                                        }
                                    </Button>
                                </Grid>
                            </Grid>                            
                        </Box>
                    </CardContent>
                </Box>            
            </Card>            
        </Container>
    )
}