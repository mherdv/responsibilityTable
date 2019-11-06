import React, { useRef } from 'react';
import classes from './addResponsibilityForm.module.scss'
import { addResponsibilitySection } from '../../../store/actions/responsibility/section';
const AddResponsibilityForm = () => {

    const input = useRef(null);
    return (
        <div className={classes.container}>
            <input ref={input} type="text" placeholder="Add New Responsibility" />
            <button onClick={() => {
                addResponsibilitySection({ name: input.current.value });
                input.current.value = '';
            }}> Add</button>
        </div>
    );
};

export default AddResponsibilityForm;
