import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {useHttp} from '../../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { ordersFetched, ordersYearsFetched } from '../../../actions';

import './OrderAdd.css';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className='inputProd'>
            <label htmlFor='{props.name}'>{label}</label>
            <input {...props} {...field}/>
            <div className='errorMsgAddEditProdPar'>
                {meta.touched && meta.error ? (
                    <div className='errorMsgAddEditProd'>{meta.error}</div>
                ) : null}
            </div>
        </div>
    )
}

const OrderAdd = () => {

    //const orders = useSelector(state=>state.orders);
    //const activeYear = useSelector(state=>state.activeYear);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const date = new Date();

    const addOrder = (values) => {
        request('http://localhost:8000/sborkaZavodEnergomash/api/createOrder.php', 'POST', JSON.stringify(values, null, 2))
        .then(res => {
            console.log(res, 'Отправка успешна');
            updateOrders();
            updateYears();
        })
        .catch(error => console.log(error));
    }

    const updateOrders = () => {
        request('http://127.0.0.1/sborkaZavodEnergomash/api/readOrder.php','POST', JSON.stringify({year: date.getFullYear()}, null, 2) )
        .then((data) => {
            console.log(data);
            dispatch(ordersFetched(data));
        }).catch((error) => {
            console.log(error); // вывести ошибку
         });
    }

    const updateYears = () => {
        request("http://127.0.0.1/sborkaZavodEnergomash/api/readYearsOrder.php")
        .then((data) => {
            dispatch(ordersYearsFetched(data));
        }).catch((error) => {
            console.log(error); // вывести ошибку
         });
    }

    return(
        <div className = 'orderAdd'>
            <h1>Добавить заказ</h1>
            <Formik
            initialValues = {{
                year: date.getFullYear(),
                customer: '',
                launchDate: '',
                dateOfShipment: '',
                responsibleManager: ''
            }}
            validationSchema = {Yup.object({
                year: Yup.string()
                        .required('Обязательное поле!'),
                customer: Yup.string()
                        .required('Обязательное поле!'),
                launchDate: Yup.string()
                        .required('Обязательное поле!'),
                dateOfShipment: Yup.string()
                        .required('Обязательное поле!'),
                responsibleManager: Yup.string()
                        .required('Обязательное поле!'),
            })}
            onSubmit = {(values, {resetForm}) => {
                addOrder(values);
                resetForm();
            }}
            >
                <Form className="orderAdd_form">
                    <div className='orderAdd_form_order'>
                        <div>
                            <MyTextInput
                                id="year"
                                label='Год'
                                name="year"
                                type="text"
                                disabled
                            />
                        </div>
                        <div>
                            <MyTextInput
                                id="customer"
                                label='Заказчик'
                                name="customer"
                                type="text"
                            />
                        </div>
                        <div>
                            <MyTextInput
                                id="launchDate"
                                label='Дата запуска'
                                name="launchDate"
                                type="date"
                            />
                        </div>
                        <div>
                            <MyTextInput
                                id="dateOfShipment"
                                label='Дата отгрузки'
                                name="dateOfShipment"
                                type="date"
                            />
                        </div>
                        <div>
                            <MyTextInput
                                id="responsibleManager"
                                label='Ответственный менеджер'
                                name="responsibleManager"
                                type="text"
                            />
                        </div>
                    </div>
                    <div>
                            <input 
                                type="submit" 
                                value='Добавить'
                                className='btnOrderAdd'
                                />
                    </div>
                </Form>
            </Formik>
        </div>
    )
};

export default OrderAdd;