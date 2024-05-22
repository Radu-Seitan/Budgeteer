import { BaseApiClient } from "../Base/BaseApiClient";
import { ExpenseModel } from "../Models/ExpenseModel";

export const ExpensesApiClient = {
    urlPath: "expenses",

    getAllAsync(): Promise<ExpenseModel[]> {
        return BaseApiClient.get<ExpenseModel[]>(this.urlPath).then(
            (response) => response.data
        );
    },
}