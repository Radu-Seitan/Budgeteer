import { FC, useEffect, useState } from 'react';
import { ImagesApiClient } from '../../api/Clients/ImagesApiClient';
import { Box } from '@mui/material';

interface StoreImageProps {
    imageId?: string;
    imageClassName: string;
}

export const StoreImage: FC<StoreImageProps> = ({
    imageId,
    imageClassName,
}: StoreImageProps) => {
    const [imageSrc, setImageSrc] = useState<string>();

    const fetchImage = async () => {
        if (!imageId) return;

        try {
            const imageBlob = await ImagesApiClient.getOneAsync(imageId);
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageSrc(imageUrl);
        } catch (error) {
            console.error('Error fetching the image:', error);
        }
    };

    useEffect(() => {
        fetchImage();
    }, [imageId]);

    return imageId ? <img src={imageSrc} className={imageClassName} /> : <></>;
};
