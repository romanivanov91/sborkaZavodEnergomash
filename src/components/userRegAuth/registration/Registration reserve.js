import { useHttp } from "../../../hooks/http.hook";
import { useState } from "react";

const Registration = () => {

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const {request} = useHttp();

    const addUser = (e) => {
        console.log('форма сработала');
        e.preventDefault();

        if (password === repeatPassword) {
            const objectUser = {
                lastname: lastName,
                firstname: firstName,
                patronymic: patronymic,
                position: position,
                email: email,
                password: password
            };

            request('http://localhost:8000/sborkaZavodEnergomash/api/create_user.php', 'POST', JSON.stringify(objectUser))
            .then(res => console.log(res, 'Отправка успешна'))
            .catch(error => console.log(error));
            //Очищаем форму после отправки
            setLastName('');
            setFirstName('');
            setPatronymic('');
            setPosition('');
            setEmail('');
            setPassword('');
            setRepeatPassword('');
        } else {
            console.log('Пароли не совпадают');
        }
    }

    

    return (
            <form 
                className='reg_auth_form'
                onSubmit={addUser}>
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
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    <input 
                        type="password" 
                        placeholder="Повторите пароль"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}/>
                </div>
                <input className='form_submit' type="submit" value='Зарегистрироваться'/>
            </form>
        )
}

export default Registration;