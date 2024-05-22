import { BaseApiClient } from "../Base/BaseApiClient";
import { ProductModel } from "../Models/ProductModel";

export const ProductsApiClient = {
    urlPath: "products",

    getAllAsync(): Promise<ProductModel[]> {
        return BaseApiClient.get<ProductModel[]>(this.urlPath).then(
            (response) => response.data
        );
    },
}