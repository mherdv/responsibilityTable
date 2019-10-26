import React from 'react';
import classes from './ResponsibilityCheckboxes.module.scss';
import Checkbox from '../../Chechbox';


const ResponsibilityCheckboxes = ({ array, users, changeResponsibility, rowIndex, containerIndex, disabledAll }) => {

    return (

        <div className={classes.checkboxRow} data-selector={'row'}>
            {
                array.map((deportment, index) => {
                    return deportment.show ?
                        deportment.users.map((user) => {
                            // console.log(users, index)
                            return <Checkbox
                                key={`checkbox___${user.id}_`}
                                rowIndex={rowIndex}
                                responsibilityIndex={index}
                                checked={!!users[user.id]}
                                disabled={disabledAll}
                                onChange={(event) =>
                                    !disabledAll ? changeResponsibility({
                                        event,
                                        userId: user.id,
                                        rowIndex,
                                        containerIndex
                                    }) : null}
                            />
                        }) : null
                })
            }
            {/* <MyComponent /> */}
        </div>
    );
};

export default ResponsibilityCheckboxes;