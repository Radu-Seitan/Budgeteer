import { BaseApiClient } from '../Base/BaseApiClient';
import { StoreModel } from '../Models/StoreModel';

export const StoresApiClient = {
    urlPath: 'stores',

    getAllAsync(): Promise<StoreModel[]> {
        return BaseApiClient.get<StoreModel[]>(this.urlPath).then(
            (response) => response.data
        );
    },

    getOneAsync(id: number): Promise<StoreModel> {
        return BaseApiClient.get<StoreModel>(this.urlPath + '/' + id).then(
            (response) => response.data
        );
    },

    createOneAsync(model: StoreModel): Promise<StoreModel> {
        return BaseApiClient.post<StoreModel>(this.urlPath, model).then(
            (response) => response.data
        );
    },
};
