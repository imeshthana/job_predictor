import './App.css';
import BackGroundImage from './components/backGroundImage';
import Footer from './components/footer';
import Header from './components/header';
import Input from './components/input_field';
import React from 'react'

function App() {
  return (
  <div>
    <BackGroundImage />
    <Header />
    <div className='row'>
      <div className='image-div'><img alt="img" className='main_image' src='pic.jpg' /></div>
      <div className='input-form-div'><Input /></div>
    </div>
    <Footer />
  </div>
  );
}

export default App;