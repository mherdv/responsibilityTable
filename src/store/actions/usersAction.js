import { LOADUSERS, GETUSERSERROR, SETALLUSERS } from "../types";
import Axios from "axios";
import keys from '../../constants/keys';


const getAllUsers = () => {
    return async (dispatch) => {
        dispatch(LoadingUsers())
        try {
            const response = await Axios.get(`${keys.HOST}/users.json`);
            const users = response.data.users
            dispatch({ type: SETALLUSERS, payload: users })
        } catch (e) {
            dispatch(errorOnLoad())
        }

    }
}

const LoadingUsers = () => {
    return { type: LOADUSERS }
}

const errorOnLoad = () => {
    return { type: GETUSERSERROR }
}

export { getAllUsers };