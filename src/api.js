import axios from 'axios';

/**
 * This endpoint is used for fetching the user profile information.
 *
 * @return {Response Object}  The response can be hooked from a .then or .catch method on the api call
 */
export const getProfileInfo = () => axios.get(
    'https://s3.amazonaws.com/dribbble/frontend-exercise/user.json',
);

/**
 * This endpoint is used for fetching the playbook shots besed on a page.
 *
 * @param  {Number} page      The page number to append to the endpoint url.
 * @return {Response Object}  The response can be hooked from a .then or .catch method on the api call
 */
export const getShots = (page) => axios.get(
    `https://s3.amazonaws.com/dribbble/frontend-exercise/shots-${page}.json`,
);

export default {
    getProfileInfo,
    getShots,
};
