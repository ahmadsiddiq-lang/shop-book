import Axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'http://192.168.1.12:4000';

export const getProduct = ()=>{
    return{
        type: "GET_PRODUCT",
        payload: Axios.get(BASE_URL,{
            withCredentials: true,
        })
    };
};

export const insertCart =(data)=>{
    return{
        type: "INSERT_CART",
        payload: Axios.post(BASE_URL+"/cart", data)
    }
};

export const getCart = (data)=>{
    return{
        type: "GET_CART",
        payload: data,
    }
};
export const deleteCart =(id_cart)=>{
    return{
        type: "DELETE_CART",
        payload: Axios.delete(BASE_URL+`/deletecart/${id_cart}`).then(res=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Delete Success !',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
};
export const searchData =(data)=>{
    console.log(data)
    return{
        type: "SEARCH_PRODUCT",
        payload: Axios.get(BASE_URL+`/searc/${data}`)
    }
};