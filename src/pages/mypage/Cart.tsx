import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useEffect, useState } from "react";
import { ProductVO } from '../product/vo/product.vo';
import axios from 'axios';

export default function Cart() {
    const [tabValue, setTabValue] = useState("cart") ;
    const [products, setProducts] = useState([] as ProductVO[]);
    const handleChange = (item: React.SyntheticEvent,value: any) =>{
        return setTabValue(value); 
    }
    useEffect(()=>{
        axios.get("/mypage/cart",{ params:{ tab: tabValue }}).then((r)=>{
            setProducts(r.data);
        })
    },[])
    return(
        <>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} variant="fullWidth">
                        <Tab label="장바구니" value="cart" />
                        <Tab label="좋아요" value="hart" />
                        <Tab label="최근 본 상품" value="recently" />
                    </TabList>
                </Box>
                <TabPanel value="cart">
                    Item One
                </TabPanel>
                <TabPanel value="hart">Item Two</TabPanel>
                <TabPanel value="recently">Item Three</TabPanel>
            </TabContext>      
        </>
    )
}