import { FC } from 'react';
import { Box, Divider } from '@mui/material';

import './StatisticsPage.scss';

export const Statistics: FC = () => {
    return (
        <Box className={'statistics-page-container'}>
            <Box className={'categories-title-text'}>Statistics</Box>

            <Divider />

            <Box></Box>
        </Box>
    );
};
