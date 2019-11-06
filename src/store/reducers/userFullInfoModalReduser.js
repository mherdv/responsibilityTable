import { SHOWUSERFULLDESCRIPTIONMODAL, HIDESERFULLDESCRIPTIONMODAL } from "../types";

const initialState = {

    isVisible: false,
    user: null,
    responsibilities: []
}

function userFullInfoModal(state = initialState, action) {
    switch (action.type) {
        case SHOWUSERFULLDESCRIPTIONMODAL:
            return { responsibilities: action.payload.responsibilities, user: action.payload.user, isVisible: true };
        case HIDESERFULLDESCRIPTIONMODAL:
            return initialState;
        default:
            return state;
    }
}

export default userFullInfoModal;