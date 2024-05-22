import { BaseApiClient } from '../Base/BaseApiClient';

export const ReceiptsApiClient = {
    urlPath: 'receipts',

    scanAndSaveProducts(item: FormData): Promise<string> {
        return BaseApiClient.post(this.urlPath + '/' + 'scan-and-save', item, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => response.data);
    },
};
