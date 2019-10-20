import React, { memo } from "react";
import DescriptionText from "../DescriptionText";
import ResponsibilityCheckboxes from "../ResponsibilityCheckboxes/ResponsibilityCheckboxes";

const OneRow = memo(({
    classes, name, usersArray, users, changeResponsibility
}) => {
    return <div className={classes.checkboxRowWrapper} >
        <DescriptionText className={classes.checkboxRowTitle} text={name} />
        <ResponsibilityCheckboxes array={usersArray} usersLength={Object.keys(users).length} users={users} changeResponsibility={changeResponsibility} />
    </div>
}, (next, prev) => {
    // add avilebility to change text 
    return !(next.usersLength !== prev.usersLength)
})
export default OneRow;