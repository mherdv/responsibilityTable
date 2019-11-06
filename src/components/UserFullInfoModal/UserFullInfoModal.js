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
            <h1>Name: {user.fullName}</h1>

            <h2>Position: {user.position || ''} </h2>



            <div>
                {responsibilities.map((responsibility, index) => {


                    let status = responsibility.users[user.id];
                    if (status === 3) return null;

                    return <div className={classes.oneResponsibility} key={"description__detail" + index}>

                        <div><span>Responsibility: {responsibility.name || 'name'}</span>  <img src={status + ".svg"} alt="status icon" style={{ width: '30px' }} /></div>
                        <div><span>Description:  {responsibility.description || null}</span> </div>
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