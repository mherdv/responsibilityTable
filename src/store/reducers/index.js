import { combineReducers } from "redux";
import users from './usersReducer';
import responsibility from './rosponsibilityReducer';

export default combineReducers({
    users,
    responsibility
})