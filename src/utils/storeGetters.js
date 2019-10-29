import store from '../store';
import { iterationCopy } from './cloningObject';


function getClonedResponsibilityArray() {
    return iterationCopy(store.getState().responsibility.responsibilityArray)
}


function getResponsibilityArray() {
    return store.getState().responsibility.responsibilityArray
}

export {
    getClonedResponsibilityArray,
    getResponsibilityArray
}