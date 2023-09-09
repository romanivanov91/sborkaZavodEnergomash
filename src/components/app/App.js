import HeaderOrder from '../order/headerOrder/HeaderOrder';
import OrderAdd from '../order/orderAdd/OrderAdd';
import SearchPanel from '../order/searchPanel/SearchPanel';
import OrderList from '../order/orderList/OrderList';
import ProdAddModal from '../order/prodAddModal/ProdAddModal';
import UserRegAuth from '../userRegAuth/UserRegAuth';
import Header from '../header/Header';
import { useSelector } from 'react-redux';

import './App.css';

function App() {

  const { showModal } = useSelector(state => state)

  const modal = (arg) => {
    if (arg) {
      return <ProdAddModal/>
    }
  }


  return (
    <div className="App">
      <Header />
      <UserRegAuth />
      {/* {modal(showModal)}
      <HeaderOrder />
      <OrderAdd />
      <SearchPanel />
      <OrderList /> */}
    </div>
  );
}

export default App;
