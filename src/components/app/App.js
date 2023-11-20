import ProdAddModal from '../prodAddModal/ProdAddModal';
import UserRegAuth from '../userRegAuth/UserRegAuth';
import Header from '../header/Header';
import Orders from '../order/Orders';
import UserAuthorisation from '../userauthorisation/Userauthorisation';
import UpdatePassword from '../updatePassword/UpdatePassword';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { autorisationUser, updateUserPass } from "../../actions/index";
import { useHttp } from "../../hooks/http.hook";

//import './Reset.css';
import './App.css';

function App() {

  const {showModal} = useSelector(state => state);
  const {updateUserPassFormState} = useSelector(state=>state);
  const userAutorisation = useSelector(state=>state.userAutorisation);

  const dispatch = useDispatch();

  const {request} = useHttp();

  const jwtCookie = document.cookie.match(/jwt=(.+?)(;|$)/);

  useEffect(() => {
    if (document.cookie.match(/jwt=(.+?)(;|$)/)) {

      const jwt = {
        jwt: jwtCookie[1]
      };

      console.log(jwtCookie[1]);

      request('http://localhost:8000/sborkaZavodEnergomash/api/validate_token.php', 'POST', JSON.stringify(jwt))
      .then(res => {
          console.log(res, 'Отправка успешна');
          dispatch(autorisationUser(res.data));
          console.log(res.data.TempPass);
          if (res.data.TempPass === 1) {
            dispatch(updateUserPass(true));
          } else {
            dispatch(updateUserPass(false));
          }
      })
      .catch(error => console.log(error));
    } 
}, []);

  const modal = (arg) => {
    if (arg) {
      return <ProdAddModal/>
    }
  }

  const Profile = () => {
    if (userAutorisation) {
      console.log(updateUserPassFormState);
      if (updateUserPassFormState) {
        return <UpdatePassword/>
      } else {
        return <UserAuthorisation/>
      }
    }
    return <UserRegAuth/>
  }

  return (
    <div className="App">
      {modal(showModal)}
      <Header />
      <Profile/>
      <Orders/>
    </div>
  );
}

export default App;
