import HeaderOrder from '../order/headerOrder/HeaderOrder';
import OrderAdd from '../order/orderAdd/OrderAdd';
import SearchPanel from '../order/searchPanel/SearchPanel';
import OrderList from '../order/orderList/OrderList';

const Orders = () => {
    return (
        <>
        <HeaderOrder />
        <OrderAdd />
        <SearchPanel />
        <OrderList /> 
        </>
        )
}

export default Orders;