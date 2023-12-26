import {useHttp} from '../../../hooks/http.hook';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { ordersFetched, showModal, activeOrder, activeProduct } from '../../../actions';
import BarLoader from "react-spinners/BarLoader";

import './OrderList.css';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
}



const OrderList = () => {

    const [idOrder, setIdOrder] = useState('');

    const {orders} = useSelector(state=>state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const [spinner, setSpinner] = useState(false);
    const [errorReg, setErrorReg] = useState(false);
    const [succesRegMesageState, setSuccesRegMesageState] = useState(false);

    console.log(idOrder);

    useEffect(() => {
        request("http://127.0.0.1/sborkaZavodEnergomash/api/readOrder.php")
        .then((data) => {
            console.log(data);
            dispatch(ordersFetched(data));
        }).catch((error) => {
            console.log(error); // вывести ошибку
         });
        // eslint-disable-next-line
    }, []);

    const editProdApi = (values) => {
        setSpinner(true);
        request('http://localhost:8000/sborkaZavodEnergomash/api/create_edit_prod.php', 'POST', JSON.stringify(values, null, 2))
        .then(res => {
            console.log(res, 'Отправка успешна');
            setSpinner(false);
            setSuccesRegMesageState(true);
            setErrorReg(false);
            setTimeout(() => {
                setSuccesRegMesageState(false)
            }, 10000);
        })
        .catch(error => {
            console.log(error);
            setSpinner(false);
            setSuccesRegMesageState(false)
            setErrorReg(true);
        });
    }

    const editProd = (product) => {
        return (
            <Formik
            initialValues = {{
                name: product['name'],
                quantity: product['quantity'],
                ingener: product['ingener'],
                supplier: product['supplier'],
                installationOfCabinets: product['installationOfCabinets'],
                brigade: product['brigade'],
                shipment: product['shipment']
            }}
            validationSchema = {Yup.object({
                name: Yup.string()
                        .required('Обязательное поле!'),
                quantity: Yup.string()
                        .required('Обязательное поле!')
            })}
            onSubmit = {(values) => {
                editProdApi(values);
            }}
            >
                <div className="table_orders_heading_prod_string" key = {i}>
                <div>{product['name']}</div>
                <div>{product['quantity']}</div>
                <div>{product['ingener']}</div>
                <div>{product['supplier']}</div>
                <div>{product['installationOfCabinets']}</div>
                <div>{product['brigade']}</div>
                <div>{product['shipment']}</div>
                <div>
                    <input 
                        type="button" 
                        value={'Сохранить'}
                        onClick={() => {setIdOrder(product['ID'])}}
                        />
                </div>
            </div>
            </Formik>
            )
    }

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
                                        <input 
                                            type="button" 
                                            value={'Редактировать'}
                                            onClick={() => {setIdOrder(el['ID'])}}
                                            />
                                    </div>
                                </div>
                                )
                        })
                    }
                        <div>
                            <input 
                                type="submit" 
                                value={'Добавить'}
                                onClick={() => {dispatch(showModal()); dispatch(activeOrder(item['id'], item['№']));}}
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