import React from 'react';
import {Dash, Login, Register, Navbar} from './components'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Router basename='/'>
      <div>
      <Navbar />
      <Routes>
        <Route  path='/' element={<Dash />}/>
        <Route  path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />} />
      </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
