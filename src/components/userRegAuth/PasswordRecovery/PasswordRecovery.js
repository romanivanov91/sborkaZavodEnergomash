import { useHttp } from "../../../hooks/http.hook";
import { useState, useRef, useEffect } from "react";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import BarLoader from "react-spinners/BarLoader";
import { useDispatch, useSelector } from "react-redux";
import { recUserPass } from "../../../actions/index"

const PasswordRecovery = () => {

    const [spinner, setSpinner] = useState(false);
    const [errorUser, setErrorUser] = useState(false);
    const [succesRegMesageState, setSuccesRegMesageState] = useState(false);

    const dispatch = useDispatch();

    const refError = useRef(null);

    const {request} = useHttp();

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

    const recPass = (values) => {
        console.log(values);
        setSpinner(true);
        request('http://localhost:8000/sborkaZavodEnergomash/api/password_recovery.php', 'POST', JSON.stringify(values, null, 2))
        .then(res => {
            console.log(res, 'Отправка успешна');
            setSpinner(false);
            setSuccesRegMesageState(true);
            setErrorUser(false);
        })
        .catch(error => {
            console.log(error);
            setSpinner(false);
            setSuccesRegMesageState(false);
            setErrorUser(true);
        });
    }

    const errorMessage = () => {
        return (
            <div className="errorMessage" ref={refError}>
                <div>
                    <p>Пользователь не найден!</p>
                </div>
            </div>
            )
    }

    const succesRegMes = () => {
        if (succesRegMesageState) {
        return (
            <div className="succesMes">
                <div>
                    <p>Новый пароль выслан вам на почту!</p>
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
                        value='Запросить новый пароль'/>
                    {errorUser ? errorMessage(): null}

                </div>
                )
        }
    }

    return (
        <Formik
        initialValues = {{
            email: ''
        }}
        validationSchema = {Yup.object({
            email: Yup.string()
                    .email('Неправильный email адрес!')
                    .required('Обязательное поле!')
        })}
        onSubmit = {values => {
            recPass(values);
        }}
        >
            <Form className='reg_auth_form'>
                <div className="form_input">
                    <MyTextInput
                        label='Ваша почта'
                        id="email"
                        name="email"
                        type="email"
                    />
                </div>
                {submitBtn()}
                {succesRegMesageState ? succesRegMes(): null}
                <p
                    className="regAutBtn"
                    onClick={() => dispatch(recUserPass(false))}>
                    Перейти в форму регистации/авторизации.
                </p>
            </Form>
        </Formik>
        )

}

export default PasswordRecovery;