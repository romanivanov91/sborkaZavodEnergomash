import { useHttp } from "../../../hooks/http.hook";
import { useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, autorisationUser } from "../../../actions/index";
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

const UpdateUserForm = (user) => {

    const [spinner, setSpinner] = useState(false);
    const [errorUpdate, setErrorUpdate] = useState(false);
    const [succesUpdateMesageState, setSuccesUpdateMesageState] = useState(false);
    const [disabled, setDisabled] = useState('');
    const [btnDis, setBtnDis] = useState('')

    const { saveMee } = useSelector(state => state);

    const {request} = useHttp();

    const dispatch = useDispatch();

    const submitBtnClass = "submitBtn " + btnDis;

    const updateUserForm = (values) => {
        setSpinner(true);
        setDisabled('disabled');
        setBtnDis('btnBlock');
        const object = {
            ...values,
            id: user.id,
            jwt: user.jwt,
            email: user.email
        }
        console.log(object);
        request('http://localhost:8000/sborkaZavodEnergomash/api/update_user.php', 'POST', JSON.stringify(object, null, 2))
        .then(res => {
            console.log(res, 'Отправка успешна');
            setSpinner(false);
            setDisabled('');
            setBtnDis('');
            if (saveMee) {
                document.cookie = `jwt=${res.jwt}`;
            };
            setSuccesUpdateMesageState(true);
            dispatch(autorisationUser(res.data));
            dispatch(updateUser());
        })
        .catch(error => {
            console.log(error);
            setSpinner(false);
            setSuccesUpdateMesageState(false);
            setErrorUpdate(true);
        });
    }

    const errorMessage = () => { 
        return (
            <div className="errorMessage">
                <div>
                    <p>Произошла ошибка! Данные не изменены</p>
                </div>
            </div>
        )
    }

    const succesUpdateMes = () => {
        if (succesUpdateMesageState) {
        return (
            <div className="succesMes">
                <div>
                    <p>Изменения испешно внесены</p>
                </div>
            </div>
            )
        }
    }

    const submitBtn = () => {
        if (spinner) {
            return (
                <div className='form_update_spinner'>
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
                        value='Внести изменения'/>
                    {errorUpdate ? errorMessage(): null}
                </div>
                )
        }
    }

    return (
        <Formik
            initialValues={{
                lastname: user.lastname,
                firstname: user.firstname,
                patronymic: user.patronymic,
                position: user.position
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
                        .required('Обязательное поле!')
            })}
            onSubmit = {(values) => updateUserForm(values)}
        >
            <Form className='update_form'>
                <div className="form_input">
                    <MyTextInput
                        label='Имя'
                        placeholder="Введите имя"
                        id="lastname"
                        name="lastname"
                        type="text"
                    /> 
                </div>
                <div className="form_input">
                    <MyTextInput
                        label='Фамилия'
                        placeholder="Введите фамилию"
                        id="firstname"
                        name="firstname"
                        type="text"
                    /> 
                </div>
                <div className="form_input">
                    <MyTextInput
                        label='Отчество'
                        placeholder="Введите отчество"
                        id="patronymic"
                        name="patronymic"
                        type="text"
                    /> 
                </div>
                <div className="form_input">
                    <MyTextInput
                        label='Ваша должность'
                        placeholder="Выберете должность"
                        id="position"
                        name="position"
                        type="text"
                    /> 
                </div>
                <div className="form_update_btn">
                    {submitBtn()}
                    <input 
                        className={submitBtnClass}
                        disabled={disabled} 
                        type="button" 
                        value='Отмена'
                        onClick={() => dispatch(updateUser())}/>
                </div>
                {succesUpdateMes()} 
            </Form>
        </Formik>
        )
};

export default UpdateUserForm;