import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';

import { getAllResponsibility, changeUserResponsibility, changeResponsibilitySectionVisibility, addResponsibilityLine } from '../../store/actions/responsibilityAction';
import classes from './responsibility.module.scss';
// import { iterationCopy, jsonCopy } from '../../utils/cloningObject';

// import DescriptionText from './DescriptionText';
import OneRow from './OneRow';
import { iterationCopy } from '../../utils/cloningObject';
import ButtonsController from './ButtonsController';


const Responsibility = ({ dispatch, responsibilityArray, usersArray, loading, error }) => {


    // todo change name 
    function changeResponsibility({ event, userId, usersArray }) {
        console.log(usersArray, responsibilityArray)
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

    function toggleResponsibilitySection(index) {
        const newArr = iterationCopy(responsibilityArray);
        newArr[index].show = !newArr[index].show;
        dispatch(changeResponsibilitySectionVisibility(newArr))
    }


    function addResponsibility(responsibilityArr, description, index) {

        const newArr = iterationCopy(responsibilityArr);

        // todo unique id shod come from server after adding 

        newArr[index].responsibilitys.push({ id: '_' + Math.random().toString(36).substr(2, 9), name: description, users: {} });
        dispatch(addResponsibilityLine(newArr))

    }

    useEffect(() => {
        dispatch(getAllResponsibility());
    }, [])

    return (
        <div className={classes.container}>

            {/* todo add normal preloader  */}
            <div className={classes.massage}>

                {loading ? "loading" : null}
                {error ? "error" : null}
            </div>


            {responsibilityArray.map(({ id, responsibilitys, name }, index) => {

                return <div key={`${id}__responsibilityRows_`}>

                    <ButtonsController
                        name={name} onClick={() => toggleResponsibilitySection(index)}
                        classes={classes}
                        addResponsibility={(description) => addResponsibility(responsibilityArray, description, index)} />

                    {/* todo separate to component */}
                    <div className={classes.section}>
                        {responsibilityArray[index].show ?
                            // <LazyLoad offset={10} >
                            responsibilitys.map(({ users, name, id }) => {
                                return (
                                    <OneRow
                                        key={`${id}__checkboxContainer`}
                                        name={name}
                                        usersArray={usersArray}
                                        usersLength={Object.keys(users).length}
                                        responsibilityArray={responsibilityArray}
                                        users={users}
                                        changeResponsibility={changeResponsibility}
                                        classes={classes}
                                    />
                                )
                            })
                            // </LazyLoad>
                            : null}
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