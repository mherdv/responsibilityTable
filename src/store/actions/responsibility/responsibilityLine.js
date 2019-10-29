import { REMOVERESPONSIBILITYLINE, ADDRESPONSIBILITYLINE } from "../../types"
// import axios from "axios"
// todo add catch handling 
import store from '../../index';
import { getClonedResponsibilityArray, getResponsibilityArray } from "../../../utils/storeGetters";

const addResponsibilityLineAction = ({ newArray, description, containerId, newRowObject, containerIndex, LastArray }) => {
    // {newArr,containerId,newRowObject}
    newArray[containerIndex].responsibilities.push(newRowObject);
    store.dispatch(addLine(newArray));
    return async function (dispatch) {
        // try {
        //    const res = await axios.post('/addNewRod',{
        //         containerId,
        //         description
        //    })



        //    if(res.status === 200){
        //      newRowObject.id = res.data.id;

        // newArray[containerIndex].responsibilities.push(newRowObject);
        // dispatch(addLine(newArray))
        //    }
        //    else {
        // alert('some error')
        //    dispatch(addLine(LastArray))
        // }
        // } catch (e) {
        // alert('some error')
        // dispatch(addLine(LastArray))
        // }
    }
}





function addResponsibilityLine({ description, containerIndex, containerId }) {

    const newArray = getClonedResponsibilityArray();
    const LastArray = getResponsibilityArray();

    // todo unique id shod come from server after adding 
    const newRowObject = { id: '_' + Math.random().toString(36).substr(2, 9), description: description, users: {} }



    store.dispatch(addResponsibilityLineAction({ newArray, containerId, newRowObject, description, containerIndex, LastArray }))

}


const addLine = (newArr) => {
    return {
        type: ADDRESPONSIBILITYLINE,
        payload: newArr
    }
}




function removeResponsibilityLine({ containerIndex, rowIndex, rowId }) {

    const newArray = getClonedResponsibilityArray();
    const LastArray = getResponsibilityArray();

    newArray[containerIndex].responsibilities[rowIndex].removed = true;


    store.dispatch(removeResponsibilityLineAction({ newArray, id: rowId, LastArray }));
}

const removeResponsibilityLineAction = ({ newArray, id, LastArray }) => {

    store.dispatch(removeLine(newArray))
    return async function (dispatch) {
        // try {
        //    const res = await axios.post('/removeResponsibilityLine',{
        //         id,
        //     })
        //     if(res.status!==200){
        //          alert('error')
        //          dispatch(removeLine(LastArray))
        //    }
        // } catch (e) {
        //     console.log(e)
        // }
    }
}

const removeLine = (newArray) => {
    return {
        type: REMOVERESPONSIBILITYLINE,
        payload: newArray
    }
}


export { removeResponsibilityLine, addResponsibilityLine }
