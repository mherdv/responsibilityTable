import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import 'react-virtualized/styles.css';
import {
    getAllResponsibilityAction,
} from '../../store/actions/responsibility/responsibilityAction';

import AddResponsibilityForm from './AddResponsibilityForm';
import HoverEffect from '../HoverEffect';
import ButtonsController from './ButtonsController';
import classes from './responsibility.module.scss';
import OneType from './oneType/OneType';






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

                const typesArray = responsibilityArray[containerIndex].types.map(({ name, id }, index) => {
                    return { name, typeId: id, index, typeName: name }
                })
                return (
                    !removed ? <div key={`${id}__responsibilityRows_`}>
                        <ButtonsController
                            name={name}
                            classes={classes}
                            containerIndex={containerIndex}
                            containerId={id}
                            openAllDescriptions={descriptionsAreOpened}
                            typesArray={typesArray}
                        />


                        <div className={classes.section + ' ' + (!!descriptionsAreOpened ? classes.openAllDescriptions : '')}>
                            {responsibilityArray[containerIndex].show ?



                                <OneType section={responsibilityArray[containerIndex]} containerIndex={containerIndex} descriptionsAreOpened={descriptionsAreOpened} />




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