import { LOADRESPONSIBILITY, GETRESPONSIBILITYERROR, SETALLRESPONSIBILITY, UPDATERESPONSIBILITYARRAY, CHANGERESPONSIBILITYSECIONVISIBILITY, ADDRESPONSIBILITYLINE } from "../types";
import Axios from "axios";
import keys from '../../constants/keys';
import store from '../index';




// todo think about changes 
// todo change names 
// test version of changing user status 

const changeUserResponsibility = (responsibility) => {
    return {
        type: UPDATERESPONSIBILITYARRAY,
        payload: responsibility
    }
}


const getAllResponsibility = () => {

    return async (dispatch) => {
        dispatch(loadingResponsibility())
        try {
            const response = await Axios.get(`${keys.HOST}/responsibility.json`);
            const responsibility = response.data.responsibilitysArray;
            dispatch({ type: SETALLRESPONSIBILITY, payload: responsibility })
        } catch (e) {
            dispatch(errorOnLoad())
        }
    }
}

const loadingResponsibility = () => {
    return { type: LOADRESPONSIBILITY }
}

const errorOnLoad = () => {
    return { type: GETRESPONSIBILITYERROR }
}

const changeResponsibilitySectionVisibility = (newArray) => {
    return {
        type: CHANGERESPONSIBILITYSECIONVISIBILITY,
        payload: newArray
    }
}
const addResponsibilityLine = (newArray) => {
    return {
        type: ADDRESPONSIBILITYLINE,
        payload: newArray,
    }
}

export { getAllResponsibility, changeUserResponsibility, changeResponsibilitySectionVisibility, addResponsibilityLine };


