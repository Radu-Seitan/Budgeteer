import { BaseApiClient } from '../Base/BaseApiClient';
import { CategoryModel } from '../Models/CategoryModel';

export const CategoriesApiClient = {
    urlPath: 'categories',

    getAllAsync(): Promise<CategoryModel[]> {
        return BaseApiClient.get<CategoryModel[]>(this.urlPath).then(
            (response) => response.data
        );
    },

    getOneAsync(id: number): Promise<CategoryModel> {
        return BaseApiClient.get<CategoryModel>(
            this.urlPath + '/GetCategory/' + id // this.urlPath + "/" + id
        ).then((response) => response.data);
    },

    createOneAsync(model: CategoryModel): Promise<CategoryModel> {
        return BaseApiClient.post<CategoryModel>(
            this.urlPath + '/CreateCategory', // this.urlPath
            model
        ).then((response) => response.data);
    },

    deleteOneAsync(id: number): Promise<any> {
        return BaseApiClient.delete(this.urlPath + '/' + id).then(
            (response) => response.data
        );
    },
};
