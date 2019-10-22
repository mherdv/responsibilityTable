import React from 'react';
import DescriptionText from '../DescriptionText';
import classes from './ButtonsController.module.scss'

const ButtonsController = ({
    onClick,
    name,
    addResponsibility
}) => {
    return (
        <div className={classes.container}>
            <DescriptionText text={name} className={classes.responsibilityTitle} />
            <button style={{ marginLeft: "10px" }} onClick={onClick}>showHide</button>
            <button style={{ marginLeft: "10px" }} onClick={() => addResponsibility('asdasdasd')}>addNew</button>

        </div>
    );
};

export default ButtonsController;