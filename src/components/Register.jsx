import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/main.css';
import tgImage from '../images/telegram.png';
import { Navigate, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(false); 
  const navigate = useNavigate()



  const formSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://192.168.100.116:5700/register', {
        username,
        password,
      });

      const { token: newToken } = response.data;

      localStorage.setItem('token', newToken);
      setToken(newToken);

    } catch (error) {
      console.log(error);
    }
    navigate('/login');
  };

 

  const toggleKeepMeSignedIn = () => {
    setKeepMeSignedIn((prevValue) => !prevValue);
  };



  return (
    <div className='center'>
      <div className='container'>
        <img className='reg_image' src={tgImage} alt='' />

        <h1>Telegram</h1>
        <p className='note'>
          Please confirm your username and enter your <br /> password
        </p>
        <div>
          <form onSubmit={formSubmit}>
            <input
              type='text'
              className='telegram-input one'
              placeholder='Username'
              value={username}
              
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type='password'
              className='telegram-input'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
                <div className='custom-radio'>
                <input
  type="checkbox"
  checked={keepMeSignedIn}
  onChange={toggleKeepMeSignedIn}
/>

                <label htmlFor='option1'>
                  <span className='label' dir='auto'>
                    Keep me signed in
                  </span>
                </label>
              </div>
                {password.length < 8 ? '' : (
              <button className='telegram-button' disabled = {password.trim() === '' && username.trim() === ''} type='submit'>Next</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
