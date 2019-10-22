import React, { useState, useRef } from 'react';
import DescriptionText from '../DescriptionText';
import classes from './ButtonsController.module.scss'

const ButtonsController = ({
    onClick,
    name,
    addResponsibility
}) => {
    const [showForm, setShowForm] = useState(false);
    const input = useRef(null);

    return (
        <div className={classes.container}>
            <DescriptionText text={name} className={classes.responsibilityTitle} />
            <button style={{ marginLeft: "10px" }} onClick={onClick}>showHide</button>
            <button style={{ marginLeft: "10px" }} onClick={() => { setShowForm(!showForm) }}>addNew</button>

            {showForm ?
                <div>
                    <input ref={input} type="text" />
                    <button onClick={() => {
                        setShowForm(!showForm)
                        addResponsibility(input.current.value)

                    }}>create</button>
                </div> : null}


        </div>
    );
};

export default ButtonsController;