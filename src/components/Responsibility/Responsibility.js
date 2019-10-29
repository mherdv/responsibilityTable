import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import 'react-virtualized/styles.css';
import {
    getAllResponsibilityAction,
} from '../../store/actions/responsibility/responsibilityAction';
import { iterationCopy } from '../../utils/cloningObject';
import { removeResponsibilityLineAction } from '../../store/actions/responsibility/responsibilityLine';
import { addResponsibilitySectionAction } from '../../store/actions/responsibility/section';

import AddResponsibilityForm from './AddResponsibilityForm';
import HoverEffect from '../HoverEffect';
import OneList from './OneList/OneList';
import ButtonsController from './ButtonsController';
import classes from './responsibility.module.scss';


// todo  add type grout for descriptions                 
// todo  add name for descriptions


// todo  on checkbox checking if click 1 it is main responsibility if 2 secondary  responsibility if 3 not his responsibility
// todo  add header partly closing availability 
// todo  add horizontal scroll availability 
// todo  change checkboxes to icons or change color 



const Responsibility = ({ dispatch, responsibilityArray, loading, error }) => {

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
            <AddResponsibilityForm />

            {responsibilityArray.map(({ id, responsibilities, name, removed }, containerIndex) => {

                const descriptionsAreOpened = responsibilityArray[containerIndex].openAllDescriptions
                return (
                    !removed ? <div key={`${id}__responsibilityRows_`}>
                        <ButtonsController
                            name={name}
                            classes={classes}
                            containerIndex={containerIndex}
                            containerId={id}
                            openAllDescriptions={descriptionsAreOpened}
                        />


                        <div className={classes.section + ' ' + (!!descriptionsAreOpened ? classes.openAllDescriptions : '')}>
                            {responsibilityArray[containerIndex].show ?

                                // todo change to oneType 
                                <OneList
                                    responsibilities={responsibilities}
                                    containerIndex={containerIndex}
                                    openAllDescriptions={descriptionsAreOpened}
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