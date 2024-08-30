import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './Components/Navbar'
import TextForm from './Components/TextForm'
import About from './Components/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar Title="TextEditor" Home="Home" />
      <div className='container'>
        <Routes>
          <Route path="/" element={<TextForm heading="Enter Your Text" />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}


export default App
