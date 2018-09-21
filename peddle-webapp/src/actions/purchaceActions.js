import { LOAD_PURCHASE_LIST} from "../actions/actionsTypes";

export function loadPurchaceList(purchacelist) {
    return{ type: LOAD_PURCHASE_LIST, payload: purchacelist}
}
