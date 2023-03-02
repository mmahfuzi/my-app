import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.css';

function App() {
  const [giveUp, setGiveUp] = useState(false);
  const [input, setInput] = useState<number[]>([]);
  const [newInput, setNewInput] = useState<number>();
  const [error, setError] = useState(false);

  const addNewInput = () => {
    if (newInput) {
      setInput([...input, newInput])
    }
  }


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
          value={newInput}
          onChange={(event) => {setNewInput(+event.target.value)}}
        />
        <button 
        className="button"
        onClick={() => {
          if (String(newInput)?.length > 4) {
            setError(true)
          }
          addNewInput()
        }}
        >
          GO!
        </button>
        <button 
          className="button" 
          onClick={() => {setGiveUp(true)}}
          >
            Give Up!
          </button>
      </form>
      <p>{newInput}</p>

      {error && (
        <div
        className='notification is-danger is-light has-text-weight-normal'
      >
        <button
          type="button"
          className="delete"
          onClick={() => setError(false)}
        />
        The number should have only 4 digits
      </div>
      )}

    </div>
  );
}

export default App;
