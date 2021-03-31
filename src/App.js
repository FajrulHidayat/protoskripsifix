// import logo from './logo.svg';
import React from 'react'
import './style/custom.scss';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {components} from './components'


class App extends React.Component {
  render(){
  return (
    <Router>
      <Route  path="/admin" component={components.Dashboard}/>
      <Route exact path="/" component={components.Login}/>
      <Route exact path="/pdf/:id" component={components.Pdf}/>
      <Route exact path="/pdfPreview/:id" component={components.Pdf}/>
      <Route exact path="/SkPreview/:id" component={components.SK}></Route>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
  }
}

export default App;
