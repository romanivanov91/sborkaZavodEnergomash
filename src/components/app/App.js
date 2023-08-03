import Header from '../header/Header';
import OrderAdd from '../orderAdd/OrderAdd';
import SearchPanel from '../searchPanel/SearchPanel';
import OrderList from '../orderList/OrderList';
import ProdAddModal from '../prodAddModal/ProdAddModal';
import { useSelector } from 'react-redux';

import './App.css';

function App() {

  const { showModal } = useSelector(state => state)

  const modal = (arg) => {
    if (arg) {
      console.log('Сработал');
      return <ProdAddModal/>
    }
  }


  return (
    <div className="App">
      {modal(showModal)}
      <Header />
      <OrderAdd />
      <SearchPanel />
      <OrderList />
    </div>
  );
}

export default App;
