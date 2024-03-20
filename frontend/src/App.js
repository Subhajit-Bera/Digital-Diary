import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login"
import Register from "./pages/Register";
import Home from "./pages/Home";
import Records from './pages/Records';
import Contact from './pages/Contact';
import AddRecord from './pages/AddRecord';
import SingleRecord from './pages/SingleRecord';
import DiaryProvider from './context/DiaryProvider';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <DiaryProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/records" element={<Records />} />
            <Route path="/record/:id" element={<SingleRecord />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-record" element={<AddRecord />} />
          </Routes>
        </DiaryProvider>
      </BrowserRouter>
    </div>
  )
}

export default App

