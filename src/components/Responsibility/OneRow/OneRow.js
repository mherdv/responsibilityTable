import React, { memo, useMemo } from "react";
import DescriptionText from "../DescriptionText";
import ResponsibilityCheckboxes from "../ResponsibilityCheckboxes/ResponsibilityCheckboxes";



const OneRow = ({
    classes,
    name,
    usersArray,
    users,
    changeResponsibility,
    rowIndex,
    containerIndex,
    removeLine,
    onDescriptionChange
}) => {

    const description = useMemo(() => {
        return <DescriptionText className={classes.checkboxRowTitle} text={name} onInput={onDescriptionChange} />
    }, [name, onDescriptionChange])

    return <div className={classes.checkboxRowWrapper} >
        <button onClick={removeLine}>remove</button>
        {description}
        <ResponsibilityCheckboxes array={usersArray} containerIndex={containerIndex} rowIndex={rowIndex} usersLength={Object.keys(users).length} users={users} changeResponsibility={changeResponsibility} />
    </div>
}
export default OneRow;