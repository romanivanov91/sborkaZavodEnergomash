import { useState } from 'react';
import Autorisation from './authorisation/Authorisation';
import Registration from './registration/Registration';

import './UserRegAuth.css';

const UserRegAuth = () => {

    const [stateRegAuth, setStateRegAuth] = useState('reg');

    return (
        <div className='userRegAuth_body'>
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
        </div>
        )
}

export default UserRegAuth;