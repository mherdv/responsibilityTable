import React, { memo } from 'react';
import classes from './ResponsibilityCheckboxes.module.scss';
import Checkbox from '../../Chechbox';


const ResponsibilityCheckboxes = memo(({ array, users, changeResponsibility }) => {
    return (
        <div className={classes.checkboxRow}>
            {
                array.map((deportment) => {
                    return deportment.show ?
                        deportment.users.map(user => {
                            return <Checkbox
                                key={`checkbox___${user.id}`}
                                checked={!!users[user.id]}
                                onChange={(event) =>
                                    changeResponsibility({ event, userId: user.id, usersArray: users })}
                            />
                        }) : null
                })
            }
        </div>
    );
}, (next, prev) => {

    // return !(next.usersLength !== prev.usersLength)
});

export default ResponsibilityCheckboxes;