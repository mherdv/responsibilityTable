import { REMOVE_RESPONSIBILITY_LINE, ADD_RESPONSIBILITY_LINE } from "../../types"
import axios from "axios"
// todo add catch handling 
import store from '../../';
import { getClonedResponsibilityArray, getResponsibilityArray } from "../../../utils/storeGetters";
import { iterationCopy } from "../../../utils/cloningObject";
import API_Rotes from '../API_Routes';

const addResponsibilityLineAction = ({ newArray, description, containerId, newRowObject, containerIndex, typeId,LastArray, typeIndex }) => {
    // {newArray,containerId,newRowObject}
    newArray[containerIndex].types[typeIndex].responsibilities.push(newRowObject);
    store.dispatch(addResponsibilityLineActionCreator(newArray));
    return async function (dispatch) {
       
        // try {
        //    const res = await axios.post( API_Rotes.addNewLine,{
        //         
        //         description , typeId ,name:newRowObject.name
        //    })



        //    if(res.status === 200){
        //      newRowObject.id = res.data.id;

        // newArray[containerIndex].responsibilities.push(newRowObject);
        // dispatch(addResponsibilityLineActionCreator(newArray))
        //    }
        //    else {
        // alert('some error')
        //    dispatch(addResponsibilityLineActionCreator(LastArray))
        // }
        // } catch (e) {
        // alert('some error')
        // dispatch(addResponsibilityLineActionCreator(LastArray))
        // }
    }
}





function addResponsibilityLine({ description, containerIndex, containerId, typeIndex, name,typeId }) {

    const newArray = getClonedResponsibilityArray();
    const LastArray = getResponsibilityArray();


    const newRowObject = { id: '_' + Math.random().toString(36).substr(2, 9), description: description, users: {}, name }



    store.dispatch(addResponsibilityLineAction({ newArray,typeId, containerId, newRowObject, description, containerIndex, LastArray, typeIndex }))

}


// function createResponsibilityTypeAddNewLine({
//     containerId,
//     containerIndex,
//     typeName,
//     lineProps
// }) {
//     const newArray = getClonedResponsibilityArray();
//     const LastArray = getResponsibilityArray();


//     const responsibilityLine = {
//         id: '_' + Math.random().toString(36).substr(2, 9),
//         description: lineProps.description,
//         name: lineProps.name,
//         users: {}
//     }

//     const newType = {
//         id: '_' + Math.random().toString(36).substr(2, 9),
//         name: typeName,
//         responsibilities: [
//             responsibilityLine
//         ]
//     }


//     newArray[containerIndex].types.push(newType);

//     store.dispatch(createResponsibilityTypeAddNewLineAction({
//         newArray,
//         LastArray,
//         responsibilityLine,
//         containerIndex,
//         containerId,
//         newType
//     }))
// }

// const createResponsibilityTypeAddNewLineAction = ({
//     newArray,
//     LastArray,
//     containerIndex,
//     responsibilityLine,
//     newType,
//     containerId
// }) => {

//     store.dispatch(createResponsibilityTypeAddNewLineActionCreator(newArray))
//     return async (dispatch) => {

//         // try {
//         //     const response = await axios.post('/createNewTypeAndLine', {
//         //         containerId
//         //     })
//         //     if (!response) throw new Error({});

//         //     const { rowId, typeId } = response;

//         //     const cloneResponsibilityLine = iterationCopy(responsibilityLine);
//         //     const cloneType = iterationCopy(newType);
//         //     cloneResponsibilityLine.id = rowId;
//         //     cloneType.responsibilities[0] = cloneResponsibilityLine;
//         //     cloneType.id = typeId;
//         //     LastArray[containerIndex].types.push(cloneType);
//         //     dispatch(createResponsibilityTypeAddNewLineActionCreator(LastArray));


//         // } catch (e) {
//         //     alert('error');
//         //     dispatch(createResponsibilityTypeAddNewLineActionCreator(LastArray))
//         // }
//     }
// }


// const createResponsibilityTypeAddNewLineActionCreator = (newArray) => {

//     return {
//         type: CREATE_RESPONSIBILITY_TYPE_AND_NEW_LINE,
//         payload: newArray

//     }
// }


const addResponsibilityLineActionCreator = (newArray) => {
    return {
        type: ADD_RESPONSIBILITY_LINE,
        payload: newArray
    }
}




function removeResponsibilityLine({ containerIndex, rowIndex, rowId, typeIndex }) {

    const newArray = getClonedResponsibilityArray();
    const LastArray = getResponsibilityArray();

    newArray[containerIndex].types[typeIndex].responsibilities[rowIndex].removed = true;


    store.dispatch(removeResponsibilityLineAction({ newArray, id: rowId, LastArray }));
}

const removeResponsibilityLineAction = ({ newArray, id, LastArray }) => {

    store.dispatch(removeLine(newArray))
    return async function (dispatch) {
        
        // try {
        //    const res = await axios.post(API_Rotes.removeResponsibilityLine,{
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
        type: REMOVE_RESPONSIBILITY_LINE,
        payload: newArray
    }
}


export { removeResponsibilityLine, addResponsibilityLine }
