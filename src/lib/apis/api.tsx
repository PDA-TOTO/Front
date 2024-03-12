import axios from 'axios'

export const BASE_URL = "http://test.com/api";

export const exampleInstance = axios.create({
    baseURL: BASE_URL + '/example',
});

