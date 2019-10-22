import React, { memo, useMemo } from "react";
import DescriptionText from "../DescriptionText";
import ResponsibilityCheckboxes from "../ResponsibilityCheckboxes/ResponsibilityCheckboxes";



const OneRow = memo(({
    classes,
    name,
    usersArray,
    users,
    changeResponsibility,
    rowIndex,
    containerIndex,
    removeLine
}) => {

    const description = useMemo(() => {
        return <DescriptionText className={classes.checkboxRowTitle} text={name} />
    }, [name])

    return <div className={classes.checkboxRowWrapper} >
        <button onClick={removeLine}>remove</button>
        {description}
        <ResponsibilityCheckboxes array={usersArray} containerIndex={containerIndex} rowIndex={rowIndex} usersLength={Object.keys(users).length} users={users} changeResponsibility={changeResponsibility} />
    </div>
}, (next, prev) => {

    // console.log(1)
    // if (next.users !== prev.users) {
    //     console.log(6456)
    //     return false;
    // }
    // for (let i = 0; i < next.usersArray.length; i++) {
    //     if (next.usersArray[i].show !== prev.usersArray[i].show) {
    //         return false
    //     }
    // }
    // return !(next.usersLength !== prev.usersLength)
})
export default OneRow;