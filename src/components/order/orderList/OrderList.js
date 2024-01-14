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
        <div className='inputProd'>
            <input {...props} {...field}/>
            <div className='errorMsgAddEditProdPar'>
                {meta.touched && meta.error ? (
                    <div className='errorMsgAddEditProd'>{meta.error}</div>
                ) : null}
            </div>
        </div>
    )
}



const OrderList = () => {

    const orders = useSelector(state=>state.orders);
    const activeOrderState = useSelector(state=>state.activeOrder);
    const activeYear = useSelector(state=>state.activeYear);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const [spinner, setSpinner] = useState(false);
    const [errorReg, setErrorReg] = useState(false);
    const [idOrder, setIdOrder] = useState('');
    const [addProd, setAddProd] = useState(false);

    console.log(idOrder);
    console.log(orders);

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
            setErrorReg(false);
            dispatch(ordersFetched(res));
        })
        .catch(error => {
            console.log(error);
            setSpinner(false);
            setErrorReg(true);
        });
    }

    const addEditProd = (i = 1000, product = null) => {
        return (
            <Formik
            initialValues = {{
                name: product ? product['name'] : '',
                quantity: product ? product['quantity'] : '',
                ingener: product ? product['ingener'] : '',
                supplier: product ? product['supplier'] : '',
                installationOfCabinets: product ? product['installationOfCabinets'] : '',
                brigade: product ? product['brigade'] : '',
                shipment: product ? product['shipment'] : ''
            }}
            validationSchema = {Yup.object({
                name: Yup.string()
                        .required('Обязательное поле!'),
                quantity: Yup.string()
                        .required('Обязательное поле!')
                        .matches(/^[0-9]+$/, "Введите целочисленное значение")
            })}
            onSubmit = {(values) => {
                editProdApi(values);
                setAddProd(false);
            }}
            >
                <Form className="table_orders_heading_prod_string" key = {i}>
                    <div>
                        <MyTextInput
                            id="name"
                            name="name"
                            type="text"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            id="quantity"
                            name="quantity"
                            type="text"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            id="ingener"
                            name="ingener"
                            type="text"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            id="supplier"
                            name="supplier"
                            type="text"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            id="installationOfCabinets"
                            name="installationOfCabinets"
                            type="text"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            id="brigade"
                            name="brigade"
                            type="text"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            id="shipment"
                            name="shipment"
                            type="text"
                        />
                    </div>
                    <div>
                        <input 
                            type="submit" 
                            value={'Сохранить'}
                            />
                    </div>
                </Form>
            </Formik>
            )
    }

    const renderOrders = (orders) => {
        return orders.map((item, i) => {
            if (item.YEAR == activeYear) {
                return (
                    <div className="table_orders_string" key = {i}>
                        <div className="table_orders_string_cell">{item['№']}</div>
                        <div className="table_orders_string_cell">{item['customer']}</div>
                        <div className="table_orders_string_cell">
                            {item['products'].map((el, i) => {
                                if (el.ID === idOrder) {
                                    return addEditProd(i, el)
                                } else {
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
                                                    onClick={() => {setIdOrder(el['ID']); setAddProd(false)}}
                                                    />
                                            </div>
                                        </div>
                                        )
                                }
                                
                            })
                            }
                            {addProd && item['№'] === activeOrderState['№'] ? addEditProd() : null}
                            <div>
                                <input 
                                    type="submit" 
                                    value={'Добавить'}
                                    // onClick={() => {dispatch(showModal()); dispatch(activeOrder(item['id'], item['№']));}}
                                    onClick={() => {dispatch(activeOrder(item['id'], item['№'])); setAddProd(true)}}
                                />
                            </div>
                        </div>
                        <div className="table_orders_string_cell">{item['launchDate']}</div>
                        <div className="table_orders_string_cell">{item['dateOfShipment']}</div>
                        <div className="table_orders_string_cell">{item['responsibleManager']}</div>
                    </div>
                )
            }
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