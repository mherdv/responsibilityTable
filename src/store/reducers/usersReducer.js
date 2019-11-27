import {
    SET_ALL_USERS,
    LOAD_USERS,
    GET_USERS_ERROR,
    CHANGE_DEPORTMENT_VISIBILITY_STATUS,
    CHANGE_DEPORTMENT_SHOW_HALF_STATUS
} from "../types";

const initialState = {
    usersArray: [],
    loading: false,
    error: false
};

function usersReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_USERS:
            return { ...state, loading: true };
        case GET_USERS_ERROR:
            return { ...state, loading: false, error: true };
        case SET_ALL_USERS:
            return { usersArray: action.payload, loading: false, error: false };

        case CHANGE_DEPORTMENT_VISIBILITY_STATUS:
            return { ...state, usersArray: action.payload }
        case CHANGE_DEPORTMENT_SHOW_HALF_STATUS:
            return { ...state, usersArray: action.payload }
        default:
            return state;
    }
}

export default usersReducer;