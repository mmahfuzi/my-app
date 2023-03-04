import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import classnames from 'classnames';
import {Helmet} from "react-helmet";

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
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false)
  const [tries, setTries] = useState(7);
  const [counter, setCounter] = useState(true);
  const [start, setStart] = useState(true);

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
     if (String(newInput)?.length !== 4) {
      setError(true)
      setErrormsg('The number should have 4 digits')
    } else if (isNaN(+newInput)) {
      setError(true)
      setErrormsg('Invalid Input')
    } else if (tries > 0){ 
      addNewInput();
      compare();
      setTries(prev => prev - 1)

    } else if (tries === 0) {
      setLost(true);
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
    setLost(false);
    setTries(7);
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
    <div className='body'>
      {!start && (
        <div className="App">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Bulls And Cows Game</title>
            <link rel="canonical" href="https://mmahfuzi.github.io/my-app/" />
            <meta name="description" content="bulls and cows game" />
          </Helmet>
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
              setError(false);
              setNewInput(event.target.value)
            }}
          />
          <button 
            type='submit'
            className="button is-rounded is-success"
          >
            GO!
          </button>
          <button 
            type='reset'
            className="button is-rounded is-link" 
            onClick={() => {reset()}}
            >
              Give Up!
          </button>
          {lost && (
            <button 
            type='reset'
            className="button is-rounded is-dark" 
            onClick={() => {reset()}}
            >
              Play Again
          </button>
          )}
          </div>
  
          {(!won && !lost && counter && tries !== 7)&& (
            <div className={classnames('notification notif',
             {'is-info': tries >= 4},
             {'is-warning':  tries <= 3 && tries >= 2},
             {'is-danger': tries < 2}
            )}
            >
             <button className="delete" onClick={() => setCounter(false)}></button>
  
             {`You have ${tries} more tries`}
           </div>
          )}
  
          {won && (
            <div className='notification is-primary won'>
             <strong className='strong'>!YOU WON!</strong>
           </div>
          )}
  
          {lost && (
            <div className='notification is-danger won'>
             <strong className='strong'>!OH YOU LOST!</strong>
           </div>
          )}
  
          {(inputs.length>0 && !error && !won && !lost) && (
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
  
      </div>
      )}

      {start && (
        <div className='start'>   
          <figure className='figure'>
            <img className='is-rounded' src="https://vmsoft-bg.com/wp-content/uploads/2019/02/Feature-graphic_en.png" alt=''/>
          </figure>

          <button className='button is-dark is-medium is-rounded' onClick={() => {setStart(false)}}>Let's Play</button>
        </div>
      )}
    </div>
    
    
  );
};
