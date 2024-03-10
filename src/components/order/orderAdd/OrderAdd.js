import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {useHttp} from '../../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, useField, Field, useFormikContext } from 'formik';
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
            <div className='errorMsgAddEditOrderPar'>
                {meta.touched && meta.error ? (
                    <div className='errorMsgAddEditOrder'>{meta.error}</div>
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
    const [activeUserFormAddOrder, setActiveUserFormAddOrder] = useState({id: user.id, fullName: user.firstname + ' ' + user.lastname.charAt() + '. ' + user.patronymic.charAt() + '.'});
    const [activeUserStyle, setActiveUserStyle] = useState('manager_fio');
    const [focusSearchUser, setFocusSearchUser] = useState(false);

    useEffect(() => {
        usersRequest(searchUsers);
    }, [searchUsers])

    const addOrder = (values) => {
        console.log(values);
        setSpinner(true);
        const data = {...values, responsibleManager: activeUserFormAddOrder.id}
        request('http://localhost:8000/sborkaZavodEnergomash/api/createOrder.php', 'POST', JSON.stringify(data, null, 2))
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
        request('http://localhost:8000/sborkaZavodEnergomash/api/readOrder.php','POST', JSON.stringify({year: date.getFullYear()}, null, 2) )
        .then((data) => {
            console.log(data);
            dispatch(ordersFetched(data));
        }).catch((error) => {
            console.log(error); // вывести ошибку
         });
    }

    const updateYears = () => {
        request("http://localhost:8000/sborkaZavodEnergomash/api/readYearsOrder.php")
        .then((data) => {
            dispatch(ordersYearsFetched(data));
            dispatch(activeYear(date.getFullYear()));
        }).catch((error) => {
            console.log(error); // вывести ошибку
         });
    }

    const usersRequest = (searchUsers) => {
        request("http://localhost:8000/sborkaZavodEnergomash/api/readUser.php", 'POST', JSON.stringify({searchUsers: searchUsers}, null, 2))
        .then((data) => {
            console.log(data);
            setUsers(data);
        }).catch((error) => {
            console.log(error); // вывести ошибку
         });
    }

    const usersFilter = () => {
        if (Array.isArray(users)) {
            const selectUsers = users.map((el, i)=>{
                console.log(el);
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
                <div className="submitBtnOrderAddForm">
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
                        <p>Произошла ошибка! Заказ не добавлен!</p>
                    </div>
                </div>
            );
    }

    const searUserInput = () => {
        if (focusSearchUser) {
            return (
                <>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="new-text"
                        placeholder="начните вводить имя"
                        onChange={(e) => {
                            if (e.target.value.length > 1) {
                                setSearchUsers(e.target.value);
                            }
                        }}
                    />
                    <div className='choiceOptions'>
                        <ul>
                            {searchUsers !=='' ? usersFilter() : null}
                        </ul>
                    </div> 
                </>
            )
        }
    }

    const clickOutsideUser= (e) => {
        if (!e.target.classList.contains('manager') && !e.target.parentElement.classList.contains('manager')) {
            setFocusSearchUser(false);
            setSearchUsers('');
            setActiveUserStyle('manager_fio')
        }
    }

    return(
        <div 
            className = 'orderAdd'
            onClick={(e)=>clickOutsideUser(e)}    
        >
            <h1>Добавить заказ</h1>
            <Formik
                initialValues = {{
                    year: date.getFullYear(),
                    customer: '',
                    launchDate: '',
                    dateOfShipment: ''
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
                    addOrder(values);
                    resetForm();
                }}
                enableReinitialize={true}
            >
                {props => (
                    <Form className="orderAdd_form">
                        <div className='orderAdd_form_order'>
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
                            <div 
                                tabIndex="0"
                                onClick={()=>{setFocusSearchUser(true);setActiveUserStyle('manager_fio manager_fio_focus')}}
                            >
                                <div className='inputProd manager'>
                                    <label htmlFor='responsibleManager'>Менеджер</label>
                                    <p className={activeUserStyle}>{activeUserFormAddOrder.fullName}</p>
                                    {searUserInput()}
                                </div> 
                            </div>
                        </div>
                        <div>
                                {submitBtn()}
                        </div>
                    </Form>
                    )}
            </Formik>
        </div>
    )
};

export default OrderAdd;

//Надо попробовать, в качестве оптимизации, вынести инпут с поиском в отделные компонент, чтобы можно было использовать в другом месте
// const inputSearchOptions = (label, activeStyle, activeValue, focusSearch) => {
//     const searInput = () => {
//         if (focusSearch) {
//             return (
//                 <>
//                     <input
//                         id="fullName"
//                         name="fullName"
//                         type="text"
//                         autoComplete="new-text"
//                         placeholder="начните вводить имя"
//                         onChange={(e) => {
//                             if (e.target.value.length > 1) {
//                                 setSearchUsers(e.target.value);
//                             }
//                         }}
//                     />
//                     <div className='choiceOptions'>
//                         <ul>
//                             {searchUsers !=='' ? usersFilter() : null}
//                         </ul>
//                     </div> 
//                 </>
//             )
//         }
//     }

//     return (
//         <>
//             <div className='inputProd manager'>
//                 <label htmlFor='responsibleManager'>{label}</label>
//                 <p className={activeStyle}>{activeValue.fullName}</p>
//                 {searInput()}
//             </div> 
//         </>
//     )
// } 