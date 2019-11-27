import axios from "axios";
import { SET_NEW_RESPONSIBILITY_DESCRIPTION, TOGGLE_EDITABLE_TEXT_FULL_HEIGHT, DESCRIPTION_HEIGHT_CHANGE } from "../../types";
import store from '../../index'
import { getClonedResponsibilityArray, getResponsibilityArray } from "../../../utils/storeGetters";
import API_Rotes from '../API_Routes';

// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

const changeResponsibilityDescriptionAction = ({ newArray, rowId, text, lastArray }) => {


    store.dispatch(setNewResponsibilityDescriptionAction(newArray))
    return async function (dispatch) {
        try {
            

            // const res = await axios.post(API_Rotes.changeDescription,{
            //     rowId,
            //     text
            // },{
            //     cancelToken:source.token
            // })

            // if(res.status !== 200){
            //  alert('error')
            //  dispatch(setNewResponsibilityDescriptionAction(lastArray))
            // }

        } catch (e) {
            // console.log(e);
            //  dispatch(setNewResponsibilityDescriptionAction(lastArray))
        }

    }
}

function changeResponsibilityDescription({ event, containerIndex, rowIndex, typeIndex }) {

    const newArray = getClonedResponsibilityArray();
    const lastArray = getResponsibilityArray();


    const row = newArray[containerIndex].types[typeIndex].responsibilities[rowIndex];

    const { id: rowId } = row;
    const text = event.currentTarget.innerText.trim();
    row.description = text;

    store.dispatch(changeResponsibilityDescriptionAction({ newArray, rowId, text, lastArray }))
}

const setNewResponsibilityDescriptionAction = (newArray) => {
    return {
        type: SET_NEW_RESPONSIBILITY_DESCRIPTION,
        payload: newArray
    }
}



function toggleDescriptionFullHeight({ index }) {

    const newArray = getClonedResponsibilityArray();

    newArray[index].openAllDescriptions = !newArray[index].openAllDescriptions;

    store.dispatch(toggleDescriptionFullHeightAction(newArray))

}


const toggleDescriptionFullHeightAction = (newArray) => {

    return {
        type: TOGGLE_EDITABLE_TEXT_FULL_HEIGHT,
        payload: newArray
    }
}
function descriptionHeightChange({ containerIndex, rowIndex, height, typeIndex }) {

    const newArray = getClonedResponsibilityArray();


    newArray[containerIndex].types[typeIndex].responsibilities[rowIndex].height = height;

    store.dispatch(descriptionHeightChangeAction(newArray));

}

const descriptionHeightChangeAction = (newArray) => {
    return {

        type: DESCRIPTION_HEIGHT_CHANGE,
        payload: newArray
    }
}


export { changeResponsibilityDescription, toggleDescriptionFullHeight, descriptionHeightChange };



