import { combineReducers } from 'redux';
import homeposts from './Homeposts.js';

export default combineReducers({
    home: homeposts
});