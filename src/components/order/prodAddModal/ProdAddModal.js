import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, productFormAdd, activeProduct as ap, productFormUpdate } from '../../../actions';
import {useHttp} from '../../../hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';

import './ProdAddModal.css';

const ProdAddModal = () => {

    const {activeOrder, activeProduct} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [ingener, setIngener] = useState('');
    const [supplier, setSupplier] = useState('');
    const [installationOfCabinets, setInstallationOfCabinets] = useState('');
    const [brigade, setBrigade] = useState('');
    const [shipment, setShipment] = useState('');

    const [btnText, setBtnText] = useState('Добавить продукцию');

    useEffect(() => {
        if (Object.entries(activeProduct).length !== 0) {
            console.log(activeProduct);
            setName(activeProduct.name);
            setQuantity(activeProduct.quantity);
            setIngener(activeProduct.ingener);
            setSupplier(activeProduct.supplier);
            setInstallationOfCabinets(activeProduct.installationOfCabinets);
            setBrigade(activeProduct.brigade);
            setShipment(activeProduct.shipment);  
            setBtnText('Сохранить');
        }
        // eslint-disable-next-line
    }, [activeProduct]);


    const clickOutsideForm = (e) => {
        if (e.target.className === 'prodAddModal') {
            dispatch(showModal());
            dispatch(ap({}));
        }
    }

    const addProduct = (e) => {
        e.preventDefault();
        const objectProduct = {
            id: Object.entries(activeProduct).length !== 0 ? activeProduct.id : uuidv4(),
            id_Order: activeOrder['id'],
            name: name,
            quantity: quantity,
            ingener: ingener,
            supplier: supplier,
            installationOfCabinets: installationOfCabinets,
            brigade: brigade,
            shipment: shipment
        }

        if (Object.entries(activeProduct).length !== 0) {
            dispatch(productFormUpdate(objectProduct));
        } else {
            dispatch(productFormAdd(objectProduct));
        }

        // request(`http://localhost:3001/orders/${activeOrder}`, 'PATCH', JSON.stringify(objectProduct))
        // .then(res => console.log(res, 'Отправка успешна'))
        // //.then(dispatch(heroCreated(objectHero)))
        // .catch(error => console.log(error));
        
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
                    <h3>Заказ №{activeOrder['№']}</h3>
                </div>
                <form
                    onSubmit={addProduct}>
                    <div>
                        <label>Наименование</label>
                        <input 
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Колличество</label>
                        <input 
                            type='number'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Конструктор</label>
                        <input 
                            type='text'
                            value={ingener}
                            onChange={(e) => setIngener(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Снабжение отв.</label>
                        <input 
                            type='text'
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Монтаж шкафов</label>
                        <input 
                            type='text'
                            value={installationOfCabinets}
                            onChange={(e) => setInstallationOfCabinets(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Бригада</label>
                        <input 
                            type='text'
                            value={brigade}
                            onChange={(e) => setBrigade(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Отгрузка</label>
                        <input 
                            type='text'
                            value={shipment}
                            onChange={(e) => setShipment(e.target.value)}></input>
                    </div>
                    <div>
                        <input 
                            type='submit'
                            value={btnText}>
                        </input>
                    </div>
                </form>
                <input 
                    className='close_modal' 
                    type='button' 
                    value='Закрыть'
                    onClick={()=> {dispatch(showModal()); dispatch(ap({}));}}>
                    </input>
           </div>
        </div>
    )
};

export default ProdAddModal;