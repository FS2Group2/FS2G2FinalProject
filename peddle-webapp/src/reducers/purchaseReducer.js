import { ADD_TO_PURCHACE_LIST,LOAD_PURCHACE_LIST, REMOVE_FROM_PURCHACE_LIST} from "../actions/actionsTypes";

function purchaseReducer(state=[], action) {
    switch (action.type) {
        case LOAD_PURCHACE_LIST:
            return Object.assign({}, state, action.data);
        case ADD_TO_PURCHACE_LIST:
            return state;
        case REMOVE_FROM_PURCHACE_LIST:
            return state;
        default:
            return state;
    }
}

export default purchaseReducer;