import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {useHttp} from '../../../hooks/http.hook';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import BarLoader from "react-spinners/BarLoader";

import './CounterpartyAdd.css';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className='inputProd'>
            <label htmlFor='{props.name}'>{label}</label>
            <input {...props} {...field}/>
            <div className='errorMsgAddEditOrderPar'>
                {meta.touched && meta.error ? (
                    <div className='errorMsgAddEditOrder'>{meta.error}</div>
                ) : null}
            </div>
        </div>
    )
}

const СounterpartyAdd = () => {

    const [errorMsg, setErrorMsg] = useState(false);
    const [spinner, setSpinner] = useState(false)

    const submitBtn = () => {
        if (spinner) {
            return (
                <div className='form_add_order_spinner'>
                    <BarLoader
                        color="#36d7b7"
                        cssOverride={{}}
                        speedMultiplier={1}
                    />
        </div>
                )
        } else {
            return (
                <div className="submitBtnCounterpartyAddForm">
                    <input 
                        className='form_submit_add_order' 
                        type="submit" 
                        value='Добавить'/>
                    {errorMsg ? errorMessage(): null}
                </div>
                )
        }
    }

    const errorMessage = () => {
        return (
                <div className="errorMessage">
                    <div>
                        <p>Произошла ошибка! Контрагент не добавлен!</p>
                    </div>
                </div>
            );
    }

    return (
        <>
            <div className = 'counterpartyAdd'>
                <h1>Добавить контрагента</h1>
                    <Formik
                        initialValues = {{
                            fullName: '',
                            shortName: '',
                            inn: '',
                            kpp: '',
                            ogrn: '',
                            director: '',
                            email: '',
                            telephone: '',
                            bankName: '',
                            BIC: '',
                            correspondentAccount: '',
                            settlementAccount: '',
                            typesActivities: ''
                        }}
                        validationSchema = {Yup.object({
                            year: Yup.string()
                                .required('Обязательное поле!'),
                            customer: Yup.string()
                                .required('Обязательное поле!'),
                            launchDate: Yup.string()
                                .required('Обязательное поле!'),
                            dateOfShipment: Yup.string()
                                .required('Обязательное поле!')
                        })}
                        onSubmit = {(values, {resetForm}) => {
                            console.log(values);
                            //addOrder(values);
                            resetForm();
                        }}
                        enableReinitialize={true}
                    >
                        <Form className="counterpartyAdd_form">
                            <div className='counterpartyAdd_form_order'>
                                <div tabIndex="0">
                                    <MyTextInput
                                        id="year"
                                        label='Год'
                                        name="year"
                                        type="text"
                                        disabled
                                        />
                                </div>
                                <div tabIndex="0">
                                    <MyTextInput
                                        id="customer"
                                        label='Заказчик'
                                        name="customer"
                                        type="text"
                                    />
                                </div>
                                <div tabIndex="0">
                                    <MyTextInput
                                        id="launchDate"
                                        label='Дата запуска'
                                        name="launchDate"
                                        type="date"
                                    />
                                </div>
                                <div tabIndex="0">
                                    <MyTextInput
                                        id="dateOfShipment"
                                        label='Дата отгрузки'
                                        name="dateOfShipment"
                                        type="date"
                                    />
                                </div>
                            </div>
                            <div>
                                {submitBtn()}
                            </div>
                        </Form>
            </Formik>
        </div>
        </>
    )
}

export default СounterpartyAdd;