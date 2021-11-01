import { CONSTANTS } from '.';
import ServerService from '../services/ServerService';


export const addPost = (response) => {

    return {
        type: CONSTANTS.ADD_POSTS,
        payload: response,

    }
};


export const asyncAddPost = () => {

    return dispatch => {

        ServerService.homecards()
            .then(response => {
                console.log('Response:', response)

                if (response.status === 201 || response.status === 200 || response.status === 202) {
                    dispatch(addPost(response.data));

                }
            })


            .catch(error => {
                //something

            })
    }
}