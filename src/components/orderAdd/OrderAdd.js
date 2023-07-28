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
            </form>
        </div>
    )
};

export default OrderAdd;