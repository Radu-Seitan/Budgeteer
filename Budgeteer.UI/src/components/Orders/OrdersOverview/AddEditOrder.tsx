import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { AddEditOrderValidationSchema } from './AddEditOrderValidationSchema';
import { addOrder, editOrder } from '../../../store/order/reducer';
import { Order, OrderForm } from '../../../store/types/Order';

interface Props {
    order: Order | undefined;
    closeAddEditOrderModal(): void;
}

export const AddEditOrder: FC<Props> = (props) => {
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: {
            number: props.order?.number || '',
            client: props.order?.client || '',
            capacity: props.order?.capacity || 0,
            value: props.order?.value || 0,
        },
        validationSchema: () => AddEditOrderValidationSchema(t),
        onSubmit: (ev: OrderForm) => {
            handleSubmit(ev);
        },
    });

    const dispatch = useDispatch();
    const handleSubmit = (values: OrderForm) => {
        const order: Order = {
            id: props.order && props.order.id ? props.order.id : 0,
            number: values.number,
            client: values.client,
            capacity: values.capacity,
            value: values.value,
            isActive: true,
            isDeleted: false,
            deliveryDate: new Date(),
        };
        if (order.id === 0) {
            dispatch(addOrder(order));
        } else {
            dispatch(editOrder(order));
        }
        props.closeAddEditOrderModal();
    };
    return (
        <>
            <form onSubmit={formik.handleSubmit} style={{ display: 'grid' }}>
                <div style={{ textAlign: 'center', marginBottom: 10 }}>
                    {props.order?.id ? (
                        <Typography>Edit</Typography>
                    ) : (
                        <Typography>Add</Typography>
                    )}
                </div>
                <TextField
                    id="number"
                    label="Number"
                    variant="standard"
                    name="number"
                    className="field"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.number && Boolean(formik.errors.number)
                    }
                    helperText={formik.touched.number && formik.errors.number}
                />
                <TextField
                    id="client"
                    label="Client"
                    name="client"
                    variant="standard"
                    value={formik.values.client}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.client && Boolean(formik.errors.client)
                    }
                    helperText={formik.touched.client && formik.errors.client}
                />
                <TextField
                    id="capacity"
                    label="Capacity"
                    type="number"
                    variant="standard"
                    value={formik.values.capacity}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.capacity &&
                        Boolean(formik.errors.capacity)
                    }
                    helperText={
                        formik.touched.capacity && formik.errors.capacity
                    }
                />
                <TextField
                    id="value"
                    label="Value"
                    type="number"
                    variant="standard"
                    value={formik.values.value}
                    onChange={formik.handleChange}
                    error={formik.touched.value && Boolean(formik.errors.value)}
                    helperText={formik.touched.value && formik.errors.value}
                />
                <div style={{ display: 'flex' }}>
                    <Button
                        variant="contained"
                        type="submit"
                        color="success"
                        style={{
                            marginTop: 10,
                            minWidth: '45%',
                            marginRight: 30,
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        type="button"
                        color="error"
                        onClick={props.closeAddEditOrderModal}
                        style={{ marginTop: 10, minWidth: '45%' }}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </>
    );
};
