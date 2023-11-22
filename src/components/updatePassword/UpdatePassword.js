import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useHttp } from "../../hooks/http.hook";
import BarLoader from "react-spinners/BarLoader";
import { updateUserPass } from "../../actions/index";

import './UpdatePassword.css';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor='{props.name}'>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
}

const UpdatePassword = () => {

    const [spinner, setSpinner] = useState(false);
    const [errorUpdatePassword, setErrorUpdatePassword] = useState(false);
    const [succesUpdatePasswordMesageState, setSuccesUpdatePasswordMesageState] = useState(false);

    const updateUserPassFormState = useSelector(state => state.updateUserPassFormState);

    const dispatch = useDispatch();

    const {request} = useHttp();

    const updatePassword = (values) => {

        dispatch(updateUserPass(false));

        // setSpinner(true);
        // request('http://localhost:8000/sborkaZavodEnergomash/api/update_user.php', 'POST', JSON.stringify(values, null, 2))
        // .then(res => {
        //     console.log(res, 'Отправка успешна');
        //     setSpinner(false);
        //     setSuccesUpdatePasswordMesageState(true);
        //     setTimeout(() => {
        //         setSuccesUpdatePasswordMesageState(false)
        //     }, 10000);
        // })
        // .catch(error => {
        //     console.log(error);
        //     setSpinner(false);
        //     setSuccesUpdatePasswordMesageState(false)
        //     setErrorUpdatePassword(true);
        // });
    }

    const errorMessage = () => { 
        return (
            <div className="errorMessage">
                <div>
                    <p>Ошибка изменения пароля</p>
                </div>
            </div>
        )
    }

    const succesRegMes = () => {
        if (succesUpdatePasswordMesageState) {
        return (
            <div className="succesMes">
                <div>
                    <p>Пароль успешно изменен!</p>
                </div>
            </div>
            )
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
                    value='Сменить пароль'/>
                    {errorUpdatePassword ? errorMessage(): null}
                </div>
                )
        }
    }

    return (

        <div className="userRegAuth_body">
            <div className="userRegAuth_body_choiceRegAuth">
                <Formik
                    initialValues = {{
                     password: '',
                    repeatPassword: ''
                    }}
                    validationSchema = {Yup.object({
                        password: Yup.string('Введите пароль!')
                            .required('Введите пароль')
                            .min(7, 'Минимум 7 символов')
                            .max(255, 'Превышение максимального колличества символов 255'),
                        repeatPassword: Yup.string()
                            .required('Введите пароль повторно!')
                            .oneOf([Yup.ref('password')], 'Пароли не совпадают!')
                    })}
                    onSubmit = {(values, {resetForm} ) => {
                        updatePassword(values);
                        resetForm();
                    }}>
                        <Form className='reg_auth_form'>
                            <p>У вас установлен временный пароль. Необходимо его сменить на новый.</p>
                            <div className="form_input">
                                <MyTextInput
                                    label='Новый пароль'
                                    id="password"
                                    name="password"
                                    type="password"
                                />
                            </div>
                            <div className="form_input">
                                <MyTextInput
                                    label='Повторите пароль'
                                    id="repeatPassword"
                                    name="repeatPassword"
                                    type="password"
                                />
                            </div>
                            {submitBtn()}
                            {succesRegMes()}
                        </Form>
                </Formik>
            </div>
        </div>
        
    )
}

export default UpdatePassword;