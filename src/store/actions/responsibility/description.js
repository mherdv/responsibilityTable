import axios from "axios";
import { SETNEWRESPONSIBILITYDESCRIPTION, TOGGLEDESCRIPTIONFULLHEIGHT } from "../../types";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const changeResponsibilityDescriptionAction = (newArray, rowId, newName) => {

    return async function (dispatch) {
        try {

            // const res = await axios.post('/changeDescription',{
            //     rowId,
            //     newName
            // },{
            //     cancelToken:source.token
            // })

            // if(res.status === 200){
            dispatch(setNewResponsibilityDescriptionAction(newArray))
            // }

        } catch (e) {
            console.log(e)
        }

    }
}

const setNewResponsibilityDescriptionAction = (newArray) => {
    return {
        type: SETNEWRESPONSIBILITYDESCRIPTION,
        payload: newArray
    }
}

const toggleDescriptionFullHeightAction = (newArray) => {

    return {
        type: TOGGLEDESCRIPTIONFULLHEIGHT,
        payload: newArray
    }
}
export { changeResponsibilityDescriptionAction, toggleDescriptionFullHeightAction };



