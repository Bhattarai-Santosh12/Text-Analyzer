import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './Components/Navbar'
import TextForm from './Components/TextForm'
import About from './Components/About'

function App() {
  const [Mode, setMode]= useState('light')

  const toggleMode=()=>{

    if(Mode==='light'){
      setMode('dark');
      document.body.style.background='gray';
    }else{
      setMode('light');
      document.body.style.background='white';
    }
  }

  return (
    <Router>
      <Navbar Title="TextEditor" Home="Home" mode= {Mode} toggleMode={toggleMode}/>
      <div className='container'>
        <Routes>
          <Route path="/" element={<TextForm heading="Enter Your Text" />} mode= {Mode}/>
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}


export default App
