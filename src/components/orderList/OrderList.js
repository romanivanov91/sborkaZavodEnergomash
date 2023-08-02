import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ordersFetched } from '../../actions';

import './OrderList.css';

const OrderList = () => {

    const {orders} = useSelector(state=>state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        request("http://localhost:3001/orders")
        .then((data) => {
            dispatch(ordersFetched(data));
        }).catch((error) => {
            console.log(error); // вывести ошибку
         });
        // eslint-disable-next-line
    }, []);

    

    const renderOrders = (orders) => {
        return orders.map((item, i) => {
            return (
                <div className="table_orders_string" key = {i}>
                    <div className="table_orders_string_cell">{item['№']}</div>
                    <div className="table_orders_string_cell">{item['customer']}</div>
                    <div className="table_orders_string_cell">{
                        item['products'].map((el, i) => {
                            return (
                                <div className="table_orders_heading_prod_string" key = {i}>
                                    <div>{el['name']}</div>
                                    <div>{el['quantity']}</div>
                                    <div>{el['ingener']}</div>
                                    <div>{el['supplier']}</div>
                                    <div>{el['installationOfCabinets']}</div>
                                    <div>{el['brigade']}</div>
                                    <div>{el['shipment']}</div>
                                    <div>
                                        <input type="button" value={'Редактировать'}/>
                                    </div>
                                </div>
                                )
                        })
                    }
                        <div>
                            <input 
                                type="submit" 
                                value={'Добавить'}
                            />
                        </div>
                    </div>
                    <div className="table_orders_string_cell">{item['launchDate']}</div>
                    <div className="table_orders_string_cell">{item['dateOfShipment']}</div>
                    <div className="table_orders_string_cell">{item['responsibleManager']}</div>
                </div>
            )
        })
    };

    console.log(renderOrders(orders));

    return (
        <div className="orderList">
            <div className="table_orders_heading">
                <div className="table_orders_heading_cell">№</div>
                <div className="table_orders_heading_cell">Заказчик</div>
                <div className="table_orders_heading_prod table_orders_heading_cell">
                    <div>Продукция</div>
                    <div className="table_orders_heading_prod_heading">
                        <div>Наименование</div>
                        <div>Кол-во</div>
                        <div>Конструктор</div>
                        <div>Снабжение отв.</div>
                        <div>Монтаж шкафов</div>
                        <div>Бригада</div>
                        <div>Отгрузка</div>
                        <div></div>
                    </div>
                </div>
                <div className="table_orders_heading_cell">Дата запуска</div>
                <div className="table_orders_heading_cell">Дата отгрузки</div>
                <div className="table_orders_heading_cell">Менеджер</div>
            </div>
                {renderOrders(orders)}
        </div>
        )
}

export default OrderList;