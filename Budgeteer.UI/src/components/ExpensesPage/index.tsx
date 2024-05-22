import { FC, useEffect, useState } from 'react';
import { Expense } from '../shared/types/Expense';
import { ExpensesApiClient } from '../../api/Clients/ExpensesApiClient';
import { ExpenseModel } from '../../api/Models/ExpenseModel';
import { Card, CardContent, Grid, Typography } from '@mui/material';

export const ExpensesPage: FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const fetchExpenses = async () => {
        try {
            const res = await ExpensesApiClient.getAllAsync();

            const expenses = res.map((e: ExpenseModel) => ({ ...e } as Expense));
            setExpenses(expenses);
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);
    
    return <Grid 
    container spacing={2} 
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    style={{ marginTop: '16px' }}>
        {expenses.map((expense: Expense, index: number) => (
        <Grid item xs={3} key={`${expense.id}-${index}`}>
            <Card
                className={'product'}
            >
                <CardContent>
                    <Typography variant="h6" component="div">
                        {expense.category}
                    </Typography>
                    <Typography variant="h6">
                        Quantity: {expense.quantity}
                    </Typography>
                    <Typography variant="h6">
                        {expense.created.toString().split('T')[0]}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        ))}
    </Grid>;
};