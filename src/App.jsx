import React, { Component} from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Game } from './Pages/Game.jsx'
import { Login } from './Pages/Login.jsx'

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes >
          <Route exact path="/" element={<Login/>} />
          <Route path="/game2030/:id" element={<Game/>} />
        </Routes >
      </BrowserRouter>
    )
  }
}
export default App