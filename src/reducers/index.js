import { activeOrder, showModal } from "../actions";

const initialState = {
    orders: [
    ],
    ordersLoadingStatus: 'idle',
    filters: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    filtersLoadingStatus: 'idle',
    filteredOrders: [],
    activeFilterName: 'all',
    showModal: false,
    activeOrder: {
        'id': 0,
        '№': 0
        },
    activeProduct : {
    },
    userAutorisation: false,
    user: {
    },
    updateUserFormState: false,
    errorUserPass: false,
    updateUserPassFormState: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ORDERS_FETCHING':
            return {
                ...state,
                ordersLoadingStatus: 'loading'
            }
        case 'ORDERS_FETCHED':
            return {
                ...state,
                orders: action.payload
                // ,
                // filteredOrders: state.activeFilterName === 'all' ? 
                //                 action.payload :
                //                 action.payload.filter(item => item.year === state.activeFilterName),
                // ordersLoadingStatus: 'idle'
            }
        case 'ORDERS_FETCHING_ERROR':
            return {
                ...state,
                ordersLoadingStatus: 'error'
            }
        case 'SHOW_MODAL':
            return {
                ...state,
                showModal: !state.showModal
            }
        case 'ACTIVE_ORDER':
            return {
                ...state,
                activeOrder: action.payload
            }
        case 'ACTIVE_PRODUCT':
            return {
                ...state,
                activeProduct: action.payload
            }
        case 'ORDER_FORM_ADD':
            const newOrderListAdd = [...state.orders, action.payload]
            return {
                ...state,
                orders: newOrderListAdd,
                filteredHeroes: state.activeFilterName === 'all' ? 
                    newOrderListAdd :
                    newOrderListAdd.filter(item => item.year === state.activeFilterName)
            }
        case 'PRODUCT_FORM_ADD':
            const newProductAdd = state.orders.map(item => {
                if ( action.payload['id_Order'] === item['id']) {
                    item['products'].push(action.payload);
                    return item;
                } else {
                    return item;
                } 
            })
            return {
                ...state,
                orders: newProductAdd
                // ,
                // filteredHeroes: state.activeFilterName === 'all' ? 
                //     newOrderListAdd :
                //     newOrderListAdd.filter(item => item.year === state.activeFilterName)
            }
        case 'PRODUCT_FORM_UPDATE':
            const updateProduct = state.orders.map((item, i) => {
                if ( action.payload['id_Order'] === item['id']) {
                    const updateProducts = item['products'].map((el, n) => {
                        if (el['id'] === action.payload['id']) {
                            return el = action.payload;
                        } else {
                            return el;
                        }
                    })
                    item['products'] = updateProducts;
                    return item;
                } else {
                    return item;
                } 
            })
            console.log(updateProduct);
            return {
                ...state,
                orders: updateProduct
            }
        case 'СREATE_USER':
                return {
                    ...state,
                    user: action.payload
                }
        case 'AUTORISATION_USER':
                const userAutorisationBool = () => {
                    if (Object.entries(action.payload).length === 0) {
                        return false
                    } else {
                        return true
                    }
                }
                return {
                    ...state,
                    user: action.payload,
                    userAutorisation: userAutorisationBool()
                }
        case 'UPDATE_USER':
                return {
                    ...state,
                    updateUserFormState: !state.updateUserFormState
                }
        case 'REC_USER_PASS':
                return {
                    ...state,
                    errorUserPass: action.payload
                }
        case 'UPDATE_USER_PASS':
                return {
                    ...state,
                    updateUserPassFormState: action.payload
                }
        // case 'FILTERS_FETCHING':
        //     return {
        //         ...state,
        //         filtersLoadingStatus: 'loading'
        //     }
        // case 'FILTERS_FETCHED':
        //     return {
        //         ...state,
        //         filters: action.payload,
        //         filtersLoadingStatus: 'idle'
        //     }
        // case 'FILTERS_FETCHED_ERROR':
        //     return {
        //         ...state,
        //         filtersLoadingStatus: 'error'
        //     }
        // case 'ACTIVE_FILTER_CHANGED':
        //     return {
        //         ...state,
        //         activeFilterName: action.payload,
        //         filteredOrders: action.payload === 'all' ? 
        //                         state.orders :
        //                         state.orders.filter(item => item.year === action.payload)
        //     }
        // case 'ORDER_DELETED':
        //     const newOrderListDel = state.orders.filter(item => item.id !== action.payload);
        //     console.log(newOrderListDel);
        //     return {
        //         ...state,
        //         orders: newOrderListAdd,
        //         filteredOrders: state.activeFilterName === 'all' ? 
        //             newOrderListDel :
        //             newOrderListDel.filter(item => item.year === state.activeFilterName)
        //     }
        default: return state
    }
}

export default reducer;