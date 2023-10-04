import { useSelector, useDispatch } from 'react-redux';
import { autorisationUser, updateUser } from "../../actions/index";
import { CookiesDelete } from '../../function/CookiesDelete';
import UpdateUserForm from '../userauthorisation/updateUser/UpdateUser';

import './Userauthorisation.css';
 
 const UserAuthorisation = () => {

    const user = useSelector(state=>state.user);
    const updateUserFormState = useSelector(state=>state.updateUserFormState);

    const dispatch = useDispatch();

    const exit = () => {
        // localStorage.clear();
        CookiesDelete();
        dispatch(autorisationUser({}));
    }

    const ViewUserProfile = () => {
        if (updateUserFormState) {
            return <UpdateUserForm
                    {...user}/>
        } else {
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
    }

        return (
            <ViewUserProfile/>
            )
    }

export default UserAuthorisation;