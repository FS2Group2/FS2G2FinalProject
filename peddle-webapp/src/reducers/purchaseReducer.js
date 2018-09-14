import { LOAD_PURCHASE_LIST } from "../actions/actionsTypes";

function purchaseReducer(state=[], action) {
    switch (action.type) {
        case LOAD_PURCHASE_LIST:
            return action.data;
        default:
            return state;
    }
}

export default purchaseReducer;