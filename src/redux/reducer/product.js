const inicialValue = {
    dataProduct: [],
}

const reducer =(state = inicialValue, action)=>{
    switch (action.type){
        case "GET_PRODUCT_PENDING":
            return{
                ...state,
                isPending: true,
                isRiject: false,
                isFullfilled: false,
            };
        case "GET_PRODUCT_REJECTED":
            return{
                ...state,
                isPending: false,
                isRiject: true,
                errMsg: action.payload.data,
            };
        case "GET_PRODUCT_FULLFILLED":
            return{
                ...state,
                isPending: false,
                isFullfilled: true,
                product: action.payload.data,
            }
        default:
            return state;
    }
}

export default reducer;