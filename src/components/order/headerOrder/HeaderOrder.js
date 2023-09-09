import { useSelector, useDispatch } from 'react-redux';

import './HeaderOrder.css';

const HeaderOrder = () => {

    const {filters} = useSelector(state=>state);
    //const dispatch = useDispatch();


    const yearsli = (years) => {
        return years.map((item, i) => {
            return <li key = {i}>{item}</li>
            }
        )
    }

    const renderyearsli = yearsli(filters)

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