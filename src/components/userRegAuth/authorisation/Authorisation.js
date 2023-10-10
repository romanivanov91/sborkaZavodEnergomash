import { useHttp } from "../../../hooks/http.hook";
import { useState, useRef } from "react";
import BarLoader from "react-spinners/BarLoader";
import { useDispatch, useSelector } from "react-redux";
import { autorisationUser } from "../../../actions/index"

const Autorisation = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [errorAuth, setErrorAuth] = useState(false);

    const {request} = useHttp();

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const ref = useRef(null);

    const authUser = (e) => {
        console.log('форма сработала');
        e.preventDefault();
        const objectUser = {
            email: email,
            password: password
        };

        setSpinner(true);

        request('http://localhost:8000/sborkaZavodEnergomash/api/login.php', 'POST', JSON.stringify(objectUser))
        .then(res => {
            console.log(res, 'Отправка успешна');
            return res;
        })
        .then(res => {
            if (rememberMe) {
                document.cookie = `jwt=${res.jwt}`;
            }
            //localStorage.setItem('jwt', res.jwt);
            // localStorage.setItem('lastname', res.lastname);
            // localStorage.setItem('firstname', res.firstname);
            // localStorage.setItem('patronymic', res.patronymic);
            // localStorage.setItem('position', res.position);
            // localStorage.setItem('id', res.id);
            const user = {
                id: res.id,
                lastname: res.lastname,
                firstname: res.firstname,
                patronymic: res.patronymic,
                position: res.position,
                email: res.email
            }
            dispatch(autorisationUser(user));
            setSpinner(false);
        })
        .catch(error => {
            console.log(error);
            setSpinner(false);
            setErrorAuth(true);
        });
        //Очищаем форму после отправки
        setEmail('');
        setPassword('');
    }

    const clickOutsideError = (e) => {
        const withinBoundaries = e.composedPath().includes(ref);
 
	    if ( ! withinBoundaries ) {
                setErrorAuth(false);
	    }

        
        // if (e.target.className !== 'errorMessage') {
        //     setErrorAuth(false);
        //     console.log(e.target);
        // }
    }

    const errorMessage = () => {
        return (
            <div className="errorMessage" ref={ref}>
                <div onClick={(e) => clickOutsideError(e)}>
                    <p>Пользователь не найден или неверный пароль</p>
                    {/* <button onClick={() => setErrorAuth(false)}>Х</button> */}
                </div>
            </div>
            )
    }

    const submitBtn = () => {
        if (spinner) {
            return (
                <div className='form_auth_spinner'>
                    <BarLoader
                        color="#36d7b7"
                        cssOverride={{}}
                        speedMultiplier={1}
                    />
        </div>
                )
        } else {
            return (
                <div className="submitBtn">
                    {errorAuth ? errorMessage(): null}
                    <input 
                    className='form_submit' 
                    type="submit" 
                    value='Войти'/>
                </div>
                )
        }
    }

    return (
        <form 
            className='reg_auth_form'
            onSubmit={authUser}>
            <div className="form_input">
                    <p>Адрес электронной почты: </p>
                    <input 
                        type="email" 
                        placeholder="Введите email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/> 
                </div>
            <div className="form_input"> 
                    <p>Пароль: </p>
                    <input 
                        type="password" 
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="form_check">
                    <input 
                        type="checkbox" 
                        placeholder="Запомнить меня"
                        onChange={() => setRememberMe(!rememberMe)}/>
                    <p>Запомнить меня</p>
            </div>
                {submitBtn()}   
        </form>
    )
}

export default Autorisation;