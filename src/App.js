import React, { Component } from 'react';

// imports components 
import NavBar from './components/NavBar'
import BarList from './components/BarList'

// import style
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <BarList />
      </div>
    );
  }
}

export default App;
