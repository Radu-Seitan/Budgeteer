import { Card, CardContent, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Income } from '../shared/types/Income';
import { IncomeModel } from '../../api/Models/IncomeModel';
import { IncomeApiClient } from '../../api/Clients/IncomeApiClient';

export const IncomesPage: FC = () => {
    const [income, setIncome] = useState<Income[]>([]);

    const fetchProducts = async () => {
        try {
            const res = await IncomeApiClient.getAllAsync();

            const income = res.map((e: IncomeModel) => ({ ...e } as Income));
            setIncome(income);
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
        {income.map((income: Income, index: number) => (
        <Grid item xs={3} key={`${income.id}-${index}`}>
            <Card
                className={'product'}
            >
                <CardContent>
                    <Typography variant="h5" component="div">
                        {income.category}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Quantity: {income.quantity}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {income.created.toString().split('T')[0]}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        ))}
    </Grid>;
};
