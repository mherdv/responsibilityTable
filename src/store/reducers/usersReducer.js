import {
    SETALLUSERS,
    LOADUSERS,
    GETUSERSERROR,
    CHANGEDEPORTMENTVISIBILITYSTATUS,
    CHANGEDEPORTMENTSHOWHALF
} from "../types";

const initialState = {
    usersArray: [],
    loading: false,
    error: false
};

function usersReducer(state = initialState, action) {

    switch (action.type) {
        case LOADUSERS:
            return { ...state, loading: true };
        case GETUSERSERROR:
            return { ...state, loading: false, error: true };
        case SETALLUSERS:
            return { usersArray: action.payload, loading: false, error: false };

        case CHANGEDEPORTMENTVISIBILITYSTATUS:
            return { ...state, usersArray: action.payload }
        case CHANGEDEPORTMENTSHOWHALF:
            return { ...state, usersArray: action.payload }
        default:
            return state;
    }
}

export default usersReducer;