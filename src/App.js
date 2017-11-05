import React, { Component } from 'react';

// imports components 
import NavBar from './components/NavBar'
import Layout from './components/Layout'

// import style
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Layout />
      </div>
    );
  }
}

export default App;
