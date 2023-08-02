import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { orderFormAdd } from '../../actions';

import './OrderAdd.css';

const OrderAdd = () => {

    const [year, setYear] = useState('');
    const [customer, setCustomer] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    const [dateOfShipment, setDateOfShipment] = useState('');
    const [responsibleManager, setResponsibleManager] = useState('');

    const {orders} = useSelector(state=>state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const maxNumberOrders = (orders) => {
        const orderNum = orders.map((el) => {
            return el['№'];
        });
        if (orderNum !== []) {
            const maxVNumber = Math.max.apply(null, orderNum);
            return maxVNumber;
        } else {
            return 0;
        }
    }

    const addOrder = (e) => {
        console.log('форма сработала');
        e.preventDefault();
        const objectOrder = {
            id: uuidv4(),
            year: year,
            '№': maxNumberOrders(orders) + 1,
            customer: customer,
            products: [],
            launchDate: launchDate,
            dateOfShipment: dateOfShipment,
            responsibleManager: responsibleManager
        }
        request('http://localhost:3001/orders', 'POST', JSON.stringify(objectOrder))
        .then(res => console.log(res, 'Отправка успешна'))
        .then(dispatch(orderFormAdd(objectOrder)))
        .catch(error => console.log(error));
        //Очищаем форму после отправки
        setYear('');
        setCustomer('');
        setLaunchDate('');
        setDateOfShipment('');
        setResponsibleManager('');
    }

    return(
        <div className = 'orderAdd'>
            <h1>Добавить заказ</h1>
            <form className='orderAdd_form'
                onSubmit={addOrder}>
                <div className='orderAdd_form_order'>
                    <div>
                        <label>Год</label>
                        <input
                            required
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Заказчик</label>
                        <input
                            required
                            type="text"
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Дата запуска</label>
                        <input
                            required
                            type="date"
                            value={launchDate}
                            onChange={(e) => setLaunchDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Дата отгрузки</label>
                        <input
                            required
                            type="date"
                            value={dateOfShipment}
                            onChange={(e) => setDateOfShipment(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Ответстсвенный</label>
                        <input
                            required
                            type="text"
                            value={responsibleManager}
                            onChange={(e) => setResponsibleManager(e.target.value)}
                        ></input>
                    </div>
                </div>    
                <div>
                    <input
                            required
                            type="submit"
                            value="Добавить"
                    ></input>
                </div>     
            </form>
        </div>
    )
};

export default OrderAdd;