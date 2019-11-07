import React from 'react';
import classes from './Header.module.scss'
import { toggleDeportment, showHalfDeportmentUsers } from '../../store/actions/users/usersAction';
import sizes from '../../constants/sizes'
import { showUserFullResponsibilitiesModal } from '../../store/actions/users/fullResponsibilityes';

const Header = ({ usersArray }) => {

    let headerPIndex = -1;



    return (
        <>
            <div className={classes.departmentsChecker}>
                {usersArray.map((deportament, index) => {
                    return (
                        <div key={`checkbox____${deportament.deportamentName}`}
                            onClick={() => toggleDeportment(index, usersArray)}
                            className={classes.checkboxContainer}
                        >
                            <label className={'customCheckboxLeft ' + (deportament.show ? ' checked' : ' ')} >{deportament.deportamentName}</label>
                            {/* todo change to deportament id  */}
                            <input type="checkbox"

                                checked={deportament.show}
                            />
                        </div>
                    )
                })}
            </div>
            <header>
                {usersArray.map((deportament, index) => {
                    let sectionWidth = deportament.users.length * sizes.checkboxWidth + "px";
                    if (deportament.showHalf) sectionWidth = (sizes.halfPersonalCount + 1) * sizes.checkboxWidth + 'px';
                    if (!deportament.show) return null;
                    return (

                        <div style={{ minWidth: sectionWidth, maxWidth: sectionWidth }} key={`${deportament.name}_${deportament.id}_${index}`} className={classes.deportament}>

                            <h4 className={classes.deportamentName}>
                                {deportament.deportamentName}
                                {deportament.users.length > sizes.halfPersonalCount + 1 ?
                                    <button className={classes.halfShower + " " + (deportament.showHalf ? classes.showLess : '')} onClick={() => showHalfDeportmentUsers(index, usersArray)}><img src="/arrowDown.svg" alt="arrow" /></button>
                                    : null}

                            </h4>
                            <div>
                                {deportament.users.map((user, index) => {
                                    headerPIndex++
                                    if (deportament.showHalf && index > sizes.halfPersonalCount) return null
                                    return <p key={`${user.name}_${user.id}_${index}`} data-name={"header_" + headerPIndex} onClick={() => showUserFullResponsibilitiesModal(user)}>{user.fullName}</p>
                                })}
                            </div>
                        </div>
                    )
                })}
            </header>
        </>
    );
};

export default Header;