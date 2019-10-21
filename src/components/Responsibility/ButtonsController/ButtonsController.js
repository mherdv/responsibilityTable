import React from 'react';
import DescriptionText from '../DescriptionText';

const ButtonsController = ({
    classes,
    onClick,
    name,
    addResponsibility
}) => {
    return (
        <div>
            <DescriptionText text={name} className={classes.responsibilityTitle} />
            <button style={{ marginLeft: "10px" }} onClick={onClick}>showHide</button>
            <button style={{ marginLeft: "10px" }} onClick={() => addResponsibility('asdasdasd')}>addNew</button>

        </div>
    );
};

export default ButtonsController;