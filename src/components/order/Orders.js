import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import HeaderOrder from '../order/headerOrder/HeaderOrder';
import OrderAdd from '../order/orderAdd/OrderAdd';
import SearchPanel from '../order/searchPanel/SearchPanel';
import OrderList from '../order/orderList/OrderList';
import СounterpartyAdd from './counterpartyAdd/CounterpartyAdd';

const Orders = () => {

    const userAutorisation = useSelector(state=>state.userAutorisation);

    const View = useCallback( () => {
        if (userAutorisation) {
            return (
                <>
                <HeaderOrder />
                <OrderAdd />
                <СounterpartyAdd />
                <SearchPanel />
                <OrderList /> 
                </> 
                )
        } else {
            return (
                <>
                    <p>Для просмотра информации войдите или зарегестрируйтесь!</p>
                </>
            )
        }
    }, [userAutorisation] )

    return (
            <>
                <View/>
            </>
        )

}

export default Orders;