import { useHttp } from "../../../hooks/http.hook";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autorisationUser } from "../../../actions/index"

const Autorisation = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {request} = useHttp();

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    console.log(user);

    const authUser = (e) => {
        console.log('форма сработала');
        e.preventDefault();
        const objectUser = {
            email: email,
            password: password
        };

        request('http://localhost:8000/sborkaZavodEnergomash/api/login.php', 'POST', JSON.stringify(objectUser))
        .then(res => {
            console.log(res, 'Отправка успешна');
            return res;
        })
        .then(res => {
            dispatch(autorisationUser(res));
        })
        .catch(error => console.log(error));
        //Очищаем форму после отправки
        setEmail('');
        setPassword('');
    }

    return (
        <form 
            className='freg_auth_form'
            onSubmit={authUser}>
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
            </div>
            <div className="form_check">
                    <input type="checkbox" placeholder="Запомнить меня"/>
                    <p>Запомнить меня</p>
            </div>
                <input 
                    className='form_submit' type="submit" value='Войти'/>
        </form>
    )
}

export default Autorisation;