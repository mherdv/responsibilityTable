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
    if (next.users !== prev.users) {
        return false;
    }
    // for (let i = 0; i < next.usersArray.length; i++) {
    //     if (next.usersArray[i].show !== prev.usersArray[i].show) {
    //         return false
    //     }
    // }
    // return !(next.usersLength !== prev.usersLength)
})
export default OneRow;