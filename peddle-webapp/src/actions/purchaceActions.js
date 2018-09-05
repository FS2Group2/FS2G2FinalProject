import { ADD_TO_PURCHACE_LIST,LOAD_PURCHACE_LIST, REMOVE_FROM_PURCHACE_LIST} from "../actions/actionsTypes";

export function loadPurchaceList(purchacelist) {
    return{ type: LOAD_PURCHACE_LIST, data: purchacelist}
}

export function addToPurchaceList(event) {
    return{ type: ADD_TO_PURCHACE_LIST, data: event}
}

export function removeFromPurchaceList(eventId) {
    return{ type: REMOVE_FROM_PURCHACE_LIST, data: eventId}
}