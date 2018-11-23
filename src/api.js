import axios from 'axios';

/**
 * This endpoint is to get the user profile information
 *
 * @param  {JSON Object} data               This is a JSON object containing contextID
 * @param  {Axios token} axiosCancelToken   This is a cancel token sent from the api call
 * @return {Response Object}                The response can be hooked from a .then or .catch method on the api call
 */
export const getProfileInfo = () => axios.get(
    'https://s3.amazonaws.com/dribbble/frontend-exercise/user.json',
);

/**
 * This endpoint is to get the user profile information
 *
 * @param  {JSON Object} data               This is a JSON object containing contextID
 * @param  {Axios token} axiosCancelToken   This is a cancel token sent from the api call
 * @return {Response Object}                The response can be hooked from a .then or .catch method on the api call
 */
export const getShots = (page) => axios.get(
    `https://s3.amazonaws.com/dribbble/frontend-exercise/shots-${page}.json`,
);

export default {
    getProfileInfo,
    getShots,
};
