import React from "react";
import ResponsibilityCheckboxes from "../ResponsibilityCheckboxes/ResponsibilityCheckboxes";
import EditableText from "../EditableText";

import classes from './oneRow.module.scss';



const OneRow = ({
    description,
    usersArray,
    users,
    changeResponsibility,
    rowIndex,
    containerIndex,
    removeLine,
    onDescriptionChange,
    removed,
    onInput,
    rowHeightChange,
    openAllDescriptions
}) => {

    return (
        <div className={classes.checkboxRowWrapper} >

            <div className={classes.descriptionLeftSide}>

                {/* todo check the  performance*/}
                <button onClick={removeLine}>remove</button>
                <EditableText
                    openAllDescriptions={openAllDescriptions}
                    rowHeightChange={rowHeightChange}
                    className={classes.EditableText} text={description}
                    onBlur={(event) => onDescriptionChange(event, containerIndex, rowIndex)}
                    onInput={onInput}
                />
            </div>
            <ResponsibilityCheckboxes
                disabledAll={removed}
                array={usersArray}
                containerIndex={containerIndex}
                rowIndex={rowIndex}
                usersLength={Object.keys(users).length}
                users={users}
                changeResponsibility={changeResponsibility}
            />
        </div>
    )
}
export default OneRow;