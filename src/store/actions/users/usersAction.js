import { LOAD_USERS, GET_USERS_ERROR, SET_ALL_USERS, CHANGE_DEPORTMENT_VISIBILITY_STATUS, CHANGE_DEPORTMENT_SHOW_HALF_STATUS } from "../../types";
import Axios from "axios";
import { iterationCopy } from "../../../utils/cloningObject";
import store from '../..';

import API_Rotes from '../API_Routes';


const getAllUsersAction = () => {
    return async (dispatch) => {
        dispatch(LoadingUsersAction())
        try {
            const response = await Axios.get(API_Rotes.getAllUsers);
            const users = response.data.users
            dispatch({ type: SET_ALL_USERS, payload: users })
        } catch (e) {
            dispatch(errorOnLoadAction())
        }
    }
}

const LoadingUsersAction = () => {
    return { type: LOAD_USERS }
}

const errorOnLoadAction = () => {
    return { type: GET_USERS_ERROR }
}

const changeDeportmentVisibilityStatusAction = (users) => {
    return {
        type: CHANGE_DEPORTMENT_VISIBILITY_STATUS,
        payload: users
    }
}
function changeDeportmentShowHalfAction(newUsersArray) {
    return {
        type: CHANGE_DEPORTMENT_SHOW_HALF_STATUS,
        payload: newUsersArray

    }
}

function toggleDeportment(
    index,
    usersArray
) {

    const newUsersArray = iterationCopy(usersArray);
    newUsersArray[index].show = newUsersArray[index].show === 0 ? 1 : 0;
    store.dispatch(changeDeportmentVisibilityStatusAction(newUsersArray));
}

function showHalfDeportmentUsers(index, usersArray) {
    const newUsersArray = iterationCopy(usersArray);
    newUsersArray[index].showHalf = newUsersArray[index].showHalf === 0 || newUsersArray[index].showHalf === undefined ? 1 : 0;
    store.dispatch(changeDeportmentShowHalfAction(newUsersArray));
}


export { getAllUsersAction, changeDeportmentVisibilityStatusAction, toggleDeportment, showHalfDeportmentUsers, changeDeportmentShowHalfAction };