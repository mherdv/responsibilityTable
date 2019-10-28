import axios from "axios";
import { SETNEWRESPONSIBILITYDESCRIPTION, TOGGLEDESCRIPTIONFULLHEIGHT, DESCRIPTIONHEIGHTCHANGE } from "../../types";
import store from '../../index'

// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

const changeResponsibilityDescriptionAction = ({ newArray, rowId, text, lastArray }) => {


    store.dispatch(setNewResponsibilityDescriptionAction(newArray))
    return async function (dispatch) {
        try {

            // const res = await axios.post('/changeDescription',{
            //     rowId,
            //     text
            // },{
            //     cancelToken:source.token
            // })

            // if(res.status !== 200){
            //  alert('error')
            //  dispatch(setNewResponsibilityDescriptionAction(lastArray))
            // }

        } catch (e) {
            // console.log(e);
            //  dispatch(setNewResponsibilityDescriptionAction(lastArray))
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


const descriptionHeightChangeAction = (newArray) => {
    return {

        type: DESCRIPTIONHEIGHTCHANGE,
        payload: newArray
    }
}


export { changeResponsibilityDescriptionAction, toggleDescriptionFullHeightAction, descriptionHeightChangeAction };



