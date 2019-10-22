import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import LazyLoad from 'react-lazyload';

import {
    getAllResponsibilityAction,
    changeUserResponsibilityAction,
    changeResponsibilitySectionVisibilityAction,
    addResponsibilityLineAction,
    removeResponsibilityLineAction
} from '../../store/actions/responsibilityAction';
import classes from './responsibility.module.scss';
// import { iterationCopy, jsonCopy } from '../../utils/cloningObject';

// import DescriptionText from './DescriptionText';
import OneRow from './OneRow';
import { iterationCopy } from '../../utils/cloningObject';
import ButtonsController from './ButtonsController';


const Responsibility = ({ dispatch, responsibilityArray, usersArray, loading, error }) => {


    // todo change name 
    function changeResponsibility({ userId, rowIndex, containerIndex }) {

        const { responsibilityArray } = store.getState().responsibility;
        const users = responsibilityArray[containerIndex].responsibilities[rowIndex].users;

        users[userId] = !users[userId];
        dispatch(changeUserResponsibilityAction([...responsibilityArray]))
    }

    function toggleResponsibilitySection(index) {
        const newArr = iterationCopy(responsibilityArray);
        newArr[index].show = !newArr[index].show;
        dispatch(changeResponsibilitySectionVisibilityAction(newArr))
    }


    function addResponsibility(responsibilityArr, description, index) {

        const newArr = iterationCopy(responsibilityArr);

        // todo unique id shod come from server after adding 

        newArr[index].responsibilities.push({ id: '_' + Math.random().toString(36).substr(2, 9), name: description, users: {} });
        dispatch(addResponsibilityLineAction(newArr))

    }

    function removeResponsibility(responsibilityArray, containerIndex, index) {

        const newArr = iterationCopy(responsibilityArray);
        newArr[containerIndex].responsibilities.splice(index, 1);
        dispatch(removeResponsibilityLineAction(newArr));

        // this is for LazyLoad  component during remove
        // todo change this logic 
        window.dispatchEvent(new Event('scroll'))
    }

    function onDescriptionChange(event) {

        // validate value 
        console.log(event.target.innerHTML.trim())
    }

    useEffect(() => {
        dispatch(getAllResponsibilityAction());
    }, [])

    return (
        <div className={classes.container}>

            {/* todo add normal preloader  */}
            <div className={classes.massage}>

                {loading ? "loading" : null}
                {error ? "error" : null}
            </div>


            {responsibilityArray.map(({ id, responsibilities, name }, containerIndex) => {
                // responsibilityArray containerIndex responsibilityIndex
                return <div key={`${id}__responsibilityRows_`}>

                    <ButtonsController
                        name={name} onClick={() => toggleResponsibilitySection(containerIndex)}
                        classes={classes}
                        addResponsibility={(description) => addResponsibility(responsibilityArray, description, containerIndex)} />

                    {/* todo separate to component */}

                    <div className={classes.section}>
                        {responsibilityArray[containerIndex].show ?

                            responsibilities.map(({ users, name, id }, index) => {
                                return (
                                    <LazyLoad offset={0} height={20} key={`${id}__checkboxContainer`}>
                                        <OneRow
                                            name={name}
                                            usersArray={usersArray}
                                            usersLength={Object.keys(users).length}
                                            responsibilityArray={responsibilityArray}
                                            users={users}
                                            changeResponsibility={changeResponsibility}
                                            rowIndex={index}
                                            containerIndex={containerIndex}
                                            classes={classes}
                                            onDescriptionChange={onDescriptionChange}
                                            removeLine={() => {
                                                removeResponsibility(responsibilityArray, containerIndex, index)
                                            }}
                                        />
                                    </LazyLoad>
                                )
                            })
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