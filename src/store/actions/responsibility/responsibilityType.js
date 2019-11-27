import store from '../../';
import { getClonedResponsibilityArray, getResponsibilityArray } from '../../../utils/storeGetters';
import { ADD_NEW_TYPE, CHANGE_TYPE_ID, CHANGE_TYPE_NAME } from '../../types';

import axios from 'axios';
import  API_Rotes from '../API_Routes';


function addNewType({ name, containerId, containerIndex }) {
    const newArray = getClonedResponsibilityArray();
    const lastArray = getResponsibilityArray();


    const newType = {
        id: '_' + Math.random().toString(36).substr(2, 9),
        name,
        responsibilities: []
    }
    newArray[containerIndex].types.push(newType);

    const typeIndex = newArray.indexOf(newType);

    store.dispatch(addNewTypeAction({ newArray, lastArray, typeIndex, containerId, name, containerIndex }))

}


function addNewTypeAction({ newArray, lastArray, containerId, name, typeIndex, containerIndex }) {

    store.dispatch(addNewLineActionCreator(newArray));

    return async (dispatch) => {

        
        //     try {
        //         const res = await axios.post(API_Rotes.addNewType,{
        //             containerId,name
        //         })

        //         if(res.status !==200) throw new Error({});

        //         const copyNewArray = getClonedResponsibilityArray();
        //         copyNewArray[containerIndex].types[typeIndex].id = res.id;

        //         dispatch(setNewTypeIdActionCreator(copyNewArray))
        //     } catch (e) {

        //         alert('error');
        //         dispatch(addNewLineActionCreator(lastArray));
        //     }
    }
}


function addNewLineActionCreator(array) {
    return {
        type: ADD_NEW_TYPE,
        payload: array
    }
}


// function setNewTypeIdActionCreator(array) {
//     return {
//         type: CHANGE_TYPE_ID,
//         payload: array
//     }
// }


function changeTypeName({ name, typeId, containerIndex, typeIndex }) {

    const newArray = getClonedResponsibilityArray();
    const lastArray = getResponsibilityArray();

    newArray[containerIndex].types[typeIndex].name = name;

    store.dispatch(changeTypeNameAction({ newArray, lastArray, typeId, name }))
}


function changeTypeNameAction({ newArray, lastArray, typeId, name }) {

    store.dispatch(changeTypeNameActionCreator(newArray))

    return async (dispatch) => {
        

        //     try {
        //         const res = await axios.post(API_Rotes.changeTypeName,{
        //             typeId,
        //             name
        //         })
        //         if(res.status !==200) throw new Error({})
        //     } catch (e) {
        //         alert("error");
        //         dispatch(changeTypeNameActionCreator(lastArray))
        //     }

    }
}

function changeTypeNameActionCreator(array) {
    return {
        type: CHANGE_TYPE_NAME,
        payload: array
    }
}




export {
    addNewType,
    changeTypeName,
}