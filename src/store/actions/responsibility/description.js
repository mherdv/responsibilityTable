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

async function changeResponsibilityDescription({ event, containerIndex, rowIndex, typeIndex }) {

    const newArray = getClonedResponsibilityArray();
    const lastArray = getResponsibilityArray();


    const row = newArray[containerIndex].types[typeIndex].responsibilities[rowIndex];
    // todo fix this ideotizm 
    const { id: rowId } = newArray[containerIndex].types[typeIndex].responsibilities[rowIndex];
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

    const newArray = getClonedResponsibilityArray();

    newArray[index].openAllDescriptions = !newArray[index].openAllDescriptions;

    store.dispatch(toggleDescriptionFullHeightAction(newArray))

}


const toggleDescriptionFullHeightAction = (newArray) => {

    return {
        type: TOGGLEDESCRIPTIONFULLHEIGHT,
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

        type: DESCRIPTIONHEIGHTCHANGE,
        payload: newArray
    }
}


export { changeResponsibilityDescription, toggleDescriptionFullHeight, descriptionHeightChange };



