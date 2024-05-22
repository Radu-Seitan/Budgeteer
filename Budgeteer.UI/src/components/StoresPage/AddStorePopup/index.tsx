import { ChangeEvent, FC, useState } from 'react';
import { StoreModel } from '../../../api/Models/StoreModel';
import { StoresApiClient } from '../../../api/Clients/StoresApiClient';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';
import { ImagesApiClient } from '../../../api/Clients/ImagesApiClient';

import './AddStorePopup.scss';

interface AddStorePopupProps {
    open: boolean;
    onClose: () => void;
    onEditing: () => void;
}

export const AddStorePopup: FC<AddStorePopupProps> = ({
    open,
    onClose,
    onEditing,
}: AddStorePopupProps) => {
    const [storeName, setStoreName] = useState('');
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedImage(event.target.files[0]);
            setInputValue(event.target.value);
        }
    };

    const createStore = async () => {
        const imageId = await createImage();
        const model: StoreModel = { name: storeName, imageId: imageId };

        try {
            const res = await StoresApiClient.createOneAsync(model);
            return res;
        } catch (error: any) {
            console.log(error);
        }
    };

    const createImage = async () => {
        if (!selectedImage) return;

        const formData = new FormData();
        formData.append('file', selectedImage);

        try {
            const response = await ImagesApiClient.createAsync(formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        setStoreName('');
        setSelectedImage(null);
        setInputValue('');
        onClose();
    };

    const handleSave = async () => {
        await createStore();
        onEditing();
        handleClose();
    };

    return (
        <Dialog fullWidth={true} maxWidth={'md'} open={open} onClose={onClose}>
            <DialogTitle fontSize={24}>Create a new store</DialogTitle>
            <DialogContent className={'add-store-modal-content'}>
                <Box>
                    <Box className={'image-uploader-input-container'}>
                        <Typography
                            variant="h4"
                            className={'image-uploader-headings'}
                            textAlign={'left'}
                        >
                            Select an image
                        </Typography>
                        <Box>
                            <input
                                type="file"
                                name="imageFile"
                                accept="image/*"
                                value={inputValue}
                                onChange={handleImageChange}
                            />
                        </Box>
                    </Box>
                    {selectedImage && (
                        <>
                            <Box
                                className={
                                    'image-uploader-selected-image-container'
                                }
                            >
                                <Typography
                                    variant="h4"
                                    className={'image-uploader-headings'}
                                    textAlign={'center'}
                                >
                                    Selected image
                                </Typography>
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    className={'image-uploader-selected-image'}
                                />
                            </Box>
                        </>
                    )}
                </Box>
                <TextField
                    fullWidth
                    label="Store Name"
                    value={storeName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setStoreName(event.target.value);
                    }}
                />
            </DialogContent>
            <DialogActions className={'add-category-modal-actions'}>
                <Button onClick={handleClose} variant="outlined">
                    Close
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!storeName || !selectedImage}
                    className="save-button"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
