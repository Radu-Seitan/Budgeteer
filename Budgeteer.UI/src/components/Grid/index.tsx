import * as React from 'react';
import {
    CircularProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export interface GridColumn {
    field?: string;
    header: string;
    width?: number;
    type?: string;
    sortable?: boolean;
    valueGetter?: (row: GridDataRow) => React.ReactNode;
}

export type GridDataRow = {
    id: number;

    [key: string]: React.ReactNode;
};

export interface GridProps {
    columns: GridColumn[];
    data: GridDataRow[] | null;
    pageSize?: number;
    isLoading?: boolean;
    enterEdit(data: GridDataRow): void;
}

export const Grid = ({ data, columns, isLoading, enterEdit }: GridProps) => {
    return (
        <div style={{ position: 'relative' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((col: GridColumn, index: number) => (
                                <TableCell key={index}>{col.header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.length > 0 ? (
                            data.map((row: GridDataRow, index: number) => (
                                <TableRow key={index}>
                                    {columns.map(
                                        (col: GridColumn, index: number) => (
                                            <TableCell key={index}>
                                                {col.field
                                                    ? row[col.field]
                                                    : col.valueGetter
                                                    ? col.valueGetter(row)
                                                    : ''}
                                                {col.header == 'Actions' ? (
                                                    <Button
                                                        onClick={() =>
                                                            enterEdit(row)
                                                        }
                                                    >
                                                        <EditIcon />{' '}
                                                    </Button>
                                                ) : (
                                                    ''
                                                )}
                                            </TableCell>
                                        )
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={100}>
                                    <Stack
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                    >
                                        <Typography>
                                            No data available
                                        </Typography>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {isLoading && (
                    <Stack
                        alignItems={'center'}
                        justifyContent={'center'}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            top: 0,
                        }}
                    >
                        <CircularProgress />
                    </Stack>
                )}
            </TableContainer>
        </div>
    );
};
