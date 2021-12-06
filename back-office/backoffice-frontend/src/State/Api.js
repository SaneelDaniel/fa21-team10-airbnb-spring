import axios from 'axios';

const authEndpoint = process.env.REACT_APP_AUTH_ENDPOINT;

export const login = async (username, password) => {
    const resp = await axios.post(authEndpoint + 'authenticate', {
        username, password
    });
    if (resp.status !== 200) {
        throw Error;
    }
    return resp.data;
}

export default {
    login
}