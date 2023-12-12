import ProdAddModal from '../prodAddModal/ProdAddModal';
import UserRegAuth from '../userRegAuth/UserRegAuth';
import Header from '../header/Header';
import Orders from '../order/Orders';
import UserAuthorisation from '../userauthorisation/Userauthorisation';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { autorisationUser, updateUserPass, saveUser } from "../../actions/index";
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
    request('http://localhost:8000/sborkaZavodEnergomash/api/create_db.php', 'GET')
    .then(res => console.log(res))
    .catch(error => console.log(error))
    if (document.cookie.match(/jwt=(.+?)(;|$)/)) {

      const jwt = {
        jwt: jwtCookie[1]
      };

      dispatch(saveUser(true));

      console.log(jwtCookie[1]);

      request('http://localhost:8000/sborkaZavodEnergomash/api/validate_token.php', 'POST', JSON.stringify(jwt))
      .then(res => {
          if (res.data.tempPass === 1) {
            dispatch(updateUserPass(true));
          } else {
            dispatch(updateUserPass(false));
          }
          const user = {
            ...res.data,
            jwt: jwtCookie[1]
          }
          console.log(user);
          dispatch(autorisationUser(user));
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
        return <UserAuthorisation/>
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
