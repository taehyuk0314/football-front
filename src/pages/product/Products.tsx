import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProductVO } from "./vo/product.vo";
import axios from "axios";

export default function Products() {

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [products,setProducts] = useState([] as ProductVO[]);
    const [ productTypeCd, setProductTypeCd ] = useState();

    const search = () =>{
        axios.get('/products').then((r)=>{
            setProducts(r.data);
        })
    }
    useEffect(()=>{
        search();
    },[])
    return(
        <>
            <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
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
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                        { item.productNm }
                        </Typography>
                        <Typography>
                        This is a media card. You can use this section to describe the
                        content.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small">Edit</Button>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Container>        
        </>
    )
}