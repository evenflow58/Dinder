import { GET_TOKEN } from '../actions/auth';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_TOKEN:
            return action.payload.data;
        default:
            return state;
    }
}