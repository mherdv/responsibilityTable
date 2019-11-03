import { combineReducers } from "redux";
import users from './usersReducer';
import responsibility from './rosponsibilityReducer';
import events from './eventsReduser'

export default combineReducers({
    users,
    responsibility,
    events
})