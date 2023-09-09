import './Header.css';
import logo from '../../resources/img/Logo.png'

const Header = () => {

    return (
        <div className = 'header'>
            <div className = 'logo'>
                <img src={logo} alt="Логотип"/>
            </div>
            <div className = 'nav'>
                <ul>
                    <li>Заказы</li>
                    <li>Металлообработка</li>
                    <li>КТП</li>
                </ul>
            </div>
        </div>
        )

}

export default Header;