import React, { memo } from 'react';
import classes from './ResponsibilityCheckboxes.module.scss';
import Checkbox from '../../Chechbox';


const ResponsibilityCheckboxes = memo(({ array, users, changeResponsibility, rowIndex, containerIndex }) => {
    return (
        // responsibilityWrapperIndex
        <div className={classes.checkboxRow}>
            {
                array.map((deportment, index) => {
                    return deportment.show ?
                        deportment.users.map((user) => {
                            // console.log(users, index)
                            return <Checkbox
                                key={`checkbox___${user.id}`}
                                rowIndex={rowIndex}
                                responsibilityIndex={index}
                                checked={!!users[user.id]}
                                onChange={(event) =>
                                    changeResponsibility({
                                        event,
                                        userId: user.id,
                                        rowIndex,
                                        containerIndex
                                    })}
                            />
                        }) : null
                })
            }
        </div>
    );
}, (next, prev) => {

    // return !(next.users !== prev.users)
});

export default ResponsibilityCheckboxes;