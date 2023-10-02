import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { autorisationUser, updateUser } from "../../actions/index";
import Autorisation from './authorisation/Authorisation';
import Registration from './registration/Registration';
import UpdateUserForm from './updateUser/UpdateUser';
import { CookiesDelete } from '../../function/CookiesDelete';

import './UserRegAuth.css';

const UserRegAuth = () => {

    const [stateRegAuth, setStateRegAuth] = useState('reg');

    const user = useSelector(state=>state.user);
    const updateUserFormState = useSelector(state=>state.updateUserFormState);

    const dispatch = useDispatch();

    const exit = () => {
        // localStorage.clear();
        CookiesDelete();
        dispatch(autorisationUser({}));
    }

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

    const Userauthorisation = () => {
        return (
            <>
                <p>{user.lastname}</p>
                <p>{user.firstname}</p>
                <p>{user.patronymic}</p>
                <p>{user.position}</p>
                <button onClick={() => dispatch(updateUser())}>Редактировать профиль</button>
                <button onClick={exit}>Выйти</button>
            </>
            )
    }

    const UpdateUser = () => {
        console.log(updateUserFormState);
        if (updateUserFormState) {
            return <UpdateUserForm
                    {...user}/>
        } else {
            return <Userauthorisation/>
        }
    }

    return (
        <div className='userRegAuth_body'>
            {Object.entries(user).length === 0 ? <Regauth/> : <UpdateUser/>}
        </div>
        )
}

export default UserRegAuth;