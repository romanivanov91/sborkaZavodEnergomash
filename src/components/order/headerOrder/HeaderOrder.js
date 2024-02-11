import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHttp} from '../../../hooks/http.hook';
import { ordersYearsFetched, activeYear } from '../../../actions';

import './HeaderOrder.css';

const HeaderOrder = () => {

    const [errorMsg, setErrorMsg] = useState(false);

    const filters = useSelector(state=>state.filters);
    const activeYearOrder = useSelector(state=>state.activeYear);

    const dispatch = useDispatch();
    const {request} = useHttp();

    const date = new Date();

    useEffect (()=> {
        request("http://localhost:8000/sborkaZavodEnergomash/api/readYearsOrder.php")
        .then((data) => {
            console.log(data);
            setErrorMsg(false);
            dispatch(ordersYearsFetched(data));
            console.log(activeYearOrder);
        }).catch((error) => {
            console.log(error); // вывести ошибку
            setErrorMsg(true);
         });
    }, [])


    const yearsli = (years) => {
        return years.map((item, i) => {
            return <li 
                    key = {i}
                    onClick = {() => dispatch(activeYear(item))}
                    className = { item == activeYearOrder ? 'activeYearOrder' : null}
                    >
                        {item}
                    </li>
            }
        )
    }

    const renderyearsli = errorMsg ? <p>Данные по годам не загружены!</p> : yearsli(filters)

    return (
        <div className='headerOrder'>
            <h1>Учет заказов ООО "Завод Энергомаш"</h1>
            <h2>Общее колличество заказов за 2023 год: 100</h2>
            <ul>
                {renderyearsli}
            </ul>
        </div>
    )
}

export default HeaderOrder;