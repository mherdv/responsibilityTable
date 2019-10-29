import React, { useRef } from 'react';
import classes from './addResponsibilityForm.module.scss'
import { addResponsibilitySection } from '../../../store/actions/responsibility/section';
const AddResponsibilityForm = () => {

    const input = useRef(null);
    return (
        <div className={classes.container}>
            <div>add new responsibility section</div>
            <input ref={input} type="text" />
            <button onClick={() => {
                addResponsibilitySection({ name: input.current.value });
                input.current.value = ''
            }}> create section</button>
        </div>
    );
};

export default AddResponsibilityForm;