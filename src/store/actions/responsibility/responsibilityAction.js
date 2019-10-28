import {
    LOADRESPONSIBILITY,
    GETRESPONSIBILITYERROR,
    SETALLRESPONSIBILITY,
    UPDATERESPONSIBILITYARRAY,
    CHANGERESPONSIBILITYSECIONVISIBILITY,
} from "../../types";
import axios from "axios";
import keys from '../../../constants/keys';
import store from '../../index';





const changeUserResponsibilityAction = ({ newArray, userId, checked, LastArray }) => {
    store.dispatch(changeResponsibilityAction(newArray))



    return async (dispatch) => {


        // axios.post('/setResponsibility', {
        //     userId,
        //     checked
        // }).then((res) => {

        //     if (res.status != 200) {

        //     } else {
        //         alert('there is some error returning last correct version');

        //         dispatch(changeResponsibilityAction(LastArray))
        //     }
        // }).catch(err => {
        //     alert('there is some error returning last correct version');

        //     dispatch(changeResponsibilityAction(LastArray))
        // })
    }
}


const changeResponsibilityAction = (newArray) => {

    return {
        type: UPDATERESPONSIBILITYARRAY,
        payload: newArray
    }
}

const getAllResponsibilityAction = () => {

    return async (dispatch) => {
        dispatch(loadingResponsibilityAction())
        try {
            const response = await axios.get(`${keys.HOST}/responsibility.json`);
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







export {
    getAllResponsibilityAction,
    changeUserResponsibilityAction,
    changeResponsibilitySectionVisibilityAction
};


