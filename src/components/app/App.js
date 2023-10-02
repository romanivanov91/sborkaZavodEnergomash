import HeaderOrder from '../order/headerOrder/HeaderOrder';
import OrderAdd from '../order/orderAdd/OrderAdd';
import SearchPanel from '../order/searchPanel/SearchPanel';
import OrderList from '../order/orderList/OrderList';
import ProdAddModal from '../order/prodAddModal/ProdAddModal';
import UserRegAuth from '../userRegAuth/UserRegAuth';
import Header from '../header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { autorisationUser } from "../../actions/index";
import { useEffect } from 'react';
import { useHttp } from "../../hooks/http.hook";

import './App.css';

function App() {

  const { showModal } = useSelector(state => state);

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
      })
      .catch(error => console.log(error));
    } 
}, []);

  const modal = (arg) => {
    if (arg) {
      return <ProdAddModal/>
    }
  }

  return (
    <div className="App">
      <Header />
      <UserRegAuth />
      {modal(showModal)}
      <HeaderOrder />
      <OrderAdd />
      <SearchPanel />
      <OrderList />
    </div>
  );
}

export default App;
