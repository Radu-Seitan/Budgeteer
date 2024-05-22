import { BaseApiClient } from '../Base/BaseApiClient';

export const ImagesApiClient = {
    urlPath: 'images',

    createAsync(item: FormData): Promise<string> {
        return BaseApiClient.post(this.urlPath, item, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => response.data);
    },

    createForStoreAsync(item: FormData, storeId: number) {
        return BaseApiClient.post(this.urlPath + '/' + storeId, item, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => response.data);
    },

    getOneAsync(imageId: string) {
        return BaseApiClient.get(this.urlPath + '/' + imageId, {
            responseType: 'blob',
        }).then((response) => response.data);
    },
};
