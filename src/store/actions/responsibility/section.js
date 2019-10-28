import axios from "axios";
import { REMOVERESPONSIBILITYSECTION, ADDRESPONSIBILITYSECTION, CHAGESECTIONTITLE } from "../../types";
import store from '../../index';

function removeResponsibilitySectionAction({ newArray, sectionId, lastArray }) {

    store.dispatch(removeSection(newArray))


    return async function (dispatch) {
        // try {
        //     const res = await axios.post('/removeSection', {
        //         sectionId
        //     })

        //     if (res.status !== 200) {
        //          alert('error') 
        //          dispatch(removeSection(lastArray));
        //     }
        // } catch (e) {
        //     console.log(e)
        //          alert('error') 
        //          dispatch(removeSection(lastArray));
        // }
    }

}
function removeSection(newArray) {
    return {
        type: REMOVERESPONSIBILITYSECTION,
        payload: newArray
    }
}

function addResponsibilitySectionAction({ newArray, name, newSection, lastArray }) {


    newArray.push(newSection)
    store.dispatch(addSection(newArray))

    return async function (dispatch) {
        // try {
        //     const res = await axios.post('/createSection',{name});

        //     if(res.status !== 200){
        //        newSection.id = res.body.id
        //          alert('error')
        //          dispatch(addSection(lastArray))
        //     }
        // } catch (e) {
        //     console.log(e)
        // alert('error')
        // dispatch(addSection(lastArray)) 

        // }
    }
}

function addSection(newArray) {
    return {
        type: ADDRESPONSIBILITYSECTION,
        payload: newArray
    }
}

function changeSectionNameAction({ newArray, sectionId, newName, sectionIndex, lastArray }) {


    newArray[sectionIndex].name = newName;
    store.dispatch(changeName(newArray))
    return async function (dispatch) {
        try {
            // const res = await axios.post('/changeName',{
            //     sectionId,
            //     newName
            // })

            // if(res.status !== 200){
            //      dispatch(lastArray)
            //      
            //      
            //      
            // }
        } catch (e) {
            console.log(e);
            // alert('error')
            //   dispatch(lastArray)
        }

    }
}

function changeName(newArray) {
    return {
        type: CHAGESECTIONTITLE,
        payload: newArray
    }
}


export {
    removeResponsibilitySectionAction,
    addResponsibilitySectionAction,
    changeSectionNameAction
}