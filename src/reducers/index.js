const initialState = {
    orders: [
        {
            "year": 2016,
            "id": 1,
            "customer": "Старко",
            "cabinet": [
                {
                    "name": "Шкаф ВРУ-1-11-10",
                    "manager": "Иванов Андрей",
                    "engineer": "Иванов Роман",
                    "supply": "Иванов Александр",
                },
                {
                    "name": "Шкаф ВРУ-1-48-02",
                    "manager": "Иванов Андрей",
                    "engineer": "Иванов Роман",
                    "supply": "Иванов Александр",
                }
            ],
            "dateOfShipment": "2016-03-25"
        },
        {
            "year": 2016,
            "id": 2,
            "customer": "ЭТМ",
            "cabinet": [
                {
                    "name": "ГРЩ",
                    "manager": "Петрова Татьяна",
                    "engineer": "Павлов Сергей",
                    "supply": "Иванов Александр",
                },
                {
                    "name": "ЩР",
                    "manager": "Петрова Татьяна",
                    "engineer": "Павлов Сергей",
                    "supply": "Иванов Александр",
                }
            ],
            "dateOfShipment": "2016-03-25"
        },
    ],
    ordersLoadingStatus: 'idle',
    filters: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, "all"],
    filtersLoadingStatus: 'idle',
    filteredOrders: [],
    activeFilterName: 'all',
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
                orders: action.payload,
                filteredOrders: state.activeFilterName === 'all' ? 
                                action.payload :
                                action.payload.filter(item => item.year === state.activeFilterName),
                ordersLoadingStatus: 'idle'
            }
        case 'ORDERS_FETCHING_ERROR':
            return {
                ...state,
                ordersLoadingStatus: 'error'
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