import {
    LOAD_RESPONSIBILITY,
    GET_RESPONSIBILITY_ERROR,
    SET_ALL_RESPONSIBILITY,
    UPDATE_RESPONSIBILITY_ARRAY,
} from "../../types";
import axios from "axios";
import keys from '../../../constants/keys';
import store from '../../index';
import { getClonedResponsibilityArray, getResponsibilityArray } from "../../../utils/storeGetters";

import API_Rotes from '../API_Routes';




const changeUserResponsibilityAction = ({ newArray, userId, status, LastArray }) => {
    store.dispatch(changeResponsibilityAction(newArray))



    return async (dispatch) => {

        
        // axios.post(API_Rotes.setResponsibility, {
        //     userId,
        //     status
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


function changeResponsibility({ userId, rowIndex, containerIndex, typeIndex }) {
    const newArray = getClonedResponsibilityArray();
    const LastArray = getResponsibilityArray();

    const users = newArray[containerIndex].types[typeIndex].responsibilities[rowIndex].users;

    users[userId] = users[userId] === undefined ? 1 : users[userId] >= 3 ? 1 : ++users[userId];

    store.dispatch(changeUserResponsibilityAction({
        newArray,
        userId,
        status: users[userId],
        LastArray
    }))

    // todo send change request to server 
}


const changeResponsibilityAction = (newArray) => {

    return {
        type: UPDATE_RESPONSIBILITY_ARRAY,
        payload: newArray
    }
}

const getAllResponsibilityAction = () => {

    return async (dispatch) => {
        dispatch(loadingResponsibilityAction())
        try {
            const response = await axios.get(API_Rotes.getAllResponsibilities);
            const responsibility = response.data.responsibilitiesArray;
            dispatch({ type: SET_ALL_RESPONSIBILITY, payload: responsibility })
        } catch (e) {
            dispatch(errorOnLoadAction())
        }
    }
}

const loadingResponsibilityAction = () => {
    return { type: LOAD_RESPONSIBILITY }
}

const errorOnLoadAction = () => {
    return { type: GET_RESPONSIBILITY_ERROR }
}









export {
    getAllResponsibilityAction,
    changeResponsibility
};


