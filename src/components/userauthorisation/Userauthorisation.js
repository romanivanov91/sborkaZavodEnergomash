import { useSelector, useDispatch } from 'react-redux';
import { autorisationUser, updateUser,  updateUserPass } from "../../actions/index";
import { CookiesDelete } from '../../function/CookiesDelete';
import UpdateUserForm from '../userauthorisation/updateUser/UpdateUser';
import UpdatePassword from './updatePassword/UpdatePassword';

import './Userauthorisation.css';
 
const UserAuthorisation = () => {

    const user = useSelector(state=>state.user);
    const updateUserFormState = useSelector(state=>state.updateUserFormState);
    const {updateUserPassFormState} = useSelector(state=>state);

    const dispatch = useDispatch();

    const exit = () => {
        // localStorage.clear();
        CookiesDelete();
        dispatch(autorisationUser({}));
    }

    const ViewUserProfile = () => {
        if (updateUserPassFormState) {
            return <UpdatePassword/>
        } else {
            if (updateUserFormState) {
                return <UpdateUserForm
                        {...user}/>
            } else {
                return (
                    <>
                        <div className='profile'>
                            <div className="profile_el">
                                <p>Имя: {user.lastname}</p>
                            </div>
                            <div className="profile_el">
                                <p>Фамилия: {user.firstname}</p>
                            </div>
                            <div className="profile_el">
                                <p>Отчество: {user.patronymic}</p>
                            </div>
                            <div className="profile_el">
                                <p>Ваша должность: {user.position}</p>
                            </div>
                            <div className="profile_el">
                                <p>Адрес электронной почты: {user.email}</p>
                            </div>    
                            <div className='profile_btn'>
                                <button
                                    onClick={() => dispatch(updateUser())}>
                                        Редактировать профиль
                                </button>
                                <button
                                    onClick={exit}>
                                        Выйти
                                </button>   
                            </div>               
                        </div>
                        
                    </>
                )
            }      
        }
    }

    return (
        <div className='userProfile_body'>
                <ViewUserProfile/>
        </div>
    )
}

export default UserAuthorisation;