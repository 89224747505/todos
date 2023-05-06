import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Registration from './components/Registration/Registration';
import Tasks from './components/Tasks/Tasks';
import './style.css';
import { observer } from 'mobx-react-lite';

const App = function() {
  
  return (
    <BrowserRouter className='App'>
      <Routes>
        <Route path='*' element={<Tasks/>} />
        <Route path='auth' element={<Auth/>} />
        <Route path='registration' element={<Registration/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default observer(App);
