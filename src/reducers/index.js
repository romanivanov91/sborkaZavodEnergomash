const initialState = {
    orders: [
        {   "ID":1,
            "year":2020,
            "№": 20,
            "customer": "ЭПК",
            "products": [
                {
                "ID": 1,
                "ID_Order": 1,
                "name": "Корпус А100.ШК.06.04.025.УШ",
                "quantity": 1,
                "ingener": "Насейкин П.",
                "supplier": "Иванов А",
                "installationOfCabinets": "собрано",
                "brigade": 4,
                "shipment": "отгружено"
                },
                {
                "ID": 2,
                "ID_Order": 1,
                "name": "Корпус А100.ШК.10.06.025.УМ",
                "quantity": 1,
                "ingener": "Насейкин П.",
                "supplier": "Иванов А",
                "installationOfCabinets": "собрано",
                "brigade": 4,
                "shipment": "отгружено"
                },
                {
                "ID": 3,
                "ID_Order": 1,
                "name": "Корпус А100.ШК.08.06.02.УШ",
                "quantity": 4,
                "ingener": "Насейкин П.",
                "supplier": "Иванов А",
                "installationOfCabinets": "собрано",
                "brigade": 4,
                "shipment": "отгружено"
                },
                {
                "ID": 4,
                "ID_Order": 1,
                "name": "Корпус БЭЗ А102.ШК.02.025.01",
                "quantity": 28,
                "ingener": "Насейкин П.",
                "supplier": "Иванов А",
                "installationOfCabinets": "собрано",
                "brigade": 4,
                "shipment": "отгружено"
                },
            ],
            "launchDate": "2023-07-05",
            "dateOfShipment": "2023-07-05",
            "responsibleManager": "Иванов А.Н."
        }
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