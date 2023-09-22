import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { autorisationUser } from "../../actions/index";
import Autorisation from './authorisation/Authorisation';
import Registration from './registration/Registration';
import { CookiesDelete } from '../../function/CookiesDelete';

import './UserRegAuth.css';

const UserRegAuth = () => {

    const [stateRegAuth, setStateRegAuth] = useState('reg');

    const user = useSelector(state=>state.user);

    const dispatch = useDispatch();

    const Regauth = () => {
        return (
            <>
            <div className='userRegAuth_body_choiceRegAuth'>
                <h2 
                    className = {stateRegAuth === 'reg' ? 'active_choiceRegAuth' : ''}
                    onClick = {() => setStateRegAuth('reg')}>
                    Регистрация
                </h2>
                <h2 
                    className = {stateRegAuth !== 'reg' ? 'active_choiceRegAuth' : ''}
                    onClick={() => setStateRegAuth('')}>
                    Войти
                </h2>
            </div>
            {stateRegAuth === 'reg' ? <Registration /> : <Autorisation />}
            </>
            )
    }

    const exit = () => {
        // localStorage.clear();
        CookiesDelete();
        dispatch(autorisationUser({}));
    }

    const Userauthorisation = () => {
        return (
            <>
                <p>{user.lastname}</p>
                <p>{user.firstname}</p>
                <p>{user.patronymic}</p>
                <p>{user.position}</p>
                <button onClick={exit}>Выйти</button>
            </>
            )
    }



    return (
        <div className='userRegAuth_body'>
            {Object.entries(user).length === 0 ? <Regauth/> : <Userauthorisation/>}
        </div>
        )
}

export default UserRegAuth;