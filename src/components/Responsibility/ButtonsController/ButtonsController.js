import React, { useState, useRef } from 'react';
import EditableText from '../EditableText';
import classes from './ButtonsController.module.scss';

import { toggleResponsibilitySection, changeSectionName, removeResponsibilitySection } from '../../../store/actions/responsibility/section';
import { addResponsibilityLine } from '../../../store/actions/responsibility/responsibilityLine';
import { toggleDescriptionFullHeight } from '../../../store/actions/responsibility/description';
import CustomizedAutosuggest from '../../CustomizedAutosuggest';




const ButtonsController = ({
    name,
    openAllDescriptions,
    containerIndex,
    containerId,
    typesArray
}) => {




    const [showForm, setShowForm] = useState(false);
    const inputDescription = useRef(null);
    const inputName = useRef(null);
    const inputType = useRef(null);

    return (
        <div className={classes.container}>
            <EditableText text={name}
                className={classes.responsibilityTitle}
                onBlur={(event) => changeSectionName({

                    sectionId: containerId,
                    sectionIndex: containerIndex,
                    newName: event.target.innerText

                })}
            />
            <button style={{ marginLeft: "10px" }} onClick={() => toggleResponsibilitySection({ index: containerIndex })}>showHide</button>
            <button style={{ marginLeft: "10px" }} onClick={() => { setShowForm(!showForm) }}>addNewLine</button>

            {showForm ?
                <div>

                    <CustomizedAutosuggest suggestions={typesArray} />
                    <input ref={inputDescription} type="text" />

                    <button onClick={() => {
                        setShowForm(!showForm)
                        addResponsibilityLine({
                            description: inputDescription.current.value,
                            containerIndex,
                            containerId
                        })

                    }}>create</button>
                </div> : null}

            <div className={classes.openAllContainer}
                onClick={() => toggleDescriptionFullHeight({ index: containerIndex })}
            >
                <span> open All</span>
                <input type="checkbox" checked={openAllDescriptions} />
            </div>

            <div className={classes.removeSection}
                onClick={() => {
                    removeResponsibilitySection({

                        sectionId: containerId,
                        sectionIndex: containerIndex
                    })
                }}>
                <button>remove this section</button>
            </div>


        </div>
    );
};

export default ButtonsController;