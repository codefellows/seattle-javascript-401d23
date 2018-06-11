import { combineReducers } from 'redux';
import token from './token';
import clientProfile from './client-profile';

export default combineReducers({ token, clientProfile });
