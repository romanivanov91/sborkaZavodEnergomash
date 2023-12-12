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

export const showModal = () => {
    return {
        type: 'SHOW_MODAL',
    }
}

export const activeOrder = (id, number) => {
    return {
        type: 'ACTIVE_ORDER',
        payload: {
            'id': id,
            '№': number
            }
    }
}

export const activeProduct = (product) => {
    return {
        type: 'ACTIVE_PRODUCT',
        payload: product
    }
}

export const productFormAdd = (product) => {
    return {
        type: 'PRODUCT_FORM_ADD',
        payload: product
    }
}

export const productFormUpdate = (product) => {
    return {
        type: 'PRODUCT_FORM_UPDATE',
        payload: product
    }
}

export const autorisationUser = (user) => {
    return {
        type: 'AUTORISATION_USER',
        payload: user
    }
}

export const updateUser = () => {
    return {
        type: 'UPDATE_USER'
    }
}

export const recUserPass = (bool) => {
    return {
        type: 'REC_USER_PASS',
        payload: bool
    }
}

export const updateUserPass = (bool) => {
    return {
        type: 'UPDATE_USER_PASS',
        payload: bool
    }
}

export const saveUser = (bool) => {
    return {
        type: 'SAVE_USER',
        payload: bool
    }
}

// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }

// export const filtersFetchedError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

// export const activeFilterChanged = (filter) => {
//     return {
//         type: 'ACTIVE_FILTER_CHANGED',
//         payload: filter
//     }
// }

// export const orderDeleted = (id) => {
//     return {
//         type: 'ORDER_DELETED',
//         payload: id
//     }
// }