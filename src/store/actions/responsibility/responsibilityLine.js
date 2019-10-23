import { REMOVERESPONSIBILITYLINE, ADDRESPONSIBILITYLINE } from "../../types"
// import axios from "axios"
// todo add catch handling 

const addResponsibilityLineAction = ({ newArray, description, containerId, newRowObject, containerIndex }) => {
    // {newArr,containerId,newRowObject}
    return async function (dispatch) {
        // try {
        //    const res = await axios.post('/addNewRod',{
        //         containerId,
        //         description
        //    })



        //    if(res.status === 200){
        //      newRowObject.id = res.data.id;

        newArray[containerIndex].responsibilities.push(newRowObject);
        dispatch(addLine(newArray))
        //    }
        // } catch (e) {

        // }
    }
}

const addLine = (newArr) => {
    return {
        type: ADDRESPONSIBILITYLINE,
        payload: newArr
    }
}




const removeResponsibilityLineAction = (newArray, id) => {

    return async function (dispatch) {
        // try {
        //    const res = await axios.post('/removeResponsibilityLine',{
        //         id,
        //     })
        //     if(res.status===200){
        dispatch(removeLine(newArray))
        // }
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


export { removeResponsibilityLineAction, addResponsibilityLineAction }
