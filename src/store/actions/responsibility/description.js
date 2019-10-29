import axios from "axios";
import { SETNEWRESPONSIBILITYDESCRIPTION, TOGGLEDESCRIPTIONFULLHEIGHT, DESCRIPTIONHEIGHTCHANGE } from "../../types";
import store from '../../index'
import { getClonedResponsibilityArray, getResponsibilityArray } from "../../../utils/storeGetters";

// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

const changeResponsibilityDescriptionAction = ({ newArray, rowId, text, lastArray }) => {


    store.dispatch(setNewResponsibilityDescriptionAction(newArray))
    return async function (dispatch) {
        try {

            // const res = await axios.post('/changeDescription',{
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

async function changeResponsibilityDescription(event, containerIndex, rowIndex) {

    const newArray = getClonedResponsibilityArray();
    const lastArray = getResponsibilityArray();

    const row = newArray[containerIndex].responsibilities[rowIndex];
    const { id: rowId } = newArray[containerIndex].responsibilities[rowIndex];
    const text = event.currentTarget.innerText.trim();
    row.description = text;

    await store.dispatch(changeResponsibilityDescriptionAction({ newArray, rowId, text, lastArray }))
}

const setNewResponsibilityDescriptionAction = (newArray) => {
    return {
        type: SETNEWRESPONSIBILITYDESCRIPTION,
        payload: newArray
    }
}



function toggleDescriptionFullHeight({ index }) {

    const newArr = getClonedResponsibilityArray();

    newArr[index].openAllDescriptions = !newArr[index].openAllDescriptions;

    store.dispatch(toggleDescriptionFullHeightAction(newArr))

}


const toggleDescriptionFullHeightAction = (newArray) => {

    return {
        type: TOGGLEDESCRIPTIONFULLHEIGHT,
        payload: newArray
    }
}
function descriptionHeightChange({ containerIndex, rowIndex, height }) {

    const newArr = getClonedResponsibilityArray();

    newArr[containerIndex].responsibilities[rowIndex].height = height;

    store.dispatch(descriptionHeightChangeAction(newArr));

}

const descriptionHeightChangeAction = (newArray) => {
    return {

        type: DESCRIPTIONHEIGHTCHANGE,
        payload: newArray
    }
}


export { changeResponsibilityDescription, toggleDescriptionFullHeight, descriptionHeightChange };



