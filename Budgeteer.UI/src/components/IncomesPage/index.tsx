import { Card, CardContent, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Income } from '../shared/types/Income';
import { IncomeModel } from '../../api/Models/IncomeModel';
import { IncomeApiClient } from '../../api/Clients/IncomeApiClient';
import { format } from 'date-fns';

import './IncomesPage.scss';

export const IncomesPage: FC = () => {
    const [income, setIncome] = useState<Income[]>([]);

    const fetchIncomes = async () => {
        try {
            const res = await IncomeApiClient.getAllAsync();

            const income = res.map((e: IncomeModel) => ({ ...e } as Income));
            setIncome(income);
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchIncomes();
    }, []);

    return (
        <Grid container spacing={2} className={'expenses-container'}>
            {income.map((income: Income, index: number) => (
                <Grid item xs={3} key={`${income.id}-${index}`}>
                    <Card className={'expense'}>
                        <CardContent>
                            <Typography
                                variant="h6"
                                component="div"
                                className={'expense-category'}
                            >
                                {income.category}
                            </Typography>
                            <Typography variant="h6" component="div">
                                Value: {income.quantity}$
                            </Typography>
                            <Typography variant="h6" component="div">
                                {format(
                                    new Date(income.createdAt),
                                    'dd-MM-yyyy HH:mm'
                                )}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};
