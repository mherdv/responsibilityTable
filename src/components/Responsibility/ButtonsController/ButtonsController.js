import React, { useState, useRef } from 'react';
import EditableText from '../EditableText';
import classes from './ButtonsController.module.scss';

import { toggleResponsibilitySection, changeSectionName, removeResponsibilitySection } from '../../../store/actions/responsibility/section';
import { addResponsibilityLine, createResponsibilityTypeAddNewLine } from '../../../store/actions/responsibility/responsibilityLine';
import { toggleDescriptionFullHeight } from '../../../store/actions/responsibility/description';
import CustomizedAutosuggest from '../../CustomizedAutosuggest';
import { addNewType } from '../../../store/actions/responsibility/responsibilityType';




const ButtonsController = ({
    name,
    openAllDescriptions,
    containerIndex,
    containerId,
    typesArray
}) => {




    const [showLineForm, setShowLineForm] = useState(false);
    const [showTypeForm, setShowTypeForm] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    const inputDescription = useRef(null);
    const inputName = useRef(null);
    const typeName = useRef(null);

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
            <button style={{ marginLeft: "10px" }} onClick={() => toggleResponsibilitySection({ index: containerIndex })}>show-Hide</button>
            <button style={{ marginLeft: "10px" }} onClick={() => { setShowLineForm(!showLineForm) }}>add New Line</button>


            {showLineForm ?
                <div className={classes.addLineForm}>

                    <CustomizedAutosuggest suggestions={typesArray} setSelected={setSelectedType} />

                    <input ref={inputDescription} type="text" placeholder="row description" />

                    <input ref={inputName} type="text" placeholder="row name" />

                    <button onClick={() => {

                        if (
                            !inputName.current.value.trim() ||
                            !inputDescription.current.value.trim() ||
                            !selectedType
                        ) return;
                        setShowLineForm(!showLineForm)
                        // todo check validation 


                        if (selectedType instanceof Object) {

                            addResponsibilityLine({
                                description: inputDescription.current.value,
                                name: inputName.current.value,
                                containerIndex,
                                containerId,
                                typeIndex: selectedType.index
                                //type index 
                            })
                        } else {
                            createResponsibilityTypeAddNewLine({

                                containerId,
                                containerIndex,
                                typeName: selectedType,
                                lineProps: {

                                    description: inputDescription.current.value,
                                    name: inputName.current.value
                                }

                            })
                        }

                    }}>Add</button>
                </div> : null}


            <button style={{ marginLeft: "10px" }} onClick={() => { setShowTypeForm(!showTypeForm) }}>add new type</button>


            {showTypeForm ?
                <div className={classes.typeForm}>
                    <input ref={typeName} type="text" placeholder="type Name" />
                    <button onClick={() => {
                        if (!typeName.current.value.trim()) return;

                        addNewType({
                            name: typeName.current.value,
                            containerId,
                            containerIndex
                        })
                        setShowTypeForm(false)
                    }}>Add</button>
                </div>
                : null}
            {/* showTypeForm({ containerId, containerIndex }) */}
            <div className={classes.openAllContainer}
                onClick={() => toggleDescriptionFullHeight({ index: containerIndex })}
            >
                {/* containerId */}
                <span className={openAllDescriptions ? classes.checked : ''}> open All</span>
                <input type="checkbox" id={'addNewLine' + containerId} checked={openAllDescriptions} />
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