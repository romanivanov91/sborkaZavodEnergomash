import './Button.css';

const Button = (height='30px', text = 'Добавить') => {

    const style = {
        width: '200px',
        height: height,
        fontSize: '16px',
        color: 'white',
        backgroundColor: '#0693e3',
        borderRadius: '5px',
        border: '0px',
        marginBottom: '30px',
        marginTop: '30px'
    }

    return (
        <input 
            style={style} 
            type="submit" 
            value={text}/>
    )
}

export default Button;