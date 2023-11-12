import React from 'react';
import './App.css';
import Header from "./components/Header";

export default class App extends React.Component  {

  render() {
    let count = 0;
    return (
      <>
        <div className="App">
          <Header/>
    -     <div>
    -       <a href="https://vitejs.dev" >
      test
    -       </a>
    -       <a href="https://reactjs.org" >
    test1
    -       </a>
    -     </div>
    -     <h1>Vite + React</h1>
    -     <div className="card">
    -       <button onClick={() => {count = count + 1}}>
    -         count is {count}
    -       </button>
    -       <p>
    -         Edit <code>src/App.jsx</code> and save to test HMR
    -       </p>
    -     </div>
    -     <p className="read-the-docs">
    -       Click on the Vite and React logos to learn more
    -     </p>
-       </div>        
      </>
    )
  }
 
}
