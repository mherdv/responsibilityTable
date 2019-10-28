import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import 'react-virtualized/styles.css';
import {
    getAllResponsibilityAction,
    changeUserResponsibilityAction,
    changeResponsibilitySectionVisibilityAction
} from '../../store/actions/responsibility/responsibilityAction';
import { iterationCopy } from '../../utils/cloningObject';
import { changeResponsibilityDescriptionAction, toggleDescriptionFullHeightAction, descriptionHeightChangeAction } from '../../store/actions/responsibility/description';
import { removeResponsibilityLineAction, addResponsibilityLineAction } from '../../store/actions/responsibility/responsibilityLine';
import { removeResponsibilitySectionAction, addResponsibilitySectionAction, changeSectionNameAction } from '../../store/actions/responsibility/section';

import AddResponsibilityForm from './AddResponsibilityForm';
import HoverEffect from '../HoverEffect';
import OneList from './OneList/OneList';
import ButtonsController from './ButtonsController';
import store from '../../store';
import classes from './responsibility.module.scss';


const Responsibility = ({ dispatch, responsibilityArray, usersArray, loading, error }) => {


    function changeResponsibility({ userId, rowIndex, containerIndex }) {

        const { responsibilityArray } = store.getState().responsibility;

        const LastArray = iterationCopy(responsibilityArray);


        const users = responsibilityArray[containerIndex].responsibilities[rowIndex].users;


        users[userId] = !users[userId];

        dispatch(changeUserResponsibilityAction({
            newArray: [...responsibilityArray],
            userId,
            checked: users[userId],
            LastArray
        }))

        // todo send change request to server 
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

        const LastArray = iterationCopy(newArray);


        dispatch(addResponsibilityLineAction({ newArray, containerId, newRowObject, description, containerIndex, LastArray }))

    }

    function removeResponsibility(responsibilityArray, containerIndex, index, id) {

        const newArray = iterationCopy(responsibilityArray);

        const LastArray = iterationCopy(newArray)
        newArray[containerIndex].responsibilities[index].removed = true;


        dispatch(removeResponsibilityLineAction({ newArray, id, LastArray }));
    }

    async function onDescriptionChange(event, containerIndex, rowIndex) {
        const { responsibilityArray } = store.getState().responsibility;
        const newArray = iterationCopy(responsibilityArray);
        const row = newArray[containerIndex].responsibilities[rowIndex];
        const { id: rowId } = newArray[containerIndex].responsibilities[rowIndex];
        const text = event.currentTarget.innerText.trim();
        row.description = text;

        await dispatch(changeResponsibilityDescriptionAction({ newArray, rowId, text, lastArray: responsibilityArray }))
    }

    function toggleDescriptionFullHeight(responsibilityArray, index) {

        const newArr = iterationCopy(responsibilityArray);

        newArr[index].openAllDescriptions = !newArr[index].openAllDescriptions;

        dispatch(toggleDescriptionFullHeightAction(newArr))

    }

    function removeResponsibilitySection({ responsibilityArray, sectionId, sectionIndex }) {
        const newArray = iterationCopy(responsibilityArray);
        newArray[sectionIndex].removed = true;

        dispatch(removeResponsibilitySectionAction({ newArray, sectionId, lastArray: responsibilityArray }))


    }

    function addResponsibilitySection(responsibilityArray, name) {
        const newArray = iterationCopy(responsibilityArray);


        const newSection = {
            name,
            show: 1,
            id: '_' + Math.random().toString(36).substr(2, 9),
            responsibilities: []
        }
        dispatch(addResponsibilitySectionAction({ newArray, name, newSection, lastArray: responsibilityArray }))
    }

    function changeSectionName({ sectionIndex, sectionId, newName }) {
        const { responsibilityArray } = store.getState().responsibility;
        const newArray = iterationCopy(responsibilityArray);

        dispatch(changeSectionNameAction({ newArray, sectionId, newName, sectionIndex, lastArray: responsibilityArray }))
    }


    function descriptionHeightChange({ containerIndex, rowIndex, height }) {
        const { responsibilityArray } = store.getState().responsibility;
        const newArr = iterationCopy(responsibilityArray);

        newArr[containerIndex].responsibilities[rowIndex].height = height;

        dispatch(descriptionHeightChangeAction(newArr));

    }


    useEffect(() => {
        dispatch(getAllResponsibilityAction());
        // eslint-disable-next-line
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


                        <div className={classes.section + ' ' + (!!descriptionsAreOpened ? classes.openAllDescriptions : '')}>
                            {responsibilityArray[containerIndex].show ?

                                <OneList
                                    responsibilities={responsibilities}
                                    classes={classes}
                                    usersArray={usersArray}
                                    responsibilityArray={responsibilityArray}
                                    changeResponsibility={changeResponsibility}
                                    containerIndex={containerIndex}
                                    onDescriptionChange={onDescriptionChange}
                                    removeResponsibility={removeResponsibility}
                                    openAllDescriptions={descriptionsAreOpened}
                                    descriptionHeightChange={descriptionHeightChange}
                                />

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