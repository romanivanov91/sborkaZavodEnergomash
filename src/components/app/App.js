import Header from '../header/Header';
import OrderAdd from '../orderAdd/OrderAdd';
import SearchPanel from '../searchPanel/SearchPanel';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <OrderAdd />
      <SearchPanel />
    </div>
  );
}

export default App;
