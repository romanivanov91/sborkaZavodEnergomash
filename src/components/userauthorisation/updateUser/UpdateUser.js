import { useHttp } from "../../../hooks/http.hook";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, autorisationUser } from "../../../actions/index";

const UpdateUserForm = (user) => {

    const [lastName, setLastName] = useState(user.lastname);
    const [firstName, setFirstName] = useState(user.firstname);
    const [patronymic, setPatronymic] = useState(user.patronymic);
    const [position, setPosition] = useState(user.position);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');

    const {request} = useHttp();

    const dispatch = useDispatch();

    const jwtCookie = document.cookie.match(/jwt=(.+?)(;|$)/);
    console.log(jwtCookie);

    console.log(user.email);

    const updateUserForm = (e) => {
        console.log("Форма сработала");
        e.preventDefault();

        const objectUser = {
            lastname: lastName,
            firstname: firstName,
            patronymic: patronymic,
            position: position,
            email: email,
            password: password,
            id: user.id,
            jwt: jwtCookie[1]
        };

        console.log(objectUser);

        request('http://localhost:8000/sborkaZavodEnergomash/api/update_user.php', 'POST', JSON.stringify(objectUser))
        .then(res => {
            console.log(res, 'Отправка успешна');
            document.cookie = `jwt=${res.jwt}`;
            dispatch(autorisationUser(res.data));

        })
        .then(dispatch(updateUser()))
        .catch(error => console.log(error));
    }

    return (
        <form 
            className='update_form'
            onSubmit={updateUserForm}>
            <div className="form_input">
                <p>Имя: </p>
                <input 
                    type="text" 
                    placeholder="Введите имя"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}/> 
            </div>
            <div className="form_input">
                <p>Фамилия: </p>
                <input 
                    type="text" 
                    placeholder="Введите фамилию"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    /> 
            </div>
            <div className="form_input">
                <p>Отчество: </p>
                <input 
                    type="text" 
                    placeholder="Введите отчество"
                    value={patronymic}
                    onChange={(e) => setPatronymic(e.target.value)}/> 
            </div>
            <div className="form_input">
                <p>Ваша должность: </p>
                <input 
                type="text" 
                placeholder="Введите должность"
                value={position}
                onChange={(e) => setPosition(e.target.value)}/> 
            </div>
            <div className="form_input">
                <p>Адрес электронной почты: </p>
                <input 
                    type="email" 
                    placeholder="Введите email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/> 
            </div>
            <div className="form_input"> 
                <p>Пароль: </p>
                <input 
                    type="password" 
                    placeholder="Введите новый пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="form_update_btn">
                <input className='form_update_input' type="submit" value='Внести изменения'/>
                <input 
                    className='form_update_input' 
                    type="button" 
                    value='Отмена'
                    onClick={() => dispatch(updateUser())}/>
            </div>
        </form>
        )
};

export default UpdateUserForm;