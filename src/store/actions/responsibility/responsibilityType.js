import store from '../../';
import { getClonedResponsibilityArray, getResponsibilityArray } from '../../../utils/storeGetters';
import { ADDNEWTYPE, CHANGETYPEID } from '../../types';

import axios from 'axios';


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
        //         const res = await axios.post('/addNewType',{
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
        type: ADDNEWTYPE,
        payload: array
    }
}


function setNewTypeIdActionCreator(array) {
    return {
        type: CHANGETYPEID,
        payload: array
    }
}





export {
    addNewType
}