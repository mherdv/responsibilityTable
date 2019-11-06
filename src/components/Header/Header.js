import React from 'react';
import classes from './Header.module.scss'
import { toggleDeportment, showHalfDeportmentUsers } from '../../store/actions/users/usersAction';
import sizes from '../../constants/sizes'
import { showUserFullResponsibilitiesModal } from '../../store/actions/users/fullResponsibilityes';

const Header = ({ usersArray }) => {



    return (
        <>
            <div className={classes.departmentsChecker}>
                {usersArray.map((deportament, index) => {
                    return (
                        <div key={`checkbox____${deportament.deportamentName}`}
                            onClick={() => toggleDeportment(index, usersArray)}
                            className={classes.checkboxContainer}
                        >
                            <label>{deportament.deportamentName}</label>
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
                    return (

                        deportament.show ?
                            <div style={{ minWidth: sectionWidth, maxWidth: sectionWidth }} key={`${deportament.name}_${deportament.id}_${index}`} className={classes.deportament}>

                                <h4>
                                    {deportament.deportamentName}
                                    {deportament.users.length > sizes.halfPersonalCount + 1 ?
                                        <button className={classes.halfShower} onClick={() => showHalfDeportmentUsers(index, usersArray)}>-</button>
                                        : null}

                                </h4>
                                <div>
                                    {deportament.users.map((user, index) => {

                                        if (deportament.showHalf && index > sizes.halfPersonalCount) return null
                                        return <p key={`${user.name}_${user.id}_${index}`} onClick={() => showUserFullResponsibilitiesModal(user)}>{user.fullName}</p>
                                    })}
                                </div>
                            </div> : null
                    )
                })}
            </header>
        </>
    );
};

export default Header;