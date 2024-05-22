import { FC, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Store } from '../shared/types/Store';
import { StoresApiClient } from '../../api/Clients/StoresApiClient';
import { StoreModel } from '../../api/Models/StoreModel';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Typography,
} from '@mui/material';
import { AddStorePopup } from './AddStorePopup';
import { StoreImage } from '../StoreImage';

import './StoresPage.scss';

export const StoresPage: FC = () => {
    const [stores, setStores] = useState<Store[]>([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchStores = async () => {
        try {
            const res = await StoresApiClient.getAllAsync();

            const stores = res.map((e: StoreModel) => ({ ...e } as Store));
            setStores(stores);
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    return (
        <Box>
            <Box className={'new-stores-section'}>
                <Box className={'stores-title-text'}>Add a new store</Box>
                <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                    sx={{ color: '#fff' }}
                >
                    <AddIcon fontSize="large" />
                </Button>
            </Box>

            <Divider />

            <Box className={'stores-list-section'}>
                <Box className={'stores-title-text'}>Stores in application</Box>
                <Box className={'stores-list'}>
                    {stores.map((store: Store, index: number) => (
                        <Card
                            key={`${store.id}-${index}`}
                            className={'store-card'}
                        >
                            <StoreImage
                                imageId={store.imageId}
                                imageClassName={'card-image'}
                            />
                            <CardContent sx={{ margin: 'auto' }}>
                                <Box
                                    component="div"
                                    textAlign={'center'}
                                    className={'stores-text-container'}
                                >
                                    {store.name}
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>

            <AddStorePopup
                open={open}
                onClose={handleClose}
                onEditing={() => fetchStores()}
            />
        </Box>
    );
};
