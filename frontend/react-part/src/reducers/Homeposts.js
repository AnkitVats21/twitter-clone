import {CONSTANTS } from '../actions';


const initialState = null;


const homeposts = (state=initialState,action)=> {
    switch (action.type){

        case CONSTANTS.ADD_POSTS:
        
           

            return {...state, home: action.payload};


        default:
            
            return state;
    }
};

export default homeposts;