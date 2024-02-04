import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {useHttp} from '../../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from 'yup';
import { ordersFetched, ordersYearsFetched, activeYear } from '../../../actions';
import BarLoader from "react-spinners/BarLoader";

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

    const user = useSelector(state=>state.user);
    //const activeYear = useSelector(state=>state.activeYear);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const date = new Date();
    
    const [errorMsg, setErrorMsg] = useState(false);
    const [spinner, setSpinner] = useState(false)
    const [users, setUsers] = useState([]);
    const [searchUsers, setSearchUsers] = useState('');
    const [activeUserFormAddOrder, setActiveUserFormAddOrder] = useState({id: user.id, fullName: user.firstname + ' ' + user.lastname + ' ' + user.patronymic + ' (' + user.id + ')'});

    useEffect(() => {
        usersRequest(searchUsers);
    }, [searchUsers])

    const addOrder = (values) => {
        console.log(values);
        setSpinner(true);
        request('http://localhost:8000/sborkaZavodEnergomash/api/createOrder.php', 'POST', JSON.stringify(values, null, 2))
        .then(res => {
            console.log(res, 'Отправка успешна');
            updateOrders();
            updateYears();
            setErrorMsg(false);
            setSpinner(false);
        })
        .catch(error => {
            console.log(error);
            setErrorMsg(true);
            setSpinner(false);
        });
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
            dispatch(activeYear(date.getFullYear()));
        }).catch((error) => {
            console.log(error); // вывести ошибку
         });
    }

    const usersRequest = (searchUsers) => {
        request("http://127.0.0.1/sborkaZavodEnergomash/api/readUser.php", 'POST', JSON.stringify({searchUsers: searchUsers}, null, 2))
        .then((data) => {
            setUsers(data)
        }).catch((error) => {
            console.log(error); // вывести ошибку
         });
    }

    const usersFilter = () => {
        if (Array.isArray(users)) {
            console.log(users);
            const selectUsers = users.map((el, i)=>{
                return (
                    <li value={el.id} key = {i} onClick={() => setActiveUserFormAddOrder(el)}>{el.fullName} ({el.id})</li>
                    )
            })
            return selectUsers;
        }
    }

    const submitBtn = () => {
        if (spinner) {
            return (
                <div className='form_reg_auth_spinner'>
                    <BarLoader
                        color="#36d7b7"
                        cssOverride={{}}
                        speedMultiplier={1}
                    />
        </div>
                )
        } else {
            return (
                <div className="submitBtn">
                    <input 
                        className='form_submit' 
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
                        <p>Произошла ошибка! Заказ не добавлен!</p>
                    </div>
                </div>
            );
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
                responsibleManager: activeUserFormAddOrder.fullName,
                userId: activeUserFormAddOrder.id
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
                            <div className='inputProd'>
                                <label htmlFor='responsibleManager'>Ответственный менеджер</label>
                                <Field
                                    id="responsibleManager"
                                    name="responsibleManager"
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e) => setSearchUsers(e.target.value)}
                                />
                            </div>
                            <div className='selectFullName'>
                                <ul>
                                    {usersFilter()};
                                </ul>
                            </div>  
                        </div>
                    </div>
                    <div>
                            {submitBtn()}
                    </div>
                </Form>
            </Formik>
        </div>
    )
};

export default OrderAdd;