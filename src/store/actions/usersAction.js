import { LOADUSERS, GETUSERSERROR, SETALLUSERS, CHANGEDEPORTMENTVISIBILITYSTATUS } from "../types";
import Axios from "axios";
import keys from '../../constants/keys';


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

export { getAllUsersAction, changeDeportmentVisibilityStatusAction };