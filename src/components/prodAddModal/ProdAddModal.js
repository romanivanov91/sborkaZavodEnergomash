import { useDispatch, useSelector } from 'react-redux';

import './ProdAddModal.css';

const ProdAddModal = () => {
    
    return (
        <div className='prodAddModal'>
           <div className='prodAddModal_body'>
                <form>
                    <div>
                        <label>Наименование</label>
                        <input type='text'></input>
                    </div>
                    <div>
                        <label>Колличество</label>
                        <input type='number'></input>
                    </div>
                    <div>
                        <label>Конструктор</label>
                        <input type='text'></input>
                    </div>
                    <div>
                        <label>Снабжение отв.</label>
                        <input type='text'></input>
                    </div>
                    <div>
                        <label>Монтаж шкафов</label>
                        <input type='text'></input>
                    </div>
                    <div>
                        <label>Бригада</label>
                        <input type='text'></input>
                    </div>
                    <div>
                        <label>Отгрузка</label>
                        <input type='text'></input>
                    </div>
                    <div>
                        <input 
                            type='submit'
                            value='Добавить продукцию'>
                        </input>
                    </div>
                </form>
                <input className='close_modal' type='button' value='Закрыть'></input>
           </div>
        </div>
    )
};

export default ProdAddModal;