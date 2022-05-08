import React from 'react';
import './App.css';
import {CardList} from "./shared/cardList";

function App() {
  return (
    <div className="App" style={{display:"flex", flexDirection:'row'}}>
        <CardList/>
    </div>
  );
}

export default App;
