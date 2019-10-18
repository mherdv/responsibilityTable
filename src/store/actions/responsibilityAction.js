import { LOADRESPONSIBILITY, GETRESPONSIBILITYERROR, SETALLRESPONSIBILITY } from "../types";
import Axios from "axios";
import keys from '../../constants/keys';


const getAllResponsibility = () => {
    return async (dispatch) => {
        dispatch(LoadingResponsibility())
        try {
            const response = await Axios.get(`${keys.HOST}/responsibility.json`);
            const responsibility = response.data.responsibility
            dispatch({ type: SETALLRESPONSIBILITY, payload: responsibility })
        } catch (e) {
            dispatch(errorOnLoad())
        }

    }
}

const LoadingResponsibility = () => {
    return { type: LOADRESPONSIBILITY }
}

const errorOnLoad = () => {
    return { type: GETRESPONSIBILITYERROR }
}

export { getAllResponsibility };