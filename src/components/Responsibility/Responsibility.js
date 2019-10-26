import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { List, WindowScroller } from 'react-virtualized';
import 'react-virtualized/styles.css';
import {
    getAllResponsibilityAction,
    changeUserResponsibilityAction,
    changeResponsibilitySectionVisibilityAction
} from '../../store/actions/responsibility/responsibilityAction';
import classes from './responsibility.module.scss';

import OneRow from './OneRow';
import { iterationCopy } from '../../utils/cloningObject';
import ButtonsController from './ButtonsController';
import { changeResponsibilityDescriptionAction, toggleDescriptionFullHeightAction } from '../../store/actions/responsibility/description';
import { removeResponsibilityLineAction, addResponsibilityLineAction } from '../../store/actions/responsibility/responsibilityLine';
import { removeResponsibilitySectionAction, addResponsibilitySectionAction, changeSectionNameAction } from '../../store/actions/responsibility/section';
import AddResponsibilityForm from './AddResponsibilityForm';
import HoverEffect from '../HoverEffect';


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
        dispatch(changeResponsibilitySectionVisibilityAction(newArr));

    }


    function addResponsibilityLine({ responsibilityArray, description, containerIndex, containerId }) {

        const newArray = iterationCopy(responsibilityArray);

        // todo unique id shod come from server after adding 
        const newRowObject = { id: '_' + Math.random().toString(36).substr(2, 9), description: description, users: {} }

        dispatch(addResponsibilityLineAction({ newArray, containerId, newRowObject, description, containerIndex }))

    }

    function removeResponsibility(responsibilityArray, containerIndex, index, id) {

        const newArr = iterationCopy(responsibilityArray);

        newArr[containerIndex].responsibilities[index].removed = true;
        dispatch(removeResponsibilityLineAction(newArr, id));
    }

    function onDescriptionChange(event, containerIndex, rowIndex) {
        const { responsibilityArray } = store.getState().responsibility;
        const newArr = iterationCopy(responsibilityArray);
        const row = newArr[containerIndex].responsibilities[rowIndex];
        const { id: rowId } = newArr[containerIndex].responsibilities[rowIndex];
        const text = event.currentTarget.innerText.trim();
        row.description = text;

        dispatch(changeResponsibilityDescriptionAction(newArr, rowId, text))
    }

    function toggleDescriptionFullHeight(responsibilityArray, index) {

        const newArr = iterationCopy(responsibilityArray);

        newArr[index].openAllDescriptions = !newArr[index].openAllDescriptions;

        dispatch(toggleDescriptionFullHeightAction(newArr))

    }

    function removeResponsibilitySection({ responsibilityArray, sectionId, sectionIndex }) {
        const newArr = iterationCopy(responsibilityArray);
        newArr[sectionIndex].removed = true;

        dispatch(removeResponsibilitySectionAction(newArr, sectionId))


    }

    function addResponsibilitySection(responsibilityArray, name) {
        const newArr = iterationCopy(responsibilityArray);
        // addResponsibilitySection


        const newSection = {
            name,
            show: 1,
            id: '_' + Math.random().toString(36).substr(2, 9),
            responsibilities: []
        }


        dispatch(addResponsibilitySectionAction(newArr, name, newSection))
    }

    function changeSectionName({ sectionIndex, sectionId, newName }) {
        const { responsibilityArray } = store.getState().responsibility;
        const newArray = iterationCopy(responsibilityArray);

        dispatch(changeSectionNameAction({ newArray, sectionId, newName, sectionIndex }))
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

            <HoverEffect />
            <AddResponsibilityForm
                addResponsibilitySection={addResponsibilitySection}
                responsibilityArray={responsibilityArray}
            />

            {responsibilityArray.map(({ id, responsibilities, name, removed }, containerIndex) => {

                const descriptionsAreOpened = responsibilityArray[containerIndex].openAllDescriptions
                return (
                    !removed ? <div key={`${id}__responsibilityRows_`}>

                        <ButtonsController
                            name={name}
                            removeSection={() => removeResponsibilitySection({ responsibilityArray, sectionId: id, sectionIndex: containerIndex })}
                            ShowHideSection={() => toggleResponsibilitySection(containerIndex)}
                            classes={classes}
                            addResponsibility={(description) => addResponsibilityLine({
                                responsibilityArray,
                                description,
                                containerIndex,
                                containerId: id
                            })}

                            toggleDescriptionFullHeight={() => toggleDescriptionFullHeight(responsibilityArray, containerIndex)}
                            openAllDescriptions={descriptionsAreOpened}

                            changeSectionName={(event) => {
                                changeSectionName({
                                    responsibilityArray,
                                    sectionId: id,
                                    sectionIndex: containerIndex,
                                    newName: event.target.innerText
                                })
                            }}
                        />

                        {/* todo separate to component */}

                        <div className={classes.section + ' ' + (!!descriptionsAreOpened ? classes.openAllDescriptions : '')}>
                            {responsibilityArray[containerIndex].show ?
                                <WindowScroller>
                                    {({ height, isScrolling, registerChild, scrollTop }) => (
                                        <div>

                                            <div
                                                ref={registerChild}
                                            >
                                                <List
                                                    autoHeight
                                                    height={height}
                                                    isScrolling={isScrolling}
                                                    rowCount={responsibilities.length}

                                                    rowHeight={({ index }) => {
                                                        if (responsibilities[index].removed) {
                                                            return 0;
                                                        }
                                                        return 30
                                                    }
                                                    }
                                                    rowRenderer={
                                                        (props) => {

                                                            if (!responsibilities[props.index]) return false
                                                            const { users, description, id, removed } = responsibilities[props.index];
                                                            // console.log(props)
                                                            return props.isVisible ?
                                                                <div
                                                                    className={removed ? 'removed' : null}
                                                                    style={{
                                                                        ...props.style, position: 'relative',
                                                                        height: '0',
                                                                        marginTop: removed ? '-30px' : ''
                                                                    }}

                                                                    key={props.key} >

                                                                    {!removed ?


                                                                        <OneRow
                                                                            description={description}
                                                                            usersArray={usersArray}
                                                                            key={`${id}__checkboxContainer`}
                                                                            usersLength={Object.keys(users).length}
                                                                            responsibilityArray={responsibilityArray}
                                                                            users={users}
                                                                            changeResponsibility={changeResponsibility}
                                                                            rowIndex={props.index}
                                                                            containerIndex={containerIndex}
                                                                            classes={classes}
                                                                            onDescriptionChange={onDescriptionChange}
                                                                            removeLine={() => {
                                                                                removeResponsibility(responsibilityArray, containerIndex, props.index, id)
                                                                            }}
                                                                        />
                                                                        : null}


                                                                </div> : false
                                                        }
                                                    }

                                                    overcanRowCount={10}
                                                    scrollTop={scrollTop}
                                                    width={document.querySelector('header').offsetWidth + 300}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </WindowScroller>
                                : null}
                        </div>
                    </div> : null
                )
            })}

        </div>
    );
};


function mapStateToProps(state) {
    return state.responsibility
}
export default connect(mapStateToProps)(Responsibility);