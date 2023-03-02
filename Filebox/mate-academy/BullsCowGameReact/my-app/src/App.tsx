import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.css';

export const App: React.FC = () => {
  const [giveUp, setGiveUp] = useState(false);
  const [inputs, setInputs] = useState<number[]>([]);
  const [newInput, setNewInput] = useState<number>();
  const [error, setError] = useState(false);

  const addNewInput = () => {
    if (newInput) {
      setInputs([...inputs, newInput])
    }
  }

  function sort_array_randomly() {
 
    return +([1,2,3,4,5,6,7,8,9].sort((a, b) => Math.random() - 0.5).slice(0,4).join(''));
      
  }

  useEffect(() => {
    const randomNumber = sort_array_randomly();

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

        {(inputs.length>0 && !error) && (
          <div>
            <p>INPUT</p>
            {inputs.map(input => (
              <p>{input}</p>
            ))}
          </div>
        )}

        
      </form>

      
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

      <figure className='figure image is-128x128'>
        <img className='is-rounded' src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/4b5e1c15227903.5628e65346842.png" alt=''/>
      </figure>

    </div>
    
  );
};
