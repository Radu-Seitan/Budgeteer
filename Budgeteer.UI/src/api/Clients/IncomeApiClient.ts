import { BaseApiClient } from "../Base/BaseApiClient";
import { IncomeModel } from "../Models/IncomeModel";

export const IncomeApiClient = {
    urlPath: 'incomes',

    getAllAsync(): Promise<IncomeModel[]> {
        return BaseApiClient.get<IncomeModel[]>(this.urlPath).then(
            (response) => response.data
        );
    },

    createOneAsync(model: IncomeModel): Promise<IncomeModel> {
        return BaseApiClient.post<IncomeModel>(this.urlPath, model).then(
            (response) => response.data
        );
    },

}