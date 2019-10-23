import axios from "axios";
import { REMOVERESPONSIBILITYSECTION, ADDRESPONSIBILITYSECTION, CHAGESECTIONTITLE } from "../../types";

function removeResponsibilitySectionAction(newArray, sectionId) {

    return async function (dispatch) {
        // try {
        //     const res = await axios.post('/removeSection', {
        //         sectionId
        //     })

        //     if (res.status === 200) {
        dispatch({
            type: REMOVERESPONSIBILITYSECTION,
            payload: newArray
        });
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }

}


function addResponsibilitySectionAction(newArray, name, newSection) {

    return async function (dispatch) {
        // try {
        //     const res = await axios.post('/createSection',{name});

        //     if(res.status === 200){
        //        newSection.id = res.body.id
        newArray.push(newSection)
        dispatch(
            {
                type: ADDRESPONSIBILITYSECTION,
                payload: newArray
            }
        )
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }
}

function changeSectionNameAction({ newArray, sectionId, newName }) {
    return async function (dispatch) {
        try {
            // const res = await axios.post('/changeName',{
            //     sectionId,
            //     newName
            // })

            // if(res.status === 200){
            dispatch({
                type: CHAGESECTIONTITLE,
                payload: newArray
            })
            // }
        } catch (e) {
            console.log(e)
        }

    }
}


export {
    removeResponsibilitySectionAction,
    addResponsibilitySectionAction,
    changeSectionNameAction
}