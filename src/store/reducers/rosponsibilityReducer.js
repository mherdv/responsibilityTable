import { LOADRESPONSIBILITY, GETRESPONSIBILITYERROR, SETALLRESPONSIBILITY, UPDATERESPONSIBILITYARRAY, CHANGERESPONSIBILITYSECIONVISIBILITY, ADDRESPONSIBILITYLINE } from "../types";

const initialState = {
    loading: false,
    error: false,
    responsibilityArray: []
}

function responsobilityReducer(state = initialState, action) {
    switch (action.type) {
        case LOADRESPONSIBILITY:
            return { ...state, loading: true };
        case GETRESPONSIBILITYERROR:
            return { ...state, loading: false, error: true };
        case SETALLRESPONSIBILITY:
            return { responsibilityArray: action.payload, loading: false, error: false };
        case UPDATERESPONSIBILITYARRAY:
            return { ...state, responsibilityArray: action.payload };
        case CHANGERESPONSIBILITYSECIONVISIBILITY:
            return { ...state, responsibilityArray: action.payload };

        case ADDRESPONSIBILITYLINE:
            return { ...state, responsibilityArray: action.payload };
        default:
            return state;
    }
}
export default responsobilityReducer;