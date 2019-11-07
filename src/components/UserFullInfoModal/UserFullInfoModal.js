import React, { useEffect } from 'react';
import classes from './userFullInfoModal.module.scss';
import { hideUserFullResponsibilityModal } from '../../store/actions/users/fullResponsibilityes';



const UserFullInfoModal = ({ user, responsibilities }) => {

    useEffect(() => {
        const documentOnClick = function (event) {

            if (event.target.closest('.' + classes.container) || event.target.closest('header')) return;
            hideUserFullResponsibilityModal()
        }
        document.addEventListener('click', documentOnClick)
        return () => {

            document.removeEventListener('click', documentOnClick)
        }
    }, [])

    return (
        <div className={classes.container}>
            <h1>{user.fullName}</h1>

            <h4>{user.position || ''} </h4>



            <div className={classes.modalResponsibilitiesContainer}>
                {responsibilities.map((responsibility, index) => {


                    let status = responsibility.users[user.id];
                    if (status === 3) return null;

                    return <div className={classes.oneResponsibility} key={"description__detail" + index}>

                        <div><span className={classes.smallTitle}>Responsibility: </span> <div> {responsibility.name || 'name'}</div>  <img src={status + ".svg"} alt="status icon" /></div>
                        <div><span className={classes.smallTitle}>Description:    </span> <div>{responsibility.description || null}</div> </div>
                    </div>
                })}
            </div>

            <button className={classes.closeButton} onClick={hideUserFullResponsibilityModal}><img src={"/close.svg"} alt={"close"} /></button>
        </div>
    );
};

UserFullInfoModal.defaultProps = {
    user: null,
    responsibilities: [],
    isVisible: false
}

export default UserFullInfoModal;