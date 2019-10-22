import { LOADRESPONSIBILITY, GETRESPONSIBILITYERROR, SETALLRESPONSIBILITY, UPDATERESPONSIBILITYARRAY, CHANGERESPONSIBILITYSECIONVISIBILITY, ADDRESPONSIBILITYLINE, REMOVERESPONSIBILITYLINE } from "../types";
import Axios from "axios";
import keys from '../../constants/keys';
import store from '../index';




// todo think about changes 
// todo change names 
// test version of changing user status 

const changeUserResponsibilityAction = (responsibility) => {
    return {
        type: UPDATERESPONSIBILITYARRAY,
        payload: responsibility
    }
}


const getAllResponsibilityAction = () => {

    return async (dispatch) => {
        dispatch(loadingResponsibilityAction())
        try {
            const response = await Axios.get(`${keys.HOST}/responsibility.json`);
            const responsibility = response.data.responsibilitiesArray;
            dispatch({ type: SETALLRESPONSIBILITY, payload: responsibility })
        } catch (e) {
            dispatch(errorOnLoadAction())
        }
    }
}

const loadingResponsibilityAction = () => {
    return { type: LOADRESPONSIBILITY }
}

const errorOnLoadAction = () => {
    return { type: GETRESPONSIBILITYERROR }
}

const changeResponsibilitySectionVisibilityAction = (newArray) => {
    return {
        type: CHANGERESPONSIBILITYSECIONVISIBILITY,
        payload: newArray
    }
}

const addResponsibilityLineAction = (newArray) => {
    return {
        type: ADDRESPONSIBILITYLINE,
        payload: newArray,
    }
}

const removeResponsibilityLineAction = (newArray) => {
    return {
        type: REMOVERESPONSIBILITYLINE,
        payload: newArray
    }
}

export { getAllResponsibilityAction, changeUserResponsibilityAction, changeResponsibilitySectionVisibilityAction, addResponsibilityLineAction, removeResponsibilityLineAction };


