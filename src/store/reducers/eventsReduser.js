import { SCROLL_LEFT } from "../types";

const initialState = {
    scrollLeft: document.documentElement.scrollLeft
}


function eventsReducer(state = initialState, action) {

    switch (action.type) {
        case SCROLL_LEFT:
            return { ...state, scrollLeft: document.documentElement.scrollLeft }

        default:
            return state;
    }
}
export default eventsReducer