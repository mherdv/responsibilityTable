


import { getResponsibilityArray } from '../../../utils/storeGetters';
import { SHOWUSERFULLDESCRIPTIONMODAL, HIDESERFULLDESCRIPTIONMODAL } from '../../types';
import store from '../../'


function showUserFullResponsibilitiesModal(user) {

    const responsibilityTypes = getResponsibilityArray();
    const thisUserResponsibilities = [];

    responsibilityTypes.forEach(section => {
        // console.log(section.types)

        section.types.forEach(({ responsibilities }) => {
            responsibilities.forEach(responsibility => {
                if ((responsibility.users[user.id])) thisUserResponsibilities.push(responsibility)

            })
        })

    })
    store.dispatch(showUserFullResponsibilitiesModalAction({ responsibilities: thisUserResponsibilities, user }));

}






function showUserFullResponsibilitiesModalAction(modalInfo) {
    return {
        type: SHOWUSERFULLDESCRIPTIONMODAL,
        payload: modalInfo
    }
}

function hideUserFullResponsibilityModal() {
    store.dispatch(hideUserFullResponsibilitiesModalAction())
}

function hideUserFullResponsibilitiesModalAction() {
    return {
        type: HIDESERFULLDESCRIPTIONMODAL
    }
}

export {
    showUserFullResponsibilitiesModal,
    hideUserFullResponsibilityModal
}