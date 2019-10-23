import React, { useRef } from 'react';
import classes from './addResponsibilityForm.module.scss'

const AddResponsibilityForm = ({ addResponsibilitySection, responsibilityArray }) => {

    const input = useRef(null);
    return (
        <div className={classes.container}>
            <div>add new responsibility section</div>
            <input ref={input} type="text" />
            <button onClick={() => {
                addResponsibilitySection(responsibilityArray, input.current.value);
                input.current.value = ''
            }}> create section</button>
        </div>
    );
};

export default AddResponsibilityForm;