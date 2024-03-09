import { Typography, Button, Modal, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isValid } from 'date-fns';

import { dateFormat } from '../../../i18next';
import { getOrders } from '../../../store/order/reducer';
import { AddEditOrder } from './AddEditOrder';
import { RootStore } from '../../../store/types/RootStore';
import { Order } from '../../../store/types/Order';
import { Grid, GridColumn, GridDataRow } from '../../Grid';

const columns: GridColumn[] = [
    { field: 'id', header: 'ID', width: 50 },
    { field: 'number', header: 'Number', width: 70 },
    { field: 'client', header: 'Client', width: 70 },
    { field: 'capacity', header: 'Capacity', width: 70 },
    { field: 'value', header: 'Value', width: 70 },
    {
        header: 'Active',
        valueGetter: (row: GridDataRow) => `${row['isActive']}`,
        width: 70,
    },
    {
        header: 'Deleted',
        valueGetter: (row: GridDataRow) => `${row['isDeleted']}`,
        width: 70,
    },
    {
        header: 'Delivery Date',
        width: 60,
        valueGetter: (row: GridDataRow) =>
            stylishDate(row['deliveryDate']?.toString()),
    },
    {
        header: 'Actions',
        width: 60,
    },
];

const stylishDate = (val: string | undefined) => {
    if (!val) return val;
    const date = new Date(val);

    if (!isValid(date)) {
        return val;
    }

    return dateFormat(date);
};

interface Grid extends GridDataRow, Order {}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const OrdersOverview: FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [showAddOrEditOrder, setShowAddOrEditOrder] =
        useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | undefined>();
    const orders = useSelector((state: RootStore) => state.orders);
    const addOrder = () => {
        setShowAddOrEditOrder(true);
    };
    const enterEdit = (data: GridDataRow) => {
        setSelectedOrder(orders.find((order) => data.id == order.id));
        setShowAddOrEditOrder(true);
    };

    const closeAddEditOrderModal = () => {
        setSelectedOrder(undefined);
        setShowAddOrEditOrder(false);
    };
    useEffect(() => {
        dispatch(getOrders());
    }, []);

    return (
        <>
            <Typography variant="h4">{t('grid.title')}</Typography>
            <Button variant="contained" onClick={addOrder}>
                Add order
            </Button>
            <div style={{ flex: 1, overflow: 'auto' }}>
                <Grid
                    data={orders}
                    columns={columns}
                    isLoading={orders?.length == 0 || false}
                    enterEdit={enterEdit}
                />
            </div>
            <Modal
                open={showAddOrEditOrder}
                onClose={() => closeAddEditOrderModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddEditOrder
                        order={selectedOrder}
                        closeAddEditOrderModal={() => closeAddEditOrderModal()}
                    />
                </Box>
            </Modal>
        </>
    );
};
