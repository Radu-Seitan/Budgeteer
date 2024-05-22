import { Card, CardContent, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { ProductModel } from '../../api/Models/ProductModel';
import { ProductsApiClient } from '../../api/Clients/ProductsApiClient';
import { Product } from '../shared/types/Product';

export const ProductsPage: FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        try {
            const res = await ProductsApiClient.getAllAsync();

            const products = res.map((e: ProductModel) => ({ ...e } as Product));
            setProducts(products);
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    
    return <Grid 
    container spacing={2} 
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    style={{ marginTop: '16px' }}>
        {products.map((product: Product, index: number) => (
        <Grid item xs={3}>
            <Card
                key={`${product.id}-${index}`}
                className={'product'}
            >
                <CardContent>
                    <Typography variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="h6">
                        Type: {product.categories.join(", ")}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        ))}
    </Grid>;
};
