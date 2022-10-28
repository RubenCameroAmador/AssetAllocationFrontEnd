import React, { Component} from 'react'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Game } from './Pages/Game.jsx'
import { Login } from './Pages/Login.jsx'

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes >
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/game2030/:id" element={<Game/>} />
        </Routes >
      </BrowserRouter>
    )
  }
}
export default App