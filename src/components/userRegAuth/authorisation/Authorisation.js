import { useHttp } from "../../../hooks/http.hook";
import { useState, useRef, useEffect } from "react";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import BarLoader from "react-spinners/BarLoader";
import { useDispatch, useSelector } from "react-redux";
import { autorisationUser, recUserPass, updateUserPass } from "../../../actions/index"

const Autorisation = () => {

    const [spinner, setSpinner] = useState(false);
    const [errorAuth, setErrorAuth] = useState(false);

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

    const {request} = useHttp();

    const dispatch = useDispatch();

    const refError = useRef(null);

    //Эффект для фиксации клика вне сообщения об ошибке, для удаления этой ошибки
    useEffect(() => {
        // Функция удаления сообщения об ошибке, если клик был вне ее
        const handleOutsideClick = (e) => {
          if (refError.current && !refError.current.contains(e.target)) {
              setErrorAuth(false);
          }
        }
        // Обрабочик событмя на весь DOM
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
      }, [refError]);

    const authUser = (values) => {
        setSpinner(true);
        request('http://localhost:8000/sborkaZavodEnergomash/api/login.php', 'POST', JSON.stringify(values, null, 2))
        .then(res => {
            console.log(res, 'Отправка успешна');
            return res;
        })
        .then(res => {
            if (values.toggle) {
                document.cookie = `jwt=${res.jwt}`;
            }
            const user = {
                id: res.id,
                lastname: res.lastname,
                firstname: res.firstname,
                patronymic: res.patronymic,
                position: res.position,
                email: res.email,
                jwt: res.jwt,
                TempPass: res.TempPass
            }
            dispatch(autorisationUser(user));
            if (res.data.TempPass === 1) {
                dispatch(updateUserPass(true));
              } else {
                dispatch(updateUserPass(false));
              }
            setSpinner(false);
        })
        .catch(error => {
            console.log(error);
            setSpinner(false);
            setErrorAuth(true);
        });
    }

    const errorMessage = () => {
        return (
            <div className="errorMessage" ref={refError}>
                <div>
                    <p>Пользователь не найден или неверный пароль</p>
                </div>
            </div>
            )
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
                    value='Войти'/>
                    {errorAuth ? errorMessage(): null}
                </div>
                )
        }
    }

    return (
        <Formik
        initialValues = {{
            email: '',
            password: '',
            toggle: false
        }}
        validationSchema = {Yup.object({
            email: Yup.string()
                    .email('Неправильный email адрес!')
                    .required('Обязательное поле!'),
            password: Yup.string('Введите пароль!')
                    .required('Введите пароль')
        })}
        onSubmit = {values => {
            authUser(values);
        }}
        >
            <Form className='reg_auth_form'>
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
                <div>
                <MyTextInput
                    label='Запомнить меня'
                    id="password"
                    name="toggle"
                    type="checkbox" 
                    />
                </div>
                {submitBtn()}
                <p
                    className="recPassBtn"
                    onClick={() => dispatch(recUserPass(true))}>
                    Забыли пароль?
                </p>
            </Form>
        </Formik>
    )
}

export default Autorisation;