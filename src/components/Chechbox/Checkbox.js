import React, { memo } from 'react';
// import store from '../../store';
// import { changeUserResponsibilityAction } from '../../store/actions/responsibilityAction';

// // todo change name 
// // function changeResponsibility({ event, userId, usersArray }) {

// //     const responsibilityArray = store.getState().responsibilityArray;
// //     // here i change in real store object
// //     if (!event.target.checked)
// //         delete usersArray[userId]
// //     else {
// //         usersArray[userId] = true
// //     }
// //     // todo return to this place 
// //     // then i clone object to add it to action 
// //     // there is a way for deep cloning that i  dunot wont to use iterationCopy(responsibilityArray)
// //     // im simple go tu clone array  on hingher lever 
// //     store.dispatch(changeUserResponsibilityAction([...responsibilityArray]))
// // }

const Checkbox = memo(({ checked, onChange }) => {

    return (
        <div>
            <input type="checkbox" checked={checked}
                onChange={onChange} />
        </div>
    );
}, (next, prev) => {
    return !(next.checked !== prev.checked)
});

export default Checkbox;