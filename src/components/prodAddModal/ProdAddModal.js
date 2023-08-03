import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../actions';
import {useHttp} from '../../hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';

import './ProdAddModal.css';

const ProdAddModal = () => {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [ingener, setIngener] = useState('');
    const [supplier, setSupplier] = useState('');
    const [installationOfCabinets, setInstallationOfCabinets] = useState('');
    const [brigade, setBrigade] = useState('');
    const [shipment, setShipment] = useState('');

    const {activeOrder} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    console.log(activeOrder);

    const clickOutsideForm = (e) => {
        if (e.target.className === 'prodAddModal') {
            dispatch(showModal())
        }
    }

    const addProduct = (e) => {
        e.preventDefault();
        const objectProduct = {
            id: uuidv4(),
            name: name,
            quantity: quantity,
            ingener: ingener,
            supplier: supplier,
            installationOfCabinets: installationOfCabinets,
            brigade: brigade,
            shipment: shipment
        }
        request(`http://localhost:3001/orders/${activeOrder}/products`, 'PATCH', JSON.stringify(objectProduct))
        .then(res => console.log(res, 'Отправка успешна'))
        //.then(dispatch(heroCreated(objectHero)))
        .catch(error => console.log(error));
        //Очищаем форму после отправки
        setName('');
        setQuantity('');
        setIngener('');
        setSupplier('');
        setInstallationOfCabinets('');
        setBrigade('');
        setShipment('');
    }
    
    return (
        <div 
            className='prodAddModal'
            onClick={(e)=>clickOutsideForm(e)}
            >
           <div className='prodAddModal_body'>
                <div>
                    <h3>Заказ №{activeOrder}</h3>
                </div>
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
                <input 
                    className='close_modal' 
                    type='button' 
                    value='Закрыть'
                    onClick={()=>dispatch(showModal())}>

                    </input>
           </div>
        </div>
    )
};

export default ProdAddModal;