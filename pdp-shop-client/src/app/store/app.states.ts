import { Category } from "../core/models/category";
import { UserWithToken } from "../core/models/user";


export interface State {
    user: UserWithToken | {};
    categories: Category[];
}

export const initialState: State = {
    user: {},
    categories: [],
};
