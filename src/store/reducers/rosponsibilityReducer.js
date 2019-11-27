import { LOAD_RESPONSIBILITY, GET_RESPONSIBILITY_ERROR, SET_ALL_RESPONSIBILITY, UPDATE_RESPONSIBILITY_ARRAY, CHANGE_RESPONSIBILITY_SECTION_VISIBILITY, ADD_RESPONSIBILITY_LINE, REMOVE_RESPONSIBILITY_LINE, SET_NEW_RESPONSIBILITY_DESCRIPTION, TOGGLE_EDITABLE_TEXT_FULL_HEIGHT, REMOVE_RESPONSIBILITY_SECTION, ADD_RESPONSIBILITY_SECTION, CHANGE_SECTION_TITLE, DESCRIPTION_HEIGHT_CHANGE, CREATE_RESPONSIBILITY_TYPE_AND_NEW_LINE, SET_NEW_RESPONSIBILITY_NAME, ADD_NEW_TYPE, CHANGE_TYPE_NAME } from "../types";

const initialState = {
    loading: false,
    error: false,
    responsibilityArray: []
}

function responsobilityReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_RESPONSIBILITY:
            return { ...state, loading: true };
        case GET_RESPONSIBILITY_ERROR:
            return { ...state, loading: false, error: true };
        case SET_ALL_RESPONSIBILITY:
            return { responsibilityArray: action.payload, loading: false, error: false };
        case UPDATE_RESPONSIBILITY_ARRAY:
            return { ...state, responsibilityArray: action.payload };
        case CHANGE_RESPONSIBILITY_SECTION_VISIBILITY:
            return { ...state, responsibilityArray: action.payload };
        case ADD_RESPONSIBILITY_LINE:
            return { ...state, responsibilityArray: action.payload };
        case REMOVE_RESPONSIBILITY_LINE:
            return { ...state, responsibilityArray: action.payload };
        case SET_NEW_RESPONSIBILITY_DESCRIPTION:
            return { ...state, responsibilityArray: action.payload };
        case TOGGLE_EDITABLE_TEXT_FULL_HEIGHT:
            return { ...state, responsibilityArray: action.payload };
        case REMOVE_RESPONSIBILITY_SECTION:
            return { ...state, responsibilityArray: action.payload };
        case ADD_RESPONSIBILITY_SECTION:
            return { ...state, responsibilityArray: action.payload };
        case CHANGE_SECTION_TITLE:
            return { ...state, responsibilityArray: action.payload };
        case DESCRIPTION_HEIGHT_CHANGE:
            return { ...state, responsibilityArray: action.payload };
        case CREATE_RESPONSIBILITY_TYPE_AND_NEW_LINE:
            return { ...state, responsibilityArray: action.payload };
        case SET_NEW_RESPONSIBILITY_NAME:
            return { ...state, responsibilityArray: action.payload };


        case ADD_NEW_TYPE:
            return { ...state, responsibilityArray: action.payload };

        case CHANGE_TYPE_NAME:
            return { ...state, responsibilityArray: action.payload };
        default:
            return state;
    }
}
export default responsobilityReducer;