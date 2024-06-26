import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

import * as images from '../shared/resources/images';

const { StatisticsLogo, ReceiptImage, IncomesLogo, LogoImage } = images.default;

export const Home: FC = () => {
    return (
        <Box>
            <Box className={'background-image'}></Box>
            <Box className={'title-logo-container'}>
                <img
                    src={LogoImage}
                    alt="SpendWise Logo"
                    className={'title-logo'}
                />
            </Box>
            <Grid container>
                <Grid item sm={6} md={4}>
                    <Card className={'card'}>
                        <img
                            src={IncomesLogo}
                            alt="Categories"
                            className={'card-image'}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                textAlign={'center'}
                                className={'section-title'}
                            >
                                Incomes
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                component={Link}
                                to="/incomes"
                                variant="contained"
                                className={'card-button'}
                            >
                                <Typography>Go to</Typography>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item sm={6} md={4}>
                    <Card className={'card'}>
                        <img
                            src={ReceiptImage}
                            alt="Receipts"
                            className={'card-image'}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                textAlign={'center'}
                                className={'section-title'}
                            >
                                Expenses
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                component={Link}
                                to="/expenses"
                                variant="contained"
                                className={'card-button'}
                            >
                                <Typography>Go to</Typography>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={'card'}>
                        <img
                            src={StatisticsLogo}
                            alt="Statistics"
                            className={'card-image'}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                textAlign={'center'}
                                className={'section-title'}
                            >
                                Statistics
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                component={Link}
                                to="/statistics"
                                variant="contained"
                                className={'card-button'}
                            >
                                <Typography>Go to</Typography>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
