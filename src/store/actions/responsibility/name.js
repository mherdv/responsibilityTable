import axios from "axios";
import { SETNEWRESPONSIBILITYNAME, TOGGLENAMEFULLHEIGHT, NAMEHEIGHTCHANGE } from "../../types";
import store from '../../index'
import { getClonedResponsibilityArray, getResponsibilityArray } from "../../../utils/storeGetters";

// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

const changeResponsibilityNameAction = ({ newArray, rowId, text, lastArray }) => {


    store.dispatch(setNewResponsibilityNameAction(newArray))
    return async function (dispatch) {
        try {

            // const res = await axios.post('/changeName',{
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

async function changeResponsibilityName({ event, containerIndex, rowIndex, typeIndex }) {

    const newArray = getClonedResponsibilityArray();
    const lastArray = getResponsibilityArray();


    const row = newArray[containerIndex].types[typeIndex].responsibilities[rowIndex];

    const { id: rowId } = row;
    const text = event.currentTarget.innerText.trim();
    row.name = text;

    await store.dispatch(changeResponsibilityNameAction({ newArray, rowId, text, lastArray }))
}

const setNewResponsibilityNameAction = (newArray) => {
    return {
        type: SETNEWRESPONSIBILITYNAME,
        payload: newArray
    }
}






export { changeResponsibilityName };



