const initialValue = {
    dataProduct: [],
    dataCart: [],
    errMsg: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
}

const reducer = (state = initialValue, action) => {
    switch (action.type) {
        case "GET_PRODUCT_PENDING":
            return {
            ...state,
            isPending: true,
            isRejected: false,
            isFulfilled: false
            };
        case "GET_PRODUCT_REJECTED":
            return {
            ...state,
            isPending: false,
            isRejected: true,
            errMsg: action.payload.data
            };
        case "GET_PRODUCT_FULFILLED":
            return {
            ...state,
            isPending: false,
            isFulfilled: true,
            dataProduct: action.payload.data
            };
        case "INSERT_CART_FULFILLED":
            {
                // state.dataCart.push(action.payload.data)
                return{
                    ...state,
                    isPending: false,
                    isFulfilled: true,
                    dataCart: [...state.dataCart, action.payload.data]
                }
            }
        case "GET_CART_PENDING":
            return {
            ...state,
            isPending: true,
            isRejected: false,
            isFulfilled: false
            };
        case "GET_CART_REJECTED":
            return {
            ...state,
            isPending: false,
            isRejected: true,
            errMsg: action.payload.data
            };
        case "GET_CART":
            return {
            ...state,
            isPending: false,
            isFulfilled: true,
            dataCart: action.payload.data
            };
        case "DELETE_CART_PENDING":
            return {
            ...state,
            isPending: true,
            isRejected: false,
            isFulfilled: false
            };
        case "DELETE_CART_REJECTED":
            return {
            ...state,
            isPending: false,
            isRejected: true,
            errMsg: action.payload.data
            };
        case "DELETE_CART_FULFILLED":
            return {
            ...state,
            isPending: false,
            isFulfilled: true,
            // dataCart: action.payload.data
            };
        case "SEARCH_PRODUCT_PENDING":
            return {
            ...state,
            isPending: true,
            isRejected: false,
            isFulfilled: false
            };
        case "SEARCH_PRODUCT_REJECTED":
            return {
            ...state,
            isPending: false,
            isRejected: true,
            errMsg: action.payload.data
            };
        case "SEARCH_PRODUCT_FULFILLED":
            return {
            ...state,
            isPending: false,
            isFulfilled: true,
            dataProduct: action.payload.data
            };
        default:
            return state;
    }
};

export default reducer;