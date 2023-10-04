
import { useSelector, useDispatch } from 'react-redux';

import './Header.css';
import logo from '../../resources/img/Logo.png'

const Header = () => {

    const user = useSelector(state=>state.user);
    const userAutorisation = useSelector(state=>state.userAutorisation);

    const profile = () => {
        if (userAutorisation) {
            return (
                <p>{user.firstname} {user.lastname} {user.patronymic}</p>
                )
        } else {
            return (
                <p>Войти/Зарегестрироваться</p>
                )
        }
    }

    return (
        <div className = 'header'>
            <div className = 'logo'>
                <img src={logo} alt="Логотип"/>
            </div>
            <div className = 'nav'>
                <ul>
                    <li>Заказы</li>
                    <li>Металлообработка</li>
                    <li>КТП</li>
                </ul>
            </div>
            <div className = 'userName'>
                {profile()}
            </div>
        </div>
        )

}

export default Header;