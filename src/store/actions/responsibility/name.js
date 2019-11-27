import axios from "axios";
import { SET_NEW_RESPONSIBILITY_NAME, NAME_HEIGHT_CHANGE } from "../../types";
import store from '../../index'
import { getClonedResponsibilityArray, getResponsibilityArray } from "../../../utils/storeGetters";

import API_Rotes from '../API_Routes';

// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

const changeResponsibilityNameAction = ({ newArray, rowId, text, lastArray }) => {


    store.dispatch(setNewResponsibilityNameAction(newArray))
    return async function (dispatch) {
        try {
            
            // const res = await axios.post(API_Rotes.changeName,{
            //     rowId,
            //     text
            // },{
            //     cancelToken:source.token
            // })

            // if(res.status !== 200){
            //  alert('error')
            //  dispatch(setNewResponsibilityNameAction(lastArray))
            // }

        } catch (e) {
            // console.log(e);
            //  dispatch(setNewResponsibilityNameAction(lastArray))
        }

    }
}

function changeResponsibilityName({ event, containerIndex, rowIndex, typeIndex }) {

    const newArray = getClonedResponsibilityArray();
    const lastArray = getResponsibilityArray();


    const row = newArray[containerIndex].types[typeIndex].responsibilities[rowIndex];

    const { id: rowId } = row;
    const text = event.currentTarget.innerText.trim();
    row.name = text;

    store.dispatch(changeResponsibilityNameAction({ newArray, rowId, text, lastArray }))
}

const setNewResponsibilityNameAction = (newArray) => {
    return {
        type: SET_NEW_RESPONSIBILITY_NAME,
        payload: newArray
    }
}






export { changeResponsibilityName };



