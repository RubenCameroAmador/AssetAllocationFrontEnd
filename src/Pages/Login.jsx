import React, { Fragment, useState } from 'react'
import axios from 'axios'

export function Login() {
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://127.0.0.1:7777/login', { nickname, password })
            .then(response => {
                const user = response
                setUser(user)
                setNickname('')
                setPassword('')
                console.log(user)
            })
            .catch(error => {
                console.log('Bad username or password')
            })
    }

    

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text"
                        value={nickname}
                        name='Nickname'
                        placeholder='Nickname'
                        onChange={({ target }) => setNickname(target.value)} />
                </div>
                <div>
                    <input type="password"
                        value={password}
                        name='Password'
                        placeholder='Password'
                        onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button>
                    Login
                </button>
            </form>
        </Fragment>
    )
}
