import { FC, useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import 'chart.js/auto';
import { ExpensesApiClient } from '../../api/Clients/ExpensesApiClient';
import { ExpenseModel } from '../../api/Models/ExpenseModel';
import { Expense } from '../shared/types/Expense';
import { IncomeApiClient } from '../../api/Clients/IncomeApiClient';
import { IncomeModel } from '../../api/Models/IncomeModel';
import { Income } from '../shared/types/Income';
import { Pie } from 'react-chartjs-2';

import './StatisticsPage.scss';

export const Statistics: FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [incomes, setIncomes] = useState<Income[]>([]);

    const processData = (data: any, type: string) => {
        const categoryMap = data.reduce((acc: any, item: any) => {
            acc[item.category] = (acc[item.category] || 0) + item.quantity;
            return acc;
        }, {});

        return {
            labels: Object.keys(categoryMap),
            datasets: [
                {
                    label: type,
                    data: Object.values(categoryMap),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(155, 159, 64, 0.6)',
                    ],
                },
            ],
        };
    };

    const fetchIncomes = async () => {
        try {
            const res = await IncomeApiClient.getAllAsync();

            const income = res.map((e: IncomeModel) => ({ ...e } as Income));
            setIncomes(income);
        } catch (error: any) {
            console.log(error);
        }
    };

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
        fetchIncomes();
    }, []);

    const expenseData = processData(expenses, 'Expenses');
    const incomeData = processData(incomes, 'Income');

    return (
        <Box className={'statistics-page-container'}>
            <Box className={'categories-title-text'}>Statistics</Box>

            <Divider />

            <Box className={'statistics-wrapper'}>
                <Box className={'statistics-graph-container'}>
                    <Box className={'categories-title-text'}>
                        Total income:{' '}
                        {incomes.reduce((acc, item) => acc + item.quantity, 0)}
                    </Box>
                    <Pie data={incomeData} />
                </Box>
                <Box className={'statistics-graph-container'}>
                    {' '}
                    <Box className={'categories-title-text'}>
                        Total expense:{' '}
                        {expenses.reduce((acc, item) => acc + item.quantity, 0)}
                    </Box>
                    <Pie data={expenseData} />
                </Box>
            </Box>
        </Box>
    );
};
