import React from 'react';
import classes from './Header.module.scss'

const Header = ({ usersArray }) => {
    return (


        <header>

            {usersArray.map((deportament, index) => {
                return (

                    deportament.show ?
                        <div style={{ width: deportament.users.length * 44 + "px" }} key={`${deportament.name}_${deportament.id}_${index}`} className={classes.deportament}>

                            <h4>{deportament.deportamentName}</h4>
                            <div>
                                {deportament.users.map((user, index) => {
                                    return <p key={`${user.name}_${user.id}_${index}`}>{user.fullName}</p>
                                })}
                            </div>
                        </div> : null
                )
            })}
        </header>

    );
};

export default Header;