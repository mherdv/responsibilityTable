import { combineReducers } from "redux";
import users from './usersReducer';
import responsibility from './rosponsibilityReducer';
import events from './eventsReduser';
import userFullInfoModal from './userFullInfoModalReduser';

export default combineReducers({
    users,
    responsibility,
    events,
    userFullInfoModal
})