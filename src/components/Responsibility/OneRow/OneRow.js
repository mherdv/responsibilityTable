import React from "react";
import ResponsibilityCheckboxes from "../ResponsibilityCheckboxes/ResponsibilityCheckboxes";
import EditableText from "../EditableText";

import classes from './oneRow.module.scss';
import { changeResponsibilityDescription } from "../../../store/actions/responsibility/description";
import { changeResponsibilityName } from "../../../store/actions/responsibility/name";


const OneRow = ({
    description,
    users,
    rowIndex,
    containerIndex,
    removeLine,
    removed,
    onInput,
    typeIndex,
    rowHeightChange,
    openAllDescriptions,
    name
}) => {

    return (
        <div className={classes.checkboxRowWrapper} >

            <div className={classes.descriptionLeftSide}>

                <button onClick={removeLine}>remove</button>
                <EditableText
                    openAllDescriptions={openAllDescriptions}
                    rowHeightChange={rowHeightChange}
                    className={classes.EditableText} text={name || ''}
                    onBlur={(event) => changeResponsibilityName({ event, containerIndex, rowIndex, typeIndex })}
                    onInput={onInput}
                />
                <EditableText
                    openAllDescriptions={openAllDescriptions}
                    rowHeightChange={rowHeightChange}
                    className={classes.EditableText} text={description}
                    onBlur={(event) => changeResponsibilityDescription({ event, containerIndex, rowIndex, typeIndex })}
                    onInput={onInput}
                />
            </div>
            <ResponsibilityCheckboxes
                disabledAll={removed}
                containerIndex={containerIndex}
                rowIndex={rowIndex}
                usersLength={Object.keys(users).length}
                users={users}
                typeIndex={typeIndex}
            />
        </div>
    )
}
export default OneRow;