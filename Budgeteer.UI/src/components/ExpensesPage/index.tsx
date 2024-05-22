import { FC, useEffect, useState } from 'react';
import { Expense } from '../shared/types/Expense';
import { ExpensesApiClient } from '../../api/Clients/ExpensesApiClient';
import { ExpenseModel } from '../../api/Models/ExpenseModel';
import { Card, CardContent, Grid, Typography } from '@mui/material';

import './ExpensesPage.scss';
import { format } from 'date-fns';

export const ExpensesPage: FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const fetchExpenses = async () => {
        try {
            const res = await ExpensesApiClient.getAllAsync();

            const expenses = res.map(
                (e: ExpenseModel) => ({ ...e } as Expense)
            );
            setExpenses(expenses);
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <Grid container spacing={2} className={'expenses-container'}>
            {expenses.map((expense: Expense, index: number) => (
                <Grid item xs={3} key={`${expense.id}-${index}`}>
                    <Card className={'expense'}>
                        <CardContent>
                            <Typography
                                variant="h6"
                                component="div"
                                className={'expense-category'}
                            >
                                {expense.category}
                            </Typography>
                            <Typography variant="h6">
                                Value: {expense.quantity}$
                            </Typography>
                            <Typography variant="h6">
                                {format(
                                    new Date(expense.createdAt),
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
