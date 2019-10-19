import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllResponsibility, changeUserResponsibility } from '../../store/actions/responsibilityAction';
import classes from './responsibility.module.scss';

import DescriptionText from './DescriptionText';
import ResponsibilityCheckboxes from './ResponsibilityCheckboxes/ResponsibilityCheckboxes';


const Responsibility = ({ dispatch, responsibilityArray, usersArray, loading, error }) => {


    function changeResponsibility({ event, userId, usersArray }) {


        if (!event.target.checked)
            delete usersArray[userId]
        else {
            usersArray[userId] = true
        }
        // console.log(event, userId, usersArray)
        dispatch(changeUserResponsibility([...responsibilityArray]))
    }


    useEffect(() => {
        dispatch(getAllResponsibility());
    }, [])


    return (
        <div className={classes.container}>
            {responsibilityArray.map(({ id, responsibilitys, name }, index) => {
                return <div key={`${id}__responsibilityRow`}>

                    <DescriptionText text={name} />
                    <div className={classes.section}>
                        {responsibilitys.map(({ users, name, id }, index) => {

                            return (
                                <div key={`${id}__checkboxContainer`} className={classes.checkboxRowWrapper}>
                                    <DescriptionText className={classes.checkboxRowTitle} text={name} />

                                    {/* checkbox container */}
                                    {/* {array,users,onChange} */}

                                    <ResponsibilityCheckboxes array={usersArray} usersLength={Object.keys(users).length} users={users} changeResponsibility={changeResponsibility} />

                                    {/* <div className={classes.checkboxRow}>
                                        {
                                            usersArray.map((deportment) => {
                                                return deportment.users.map(user => {
                                                    // user id push to users object 
                                                    return <Checkbox
                                                        key={`checkbox___${user.id}`}
                                                        checked={!!users[user.id]}
                                                        onChange={(event) =>
                                                            changeResponsibility({ event, userId: user.id, usersArray: users })}
                                                    />
                                                })
                                            })

                                        }
                                    </div> */}
                                </div>)
                        })}

                    </div>
                </div>
            })}

        </div>
    );
};


function mapStateToProps(state) {
    return state.responsibility
}
export default connect(mapStateToProps)(Responsibility);