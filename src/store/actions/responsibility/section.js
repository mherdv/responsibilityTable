import axios from "axios";
import { REMOVERESPONSIBILITYSECTION, ADDRESPONSIBILITYSECTION, CHAGESECTIONTITLE, CHANGERESPONSIBILITYSECIONVISIBILITY } from "../../types";
import store from '../../index';
import { iterationCopy } from "../../../utils/cloningObject";
import { getClonedResponsibilityArray, getResponsibilityArray } from "../../../utils/storeGetters";




function removeResponsibilitySection({ sectionId, sectionIndex }) {
    const newArray = getClonedResponsibilityArray();
    const lastArray = getResponsibilityArray();
    newArray[sectionIndex].removed = true;

    store.dispatch(removeResponsibilitySectionAction({ newArray, sectionId, lastArray: lastArray }))


}


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



function addResponsibilitySection({ name }) {
    const newArray = getClonedResponsibilityArray();
    const lastArray = getResponsibilityArray();


    const newSection = {
        name,
        show: 1,
        id: '_' + Math.random().toString(36).substr(2, 9),
        responsibilities: []
    }
    store.dispatch(addResponsibilitySectionAction({ newArray, name, newSection, lastArray }))
}


const changeResponsibilitySectionVisibilityAction = (newArray) => {
    return {
        type: CHANGERESPONSIBILITYSECIONVISIBILITY,
        payload: newArray
    }
}

function changeSectionName({ sectionIndex, sectionId, newName }) {
    const newArray = getClonedResponsibilityArray();
    const lastArray = getResponsibilityArray()

    store.dispatch(changeSectionNameAction({ newArray, sectionId, newName, sectionIndex, lastArray }))
}


function toggleResponsibilitySection({ index }) {
    const newArr = getClonedResponsibilityArray();
    newArr[index].show = !newArr[index].show;
    store.dispatch(changeResponsibilitySectionVisibilityAction(newArr));

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
    addResponsibilitySection,
    toggleResponsibilitySection,
    changeSectionName,
    removeResponsibilitySection
}