import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.css';

function App() {
  const [giveUp, setGiveUp] = useState(false);


  useEffect(() => {
    const  randomNumber = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  }, [giveUp])

  return (
    <div className="App">
      <header className="App-header">
        Let's play 
      </header>
      <form>
        <input
          type="text"
          placeholder='Enter a 4 digit number'
          className='input is-normal inputDig'
        />
        <button className="button">GO!</button>
        <button 
          className="button" 
          onClick={() => {setGiveUp(true)}}
          >
            Give Up!
          </button>
      </form>

    </div>
  );
}

export default App;
