import './OrderAdd.css';

const OrderAdd = () => {
    return(
        <div className = 'orderAdd'>
            <h1>Добавить заказ</h1>
            <form className='orderAdd_form'>
                <div className='orderAdd_form_order'>
                    <div>
                        <label>Год</label>
                        <input
                            required
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <label>Заказчик</label>
                        <input
                            required
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <label>Дата запуска</label>
                        <input
                            required
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <label>Дата отгрузки</label>
                        <input
                            required
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <label>Ответстсвенный</label>
                        <input
                            required
                            type="text"
                        ></input>
                    </div>
                </div>
                <div className = 'orderAdd_form_order_products'>
                    <h3>Продукция</h3>
                    <div className='orderAdd_form_order_productAdd'>
                        <div>
                            <label>Наименование</label>
                            <input
                            required
                            type="text"
                            ></input>
                        </div>
                        <div>
                            <label>Колличество</label>
                            <input
                            required
                            type="text"
                            ></input>
                        </div>
                        <div>
                            <label>Конструктор</label>
                            <input
                            required
                            type="text"
                            ></input>
                        </div>
                        <div>
                            <label>Снабжение отв.</label>
                            <input
                            required
                            type="text"
                            ></input>
                        </div>
                        <div>
                            <label>Монтаж шкафов</label>
                            <input
                            required
                            type="text"
                            ></input>
                        </div>
                        <div>
                            <label>Бригада</label>
                            <input
                            required
                            type="text"
                            ></input>
                        </div>
                        <div>
                            <label>Отгрузка</label>
                            <input
                            required
                            type="text"
                            ></input>
                        </div>
                    </div>
                </div>
                
                
            </form>
        </div>
    )
};

export default OrderAdd;