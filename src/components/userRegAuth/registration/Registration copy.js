
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import { useHttp } from "../../../hooks/http.hook";

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

    const {request} = useHttp();

    const addUser = (e, values) => {
        console.log('форма сработала');
        e.preventDefault();

        request('http://localhost:8000/sborkaZavodEnergomash/api/create_user.php', 'POST', JSON.stringify(values, null, 2))
        .then(res => console.log(res, 'Отправка успешна'))
        .catch(error => console.log(error));
    }

    return (
        <Formik
        initialValues = {{
            name: '',
            firstName: '',
            patronymic: '',
            position: '',
            email: '',
            password: '',
            repeatPassword: ''
        }}
        validationSchema = {Yup.object({
            name: Yup.string()
                    .min(2, 'Минимум 2 символа!')
                    .required('Обязательное поле!'),
            firstName: Yup.string()
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
            password: Yup.yup.string('Введите пароль!')
                    .required()
                    .min(7)
                    .max(255),
            repeatPassword: Yup.string()
                    .required('Введите пароль повторно!')
                    .when('password', (password, schema) => {
                        return schema.test({
                            test: (passwordRepeat) => password === passwordRepeat,
                            message: 'Пароли не совпадают',
                        });
                    }),
        })}
        onSubmit = {(e,values) => addUser(e, values)}
        >
            <Form className='reg_auth_form'>

                <div className="form_input">
                    <p>Имя: </p>
                    <MyTextInput
                    label='Ваше имя'
                    id="name"
                    name="name"
                    type="text"
                    />
                </div>

                <h2>Отправить пожертвование</h2>
                <MyTextInput
                    className='reg_auth_form'
                    label='Ваше имя'
                    id="name"
                    name="name"
                    type="text"
                />
                <MyTextInput
                    className='reg_auth_form'
                    label='Ваша почта'
                    id="email"
                    name="email"
                    type="email"
                />
                <label htmlFor="amount">Количество</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error" name="amount" component="div"/>
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className="error" name="currency" component="div"/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className="error" name="text" component="div"/>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default Registration;