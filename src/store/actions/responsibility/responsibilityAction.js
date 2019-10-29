import {
    LOADRESPONSIBILITY,
    GETRESPONSIBILITYERROR,
    SETALLRESPONSIBILITY,
    UPDATERESPONSIBILITYARRAY,
} from "../../types";
import axios from "axios";
import keys from '../../../constants/keys';
import store from '../../index';
import { getClonedResponsibilityArray, getResponsibilityArray } from "../../../utils/storeGetters";




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


function changeResponsibility({ userId, rowIndex, containerIndex }) {
    const newArray = getClonedResponsibilityArray();
    const LastArray = getResponsibilityArray();
    const users = newArray[containerIndex].responsibilities[rowIndex].users;

    users[userId] = !users[userId];
    store.dispatch(changeUserResponsibilityAction({
        newArray,
        userId,
        checked: users[userId],
        LastArray
    }))

    // todo send change request to server 
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









export {
    getAllResponsibilityAction,
    changeResponsibility
};


