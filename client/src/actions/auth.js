import axios from 'axios';

export const GET_TOKEN = 'get_token';

const ROOT_URL = 'http://localhost:3000';

export function getToken(grantType, id) {
    const request = axios.post(`${ROOT_URL}/auth/login`, {
        grant_type: grantType,
        token: id
    }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

    return {
        type: GET_TOKEN,
        payload: request
    }
}