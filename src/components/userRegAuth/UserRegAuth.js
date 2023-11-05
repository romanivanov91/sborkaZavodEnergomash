import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { autorisationUser } from "../../actions/index";
import Autorisation from './authorisation/Authorisation';
import Registration from './registration/Registration';
import PasswordRecovery from './PasswordRecovery/PasswordRecovery'
import { CookiesDelete } from '../../function/CookiesDelete';

import './UserRegAuth.css';

const UserRegAuth = () => {

    const [stateRegAuth, setStateRegAuth] = useState('reg');

    const user = useSelector(state=>state.user);
    const updateUserFormState = useSelector(state=>state.updateUserFormState);
    const errorUserPass = useSelector(state => state.errorUserPass);

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

    const RecPass = () => {
        return (
            <>
                <div className='userRegAuth_body_choiceRegAuth'>
                    <h2 className='active_choiceRegAuth'>
                        Востановление пароля
                    </h2>
                </div>
                <PasswordRecovery />
            </>
            )
    }

    return (
        <div className='userRegAuth_body'>
            {errorUserPass ? <RecPass/> : <Regauth/>}
        </div>
        )
}

export default UserRegAuth;