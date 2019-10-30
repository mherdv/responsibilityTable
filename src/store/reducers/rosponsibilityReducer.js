import { LOADRESPONSIBILITY, GETRESPONSIBILITYERROR, SETALLRESPONSIBILITY, UPDATERESPONSIBILITYARRAY, CHANGERESPONSIBILITYSECIONVISIBILITY, ADDRESPONSIBILITYLINE, REMOVERESPONSIBILITYLINE, SETNEWRESPONSIBILITYDESCRIPTION, TOGGLEDESCRIPTIONFULLHEIGHT, REMOVERESPONSIBILITYSECTION, ADDRESPONSIBILITYSECTION, CHAGESECTIONTITLE, DESCRIPTIONHEIGHTCHANGE, CREATERESPONSIBILITYTYPEANDNEWLINE } from "../types";

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
        case REMOVERESPONSIBILITYLINE:
            return { ...state, responsibilityArray: action.payload };
        case SETNEWRESPONSIBILITYDESCRIPTION:
            return { ...state, responsibilityArray: action.payload };
        case TOGGLEDESCRIPTIONFULLHEIGHT:
            return { ...state, responsibilityArray: action.payload };
        case REMOVERESPONSIBILITYSECTION:
            return { ...state, responsibilityArray: action.payload };
        case ADDRESPONSIBILITYSECTION:
            return { ...state, responsibilityArray: action.payload };
        case CHAGESECTIONTITLE:
            return { ...state, responsibilityArray: action.payload };
        case DESCRIPTIONHEIGHTCHANGE:
            return { ...state, responsibilityArray: action.payload };
        case CREATERESPONSIBILITYTYPEANDNEWLINE:
            return { ...state, responsibilityArray: action.payload };
        default:
            return state;
    }
}
export default responsobilityReducer;