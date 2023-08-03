import { showModal } from "../actions"

const initialState = {
    orders: [
    ],
    ordersLoadingStatus: 'idle',
    filters: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    filtersLoadingStatus: 'idle',
    filteredOrders: [],
    activeFilterName: 'all',
    showModal: false,
    activeOrder: 0
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
            console.log(action.payload);
            return {
                ...state,
                activeOrder: action.payload
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
            return {
                ...state,
                orders: newOrderListAdd,
                filteredHeroes: state.activeFilterName === 'all' ? 
                    newOrderListAdd :
                    newOrderListAdd.filter(item => item.year === state.activeFilterName)
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHED_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilterName: action.payload,
                filteredOrders: action.payload === 'all' ? 
                                state.orders :
                                state.orders.filter(item => item.year === action.payload)
            }
        case 'ORDER_DELETED':
            const newOrderListDel = state.orders.filter(item => item.id !== action.payload);
            console.log(newOrderListDel);
            return {
                ...state,
                orders: newOrderListAdd,
                filteredOrders: state.activeFilterName === 'all' ? 
                    newOrderListDel :
                    newOrderListDel.filter(item => item.year === state.activeFilterName)
            }
        default: return state
    }
}

export default reducer;