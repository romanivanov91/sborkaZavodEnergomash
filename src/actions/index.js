export const ordersFetching = () => {
    return {
        type: 'ORDERS_FETCHING'
    }
}

export const ordersFetched = (orders) => {
    return {
        type: 'ORDERS_FETCHED',
        payload: orders
    }
}

export const ordersFetchingError = () => {
    return {
        type: 'ORDERS_FETCHING_ERROR'
    }
}

export const orderFormAdd = (order) => {
    return {
        type: 'ORDER_FORM_ADD',
        payload: order
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchedError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }
}

export const orderDeleted = (id) => {
    return {
        type: 'ORDER_DELETED',
        payload: id
    }
}