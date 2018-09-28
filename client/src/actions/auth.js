import axios from 'axios';

export const GET_TOKEN = 'get_token';

const ROOT_URL = 'http://localhost:3000';

export function getToken(grantType, id) {
    const params = new URLSearchParams();
    params.append('grant_type', grantType);
    params.append('token', id);

    const request = axios.post(`${ROOT_URL}/auth/login`,
        params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

    return {
        type: GET_TOKEN,
        payload: request
    }
}