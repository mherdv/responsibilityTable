import { SHOW_USER_FULL_DESCRIPTION_MODAL, HIDE_USER_FULL_DESCRIPTION_MODAL } from "../types";

const initialState = {

    isVisible: false,
    user: null,
    responsibilities: []
}

function userFullInfoModal(state = initialState, action) {
    switch (action.type) {
        case SHOW_USER_FULL_DESCRIPTION_MODAL:
            return { responsibilities: action.payload.responsibilities, user: action.payload.user, isVisible: true };
        case HIDE_USER_FULL_DESCRIPTION_MODAL:
            return initialState;
        default:
            return state;
    }
}

export default userFullInfoModal;