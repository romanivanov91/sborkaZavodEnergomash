
import { useState } from "react";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useHttp } from "../../../hooks/http.hook";
import BarLoader from "react-spinners/BarLoader";

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

const Registration = () => {

    const [spinner, setSpinner] = useState(false);
    const [errorReg, setErrorReg] = useState(false);
    const [succesRegMesageState, setSuccesRegMesageState] = useState(false);

    const {request} = useHttp();

    const addUser = (values) => {
        setSpinner(true);
        request('http://localhost:8000/sborkaZavodEnergomash/api/create_user.php', 'POST', JSON.stringify(values, null, 2))
        .then(res => {
            console.log(res, 'Отправка успешна');
            setSpinner(false);
            setSuccesRegMesageState(true);
            setTimeout(() => {
                setSuccesRegMesageState(false)
            }, 10000);
        })
        .catch(error => {
            console.log(error);
            setSpinner(false);
            setErrorReg(true);
        });
    }

    const errorMessage = () => { 
        return (
            <div className="errorMessage">
                <div>
                    <p>Ошибка регистрации</p>
                </div>
            </div>
        )
    }

    const succesRegMes = () => {
        if (succesRegMesageState) {
        return (
            <div className="succesMes">
                <div>
                    <p>Вы успешно зарегистрированы!</p>
                    <p>Войдите через форму авторизации.</p>
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
                    value='Зарегистрироваться'/>
                    {errorReg ? errorMessage(): null}
                </div>
                )
        }
    }

    return (
        <Formik
        initialValues = {{
            lastname: '',
            firstname: '',
            patronymic: '',
            position: '',
            email: '',
            password: '',
            repeatPassword: ''
        }}
        validationSchema = {Yup.object({
            lastname: Yup.string()
                    .min(2, 'Минимум 2 символа!')
                    .required('Обязательное поле!'),
            firstname: Yup.string()
                    .min(2, 'Минимум 2 символа!')
                    .required('Обязательное поле!'),
            patronymic: Yup.string()
                    .min(2, 'Минимум 2 символа!')
                    .required('Обязательное поле!'),
            position: Yup.string()
                    .min(2, 'Минимум 2 символа!')
                    .required('Обязательное поле!'),
            email: Yup.string()
                    .email('Неправильный email адрес!')
                    .required('Обязательное поле!'),
            password: Yup.string('Введите пароль!')
                    .required('Введите пароль')
                    .min(7, 'Минимум 7 символов')
                    .max(255, 'Превышение максимального колличества символов 255'),
            repeatPassword: Yup.string()
                    .required('Введите пароль повторно!')
                    .oneOf([Yup.ref('password')], 'Пароли не совпадают!')
        })}
        onSubmit = {(values, {resetForm} ) => {
            addUser(values);
            resetForm();
        }}
        >
            <Form className='reg_auth_form'>

                <div className="form_input">
                    <MyTextInput
                    label='Имя'
                    id="lastname"
                    name="lastname"
                    type="text"
                    />
                </div>

                <div className="form_input">
                    <MyTextInput
                    label='Фамилия'
                    id="firstname"
                    name="firstname"
                    type="text"
                    />
                </div>

                <div className="form_input">
                    <MyTextInput
                    label='Отчество'
                    id="patronymic"
                    name="patronymic"
                    type="text"
                    />
                </div>

                <div className="form_input">
                    <MyTextInput
                    label='Должность'
                    id="position"
                    name="position"
                    type="text"
                    />
                </div>

                <div className="form_input">
                    <MyTextInput
                        className='form_input'
                        label='Ваша почта'
                        id="email"
                        name="email"
                        type="email"
                    />
                </div>

                <div className="form_input">
                    <MyTextInput
                    label='Пароль'
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
    )
}

export default Registration;