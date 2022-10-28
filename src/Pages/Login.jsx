import React, {  Component } from 'react'
import axios from 'axios'
import { getLocalStorage, saveInLocalStorage } from '../helpers';
import '../Styles/Login.css'

export class Login extends Component {
    //const { activateAuth } = useContext(UserContext)
    constructor(props) {
        super(props)
        this.state = {
            nickname: getLocalStorage('user_name'),
            password: ''
        }
        this.ruta = ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()
        // 'http://127.0.0.1:7777/login'
        axios.post('https://assetallocationbackend.herokuapp.com/usuario/validar', this.state)
            .then(response => {
                console.log(response)
                console.log('ingreso a todo')
                // saveInLocalStorage("token", response.data.token)
                saveInLocalStorage("user_id", response.data._id)
                saveInLocalStorage("user_name", response.data.nickname)
                this.ruta = `./game2030/${response.data._id}`
                window.location.href = this.ruta
            })
            .catch(error => {
                alert('Bad username or password')
            })
    }

    render() {
        const { nickname, password } = this.state
        return (
                <div className='fondo'>
                    <div className='contenedor'>
                        <form onSubmit={this.submitHandler}>
                            <div>
                                <input type="text"
                                    value={nickname}
                                    name='nickname'
                                    placeholder='Usuario'
                                    onChange={this.changeHandler}
                                />
                            </div>
                            <div>
                                <input type="password"
                                    value={password}
                                    name='password'
                                    placeholder='Contraseña'
                                    onChange={this.changeHandler}
                                />
                            </div>
                            <button type='submit'>
                                Ingresar
                            </button>
                        </form>
                </div>
            </div>
        )
    }
}
export default Login