import React, { useState, useRef } from 'react';
import EditableText from '../EditableText';
import classes from './ButtonsController.module.scss'

const ButtonsController = ({
    ShowHideSection,
    name,
    addResponsibility,
    openAllDescriptions,
    toggleDescriptionFullHeight,
    removeSection,
    changeSectionName
}) => {
    const [showForm, setShowForm] = useState(false);
    const input = useRef(null);

    return (
        <div className={classes.container}>
            <EditableText text={name} className={classes.responsibilityTitle}
                onBlur={changeSectionName}
            />
            <button style={{ marginLeft: "10px" }} onClick={ShowHideSection}>showHide</button>
            <button style={{ marginLeft: "10px" }} onClick={() => { setShowForm(!showForm) }}>addNewLine</button>

            {showForm ?
                <div>
                    <input ref={input} type="text" />
                    <button onClick={() => {
                        setShowForm(!showForm)
                        addResponsibility(input.current.value)

                    }}>create</button>
                </div> : null}

            <div className={classes.openAllContainer} onClick={toggleDescriptionFullHeight}>
                <span> open All</span>
                <input type="checkbox" checked={openAllDescriptions} />
            </div>

            <div className={classes.removeSection} onClick={removeSection}>
                <button>remove this section</button>
            </div>


        </div>
    );
};

export default ButtonsController;