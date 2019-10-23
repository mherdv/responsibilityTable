import React, { useMemo } from "react";
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

            <button onClick={removeLine}>remove</button>
            {/* todo check the  performance*/}
            <EditableText
                className={classes.EditableText} text={description}
                onBlur={(event) => onDescriptionChange(event, containerIndex, rowIndex)} />
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