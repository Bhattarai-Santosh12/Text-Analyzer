import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import TextForm from './Components/TextForm';
import About from './Components/About';
import Alert from './Components/Alert';

function App() {
  const [Mode, setMode] = useState('light');
  const [alert, setAlert]= useState(null);

  const showAlert=(message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 2000);
  }

  const toggleMode = () => {
    if (Mode === 'light') {
      setMode('dark');
      document.body.style.background = 'gray';
      showAlert("Dark Mode Activated"," success")
    } else {
      setMode('light');
      document.body.style.background = 'white';
      showAlert("Light Mode Activated"," success")
    }
  };

  return (
    <Router>
      <Navbar Title="TextEditor" Home="Home" mode={Mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div className="container">
        <Routes>
          <Route path="/" element={<TextForm showAlert={showAlert} heading="Enter Your Text" mode={Mode} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
