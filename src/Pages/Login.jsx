import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { getLocalStorage, saveInLocalStorage } from '../helpers';
import '../Styles/Login.css'
import { Progress } from '../Components/Progress.jsx'
import isaLogo from '../image/isa_login.png'
import { ErrorMsg } from '../Components/ErrorMsg.jsx'

export class Login extends Component {
    //const { activateAuth } = useContext(UserContext)
    constructor(props) {
        super(props)
        this.state = {
            nickname: getLocalStorage('user_name'),
            password: '',
            open: false,
            openErrorMsg: false,
            errorMsg: ''
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
        this.handleProgress()
        axios.post('https://assetallocationbackend.herokuapp.com/usuario/validar', data)
            .then(response => {
                console.log(response)
                console.log('ingreso a todo')
                // saveInLocalStorage("token", response.data.token)
                saveInLocalStorage("user_id", response.data._id)
                saveInLocalStorage("user_name", response.data.nickname)
                this.ruta = `./game2030/${response.data._id}`
                this.setState({ open: false })
                window.location.href = this.ruta
            })
            .catch(error => {
                this.setState({ open: false, openErrorMsg: true, errorMsg: 'Nombre de usuario o contraseña incorrecta' })
            })
    }
    handleProgress(){
        console.log("antes de: ",this.state.open)
        this.setState({open: true})
    }

    handleOpenErrorMsg() {
        this.setState({ openErrorMsg: true })
    }
    handleCloseErrorMsg() {
        this.setState({ openErrorMsg: false })
    }

    render() {
        const { nickname, password, open, openErrorMsg, errorMsg } = this.state
        return (
            <Fragment>
                <div className='contenedor_login'>
                    <div className='image'>
                        <div className='image_logo'>
                            <img src={isaLogo} alt="Logo de isa" />
                        </div>
                        <div className='image_title'>
                            <h3 className='image_title_taller'>Taller Junta Directiva</h3>
                            <h4 className='image_title_asset'>Asset allocation</h4>
                        </div>
                    </div>
                    <div className='form'>
                        <form onSubmit={this.submitHandler}>
                            <div className='input-container'>
                                <label className='input-container-label'>Usuario</label>
                                <input type="text"
                                    value={nickname}
                                    name='nickname'
                                    placeholder='Digite el usuario'
                                    onChange={this.changeHandler}
                                />
                            </div>
                            <div className='input-container'>
                                <label className='input-container-label'>Contraseña</label>
                                <input type="password"
                                    value={password}
                                    name='password'
                                    placeholder='Digite la contraseña'
                                    onChange={this.changeHandler}
                                />
                            </div>
                            <div>
                                <button type='submit' className='button-container'>
                                    Ingresar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Progress abrir={open} />
                <ErrorMsg open={openErrorMsg} mensaje={errorMsg} handleClose={() => this.handleCloseErrorMsg()} />
            </Fragment>
        )
    }
}
export default Login