import { LOADUSERS, GETUSERSERROR, SETALLUSERS, CHANGEDEPORTMENTVISIBILITYSTATUS, CHANGEDEPORTMENTSHOWHALF } from "../../types";
import Axios from "axios";
import keys from '../../../constants/keys';
import { iterationCopy } from "../../../utils/cloningObject";
import store from '../..';


const getAllUsersAction = () => {
    return async (dispatch) => {
        dispatch(LoadingUsersAction())
        try {
            const response = await Axios.get(`${keys.HOST}/users.json`);
            const users = response.data.users
            dispatch({ type: SETALLUSERS, payload: users })
        } catch (e) {
            dispatch(errorOnLoadAction())
        }
    }
}

const LoadingUsersAction = () => {
    return { type: LOADUSERS }
}

const errorOnLoadAction = () => {
    return { type: GETUSERSERROR }
}

const changeDeportmentVisibilityStatusAction = (users) => {
    return {
        type: CHANGEDEPORTMENTVISIBILITYSTATUS,
        payload: users
    }
}
function changeDeportmentShowHalfAction(newUsersArray) {
    return {
        type: CHANGEDEPORTMENTSHOWHALF,
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