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
    onDescriptionChange
}) => {

    return (
        <div className={classes.checkboxRowWrapper} >

            <div className={classes.descriptionLeftSide}>

                {/* todo check the  performance*/}
                <button onClick={removeLine}>remove</button>
                <EditableText
                    className={classes.EditableText} text={description}
                    onBlur={(event) => onDescriptionChange(event, containerIndex, rowIndex)} />
            </div>
            <ResponsibilityCheckboxes
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