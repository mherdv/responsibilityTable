import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';

import { getAllResponsibility, changeUserResponsibility } from '../../store/actions/responsibilityAction';
import classes from './responsibility.module.scss';
// import { iterationCopy, jsonCopy } from '../../utils/cloningObject';

import DescriptionText from './DescriptionText';
import OneRow from './OneRow';


const Responsibility = ({ dispatch, responsibilityArray, usersArray, loading, error }) => {

    function changeResponsibility({ event, userId, usersArray }) {

        // here i change in real store object
        if (!event.target.checked)
            delete usersArray[userId]
        else {
            usersArray[userId] = true
        }
        // todo return to this place 
        // then i clone object to add it to action 
        // there is a way for deep cloning that i  dunot wont to use iterationCopy(responsibilityArray)
        // im simple go tu clone array  on hingher lever 

        dispatch(changeUserResponsibility([...responsibilityArray]))
    }

    useEffect(() => {
        dispatch(getAllResponsibility());
    }, [])

    return (
        <div className={classes.container}>
            {responsibilityArray.map(({ id, responsibilitys, name }, index) => {
                return <div key={`${id}__responsibilityRow_`}>

                    <DescriptionText text={name} />
                    <div className={classes.section}>
                        <LazyLoad offset={100} >
                            {responsibilitys.map(({ users, name, id }) => {
                                return (
                                    <OneRow
                                        key={`${id}__checkboxContainer`}
                                        name={name}
                                        usersArray={usersArray}
                                        usersLength={Object.keys(users).length}
                                        users={users}
                                        changeResponsibility={changeResponsibility}
                                        classes={classes}
                                    />
                                )
                            })}
                        </LazyLoad>


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