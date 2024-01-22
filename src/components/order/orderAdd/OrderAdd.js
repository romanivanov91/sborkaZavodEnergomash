import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {useHttp} from '../../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { orderFormAdd } from '../../../actions';

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

    const orders = useSelector(state=>state.orders);
    const dispatch = useDispatch();
    const {request} = useHttp();



    const addOrder = (values) => {
        request('http://localhost:8000/sborkaZavodEnergomash/api/createOrder.php', 'POST', JSON.stringify(values, null, 2))
        .then(res => {
            console.log(res, 'Отправка успешна');
            
        })
        //.then(dispatch(orderFormAdd(objectOrder)))
        .catch(error => console.log(error));
    }

    return(
        <div className = 'orderAdd'>
            <h1>Добавить заказ</h1>
            <Formik
            initialValues = {{
                year: '',
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