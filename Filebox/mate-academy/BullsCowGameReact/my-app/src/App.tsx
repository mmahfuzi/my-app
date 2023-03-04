import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.css';

export const App: React.FC = () => {
  const [inputs, setInputs] = useState<string[]>([]);
  const [cowsList, setCowsList] = useState<number[]>([]);
  const [bullsList, setBullsList] = useState<number[]>([]);
  const [newInput, setNewInput] = useState<string>('');
  const [secretNumber, setSecretNumber] = useState(sort_array_randomly())
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState('');
  const [bulls, setBulls] = useState<number>(0);
  const [cows, setCows] = useState<number>(0);
  const [won, setWon] = useState(false)

  const addNewInput = () => {
    if (newInput) {
      setInputs([...inputs, newInput]);
      setBullsList([...bullsList, bulls]);
      setCowsList([...cowsList, cows]);
      setBulls(0);
      setCows(0);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
     event.preventDefault();
     if (String(newInput)?.length > 4) {
      setError(true)
      setErrormsg('The number should have only 4 digits')
    } else if (isNaN(+newInput)) {
      setError(true)
      setErrormsg('Invalid Input')
    } else { 
      addNewInput();
      compare();
      // setBulls(0);
      // setCows(0);
    }
     
     setNewInput('');
  }

  const reset = () => {
    setInputs([]);
    setBullsList([]);
    setCowsList([]);
    setNewInput('');
    setSecretNumber(sort_array_randomly());
    setBulls(0);
    setCows(0);
    setWon(false);
  }

  function sort_array_randomly() {
 
    return +([1,2,3,4,5,6,7,8,9].sort((a, b) => Math.random() - 0.5).slice(0,4).join(''));
      
  }

  const compare = () => {
    const secret = String(secretNumber);

    if (+newInput === secretNumber) {
      setWon(true);
    }
  
    for (let i = 0; i < 4; i++) {
      if (newInput[i] === secret[i]) {
        setBulls(prev => prev + 1);
      } else if (secret.includes(newInput[i])) {
        setCows(prev => prev + 1);
      }
    }
  }
  return (
    <div className="App">
      <header className="App-header" />
      {/* <p>{secretNumber}</p> */}

      <form onSubmit={handleSubmit}>
        <div className='form'>
        <input
          type="text"
          placeholder='Enter a 4 digit number'
          className='input is-normal inputDig is-rounded'
          value={newInput}
          onChange={(event) => {
            setNewInput(event.target.value)
          }}
        />
        <button 
          type='submit'
          className="button is-rounded is-info"
        >
          GO!
        </button>
        <button 
          type='reset'
          className="button is-rounded is-danger" 
          onClick={() => {reset()}}
          >
            Give Up!
        </button>
        </div>

        {won && (
          <div className='notification is-primary won'>
           <strong className='strong'>!YOU WON!</strong>
         </div>
        )}

        {(inputs.length>0 && !error && !won) && (
          <div>
            <div className='row'>
              <p>
                <span className='title'>INPUT</span>
                {inputs.map(input => (
                   <p className='para'>{input}</p>
                  ))}
              </p>

              <p>
                <span className='title'>BULLS</span>
                {bullsList.map(bull => (
                    <p className='para'>{bulls}</p>
                  ))}
              </p>

              <p>
                <span className='title'>COWS</span>
                {cowsList.map(cow => (
                    <p className='para'>{cows}</p>
                  ))}
              </p>
            </div>    
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
        {errormsg}
      </div>
      )}

      <figure className='figure image is-128x128'>
        <img className='is-rounded' src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/4b5e1c15227903.5628e65346842.png" alt=''/>
      </figure>

    </div>
    
    
  );
};
