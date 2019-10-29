import React from 'react';
import classes from './ResponsibilityCheckboxes.module.scss';
import Checkbox from '../../Chechbox';
import { changeResponsibility } from '../../../store/actions/responsibility/responsibilityAction';
import { connect } from 'react-redux';

const ResponsibilityCheckboxes = ({ array, users, rowIndex, containerIndex, disabledAll, typeIndex }) => {


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
                                        containerIndex,
                                        typeIndex
                                    }) : null}
                            />
                        }) : null
                })
            }
            {/* <MyComponent /> */}
        </div>
    );
};

function mapStateToProps(state) {

    return {
        array: state.users.usersArray
    }
}

export default connect(mapStateToProps)(ResponsibilityCheckboxes);