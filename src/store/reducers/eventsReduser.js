import { SCROLLLEFT } from "../types";

const initialState = {
    scrollLeft: document.documentElement.scrollLeft
}


function eventsReducer(state = initialState, action) {

    switch (action.type) {
        case SCROLLLEFT:
            return { ...state, scrollLeft: document.documentElement.scrollLeft }

        default:
            return state;
    }
}
export default eventsReducer