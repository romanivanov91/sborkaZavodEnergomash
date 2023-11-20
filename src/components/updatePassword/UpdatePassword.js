import { useState } from "react";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useHttp } from "../../hooks/http.hook";
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

const UpdatePassword = () => {

    const [spinner, setSpinner] = useState(false);
    const [errorUpdatePassword, setErrorUpdatePassword] = useState(false);
    const [succesUpdatePasswordMesageState, setSuccesUpdatePasswordMesageState] = useState(false);

    const {request} = useHttp();

    const updatePassword = (values) => {
        setSpinner(true);
        request('http://localhost:8000/sborkaZavodEnergomash/api/update_user.php', 'POST', JSON.stringify(values, null, 2))
        .then(res => {
            console.log(res, 'Отправка успешна');
            setSpinner(false);
            setSuccesUpdatePasswordMesageState(true);
            setTimeout(() => {
                setSuccesUpdatePasswordMesageState(false)
            }, 10000);
        })
        .catch(error => {
            console.log(error);
            setSpinner(false);
            setSuccesUpdatePasswordMesageState(false)
            setErrorUpdatePassword(true);
        });
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
                    value='Зарегистрироваться'/>
                    {errorUpdatePassword ? errorMessage(): null}
                </div>
                )
        }
    }

    return (
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
        }}
        >
            <Form className='reg_auth_form'>
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

export default UpdatePassword;