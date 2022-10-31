import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { getLocalStorage, saveInLocalStorage } from '../helpers';
import '../Styles/Login.css'
import { Progress } from '../Components/Progress.jsx'

export class Login extends Component {
    //const { activateAuth } = useContext(UserContext)
    constructor(props) {
        super(props)
        this.state = {
            nickname: getLocalStorage('user_name'),
            password: '',
            open: false
        }
        this.ruta = ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()
        // 'http://127.0.0.1:7777/login'
        const data = {
            nickname: this.state.nickname,
            password: this.state.password
        }
        console.log(data)
        axios.post('https://assetallocationbackend.herokuapp.com/usuario/validar', data)
            .then(response => {
                console.log(response)
                console.log('ingreso a todo')
                // saveInLocalStorage("token", response.data.token)
                saveInLocalStorage("user_id", response.data._id)
                saveInLocalStorage("user_name", response.data.nickname)
                this.ruta = `./game2030/${response.data._id}`
                this.setState({open: false})
                window.location.href = this.ruta
            })
            .catch(error => {
                this.setState({open: false})
                alert('Bad username or password')
            })
    }

    render() {
        const { nickname, password, open } = this.state
        return (
            <Fragment>
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
                <Progress abrir = {open}/>
            </Fragment>
        )
    }
}
export default Login