import { Box, Button, Card, CardContent, CardMedia, Checkbox, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getLocalStorageObject, getNumber, putLocalStorageObject } from "../../commonUtils";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { IconButton } from '@mui/material';
import { OrderMasterVO } from "../order/vo/order.vo";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Constants from "../../constants";
import { CartMasterVO } from "../mypage/vo/mypage.vo";


export default function Product() {
    const params = useParams();
    const navigation = useNavigate();
    const [product,setProduct] = useState({} as OrderMasterVO);
    const [orders,setOrders] = useState([] as OrderMasterVO[]);

    const _ = require('lodash');

    const handleChange = (event: SelectChangeEvent) => {
        const {target: { value }} = event;
        
        const order = JSON.parse(value) as OrderMasterVO;
        if(order.optionCnt < 1) {
            alert("품절된 상품입니다.");
            return;
        }

        if(orders.findIndex(item => item.optionNo === order.optionNo) > -1) {
            alert("이미 선택되어있는 상품입니다.")
            return;
        }
        const merge = {..._.omitBy(product, _.isNull), ..._.omitBy(order, _.isNull),orderCnt:1}
        setOrders([...orders,merge]);
    }
    const btnOrder = () =>{
        if(orders.length < 1) {
            alert("옵션을 선택해주세요");
            return;
        }
        axios.post("/order",orders).then((r)=>{
            navigation("/order/"+r.data.orderNo);
        })
    }
    const btnCart = () => {
        if(!orders.length) {
            alert("구매하실 상품을 선택해주세요.")
            return;
        }
        orders.forEach((item)=>{
            if(item.orderCnt < 1) {
                alert("상품 개수는 1개이상 입니다.")
                return;
            }
        })
        axios.post("/mypage/cart",orders).then(()=>{
            alert("장바구니 담기 성공");
            setOrders([]);
        })
        
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
   // 최근 본 상품에 추가
   const addRecentProduct = () => {
        let recentProducts = getLocalStorageObject(Constants.RECENT_PRODUCTS);
        if (!recentProducts) {
            recentProducts = new Array<number>();
        }

        recentProducts.unshift(params.productNo);
        recentProducts = Array.from(new Set(recentProducts));

        if (recentProducts.length > 20) {
        recentProducts = recentProducts.slice(undefined, 20);
        }

        putLocalStorageObject(Constants.RECENT_PRODUCTS, recentProducts);

        addRecentProductInfo();
    }  

    const addRecentProductInfo = () => {
        let recentProductInfo = getLocalStorageObject(Constants.RECENT_PRODUCTS_INFO) as Array<CartMasterVO>;
        if (!recentProductInfo) {
          recentProductInfo = new Array<CartMasterVO>();
        }
    }    
    const btnProductCounting = (param: OrderMasterVO, count: number) => {
        let findOrder = orders.findIndex(item => item.optionNo === param.optionNo);
        
        let copiedItems = [...orders];
        if(copiedItems[findOrder].orderCnt + count < 1) {
            alert("1개 이상 구매 가능합니다.")
            return;
        }
        if(copiedItems[findOrder].optionCnt < copiedItems[findOrder].orderCnt + count) {
            alert(copiedItems[findOrder].optionCnt+"이하로 구매 가능합니다.")
            return;
        }

        copiedItems[findOrder].orderCnt = copiedItems[findOrder].orderCnt+ count;
        setOrders(copiedItems);
    }

    useEffect(()=>{
        if(!params.productNo) {
            navigation(-1);
        }
        axios.get(`/product/${params.productNo}`).then((r)=>{
            setProduct(r.data);
            addRecentProduct();
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
                                    id="option-select"
                                    label="선택"
                                    value={''}
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
                                    <Box>
                                        {
                                            orders.map((item: OrderMasterVO,index)=>{
                                                return  <Box key={index} display={"flex"} sx={{ pt:3, justifyContent: "space-between"}}>
                                                            <Typography variant="h5" component="div">
                                                                {item.productNm + "["+ item.optionNm+"]"}
                                                            </Typography>
                                                            <Box>
                                                                <IconButton onClick={()=>{btnProductCounting(item,1)}}><AddIcon/></IconButton>
                                                                {item.orderCnt}
                                                                <IconButton onClick={()=>{btnProductCounting(item,-1)}}><RemoveIcon/></IconButton>
                                                            </Box>
                                                        </Box>  
                                            })
                                        }
                                    </Box>
                                    :
                                    null
                                }
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Button 
                                        sx={{mt: 5,  height:100, width:'100%' }} 
                                        variant="contained" 
                                        color="success"
                                        onClick={btnOrder}
                                    >
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