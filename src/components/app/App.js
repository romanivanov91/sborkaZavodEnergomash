import Header from '../header/Header';
import OrderAdd from '../orderAdd/OrderAdd';
import SearchPanel from '../searchPanel/SearchPanel';
import OrderList from '../orderList/OrderList';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <OrderAdd />
      <SearchPanel />
      <OrderList />
    </div>
  );
}

export default App;
