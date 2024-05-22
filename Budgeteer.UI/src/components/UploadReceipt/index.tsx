import { Box, Button, Divider, Typography } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Category } from '../shared/types/Category';
import { CategoriesApiClient } from '../../api/Clients/CategoriesApiClients';
import { CategoryModel } from '../../api/Models/CategoryModel';
import { ReceiptsApiClient } from '../../api/Clients/ReceiptsApiClient';
import { useNavigate } from 'react-router';

import './UploadReceipt.scss';

export const UploadReceipt: FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedImage(event.target.files[0]);
            setInputValue(event.target.value);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await CategoriesApiClient.getAllAsync();

            const categories = res.map(
                (e: CategoryModel) => ({ ...e } as Category)
            );
            setCategories(categories);
        } catch (error: any) {
            console.log(error);
        }
    };

    const uploadReceipt = async () => {
        if (!selectedImage) return;

        const categoriesString = JSON.stringify(categories);

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('categories', categoriesString);

        try {
            const res = await ReceiptsApiClient.scanAndSaveProducts(formData);

            navigate('/');
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Box className={'upload-receipt-page-container'}>
            <Box className={'categories-title-text'}>
                Upload a picture of your receipt
            </Box>

            <Divider />

            <Box className={'upload-section'}>
                <Box className={'image-uploader-input-container'}>
                    <Typography
                        variant="h4"
                        className={'image-uploader-headings'}
                        textAlign={'center'}
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
                        <Button
                            variant="contained"
                            size="large"
                            onClick={uploadReceipt}
                        >
                            Upload Image
                        </Button>
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
                                className={'upload-selected-image'}
                            />
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};
