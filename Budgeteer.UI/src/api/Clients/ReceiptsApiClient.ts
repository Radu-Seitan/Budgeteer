import { BaseApiClient } from '../Base/BaseApiClient';

export const ReceiptsApiClient = {
    urlPath: 'receipts',

    scanAndSaveProducts(item: FormData, categories: string): Promise<string> {
        return BaseApiClient.post(
            this.urlPath + '/' + 'scan-and-save',
            {
                image: item,
                categories: categories,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        ).then((response) => response.data);
    },
};
