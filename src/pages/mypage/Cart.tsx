import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useEffect, useState } from "react";
import { ProductVO } from '../product/vo/product.vo';
import axios from 'axios';
import CartList from './CartList';
import { useParams } from 'react-router-dom';
import LikeList from './LikeList';

export default function Cart() {
    const params = useParams();
    const [cartType, setCartType] = useState(params?String(params.cartType):"cart") ;
    const [products, setProducts] = useState([] as ProductVO[]);

    const handleChange = (item: React.SyntheticEvent,value: any) =>{
        onChangeCart(value);
    }
    const onChangeCart = (item: string) =>{
        axios.get("/mypage/cart",{ params:{ cartType: item }}).then((r)=>{
            setCartType(item);
            setProducts(r.data);
        }) 
    }
    useEffect(()=>{
        onChangeCart(cartType);
    },[cartType])
    return(
        <>
            <TabContext value={cartType}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} variant="fullWidth">
                        <Tab label="장바구니" value="cart" />
                        <Tab label="좋아요" value="liked" />
                        <Tab label="최근 본 상품" value="recently" />
                    </TabList>
                </Box>
                <TabPanel value="cart">
                    <CartList products={products} />
                </TabPanel>
                <TabPanel value="liked">
                    <LikeList products={products} />
                </TabPanel>
                <TabPanel value="recently">Item Three</TabPanel>
            </TabContext>      
        </>
    )
}