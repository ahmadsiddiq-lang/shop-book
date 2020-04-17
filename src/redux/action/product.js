import axios from 'axios';
const BASE_URL = 'http://localhost:4000';

export const getProduct = ()=>{
    return{
        type: "GET_PRODUCT",
        payload: axios.get(BASE_URL)
    };
};