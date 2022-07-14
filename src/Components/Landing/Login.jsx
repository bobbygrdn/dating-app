import { React, useContext, useState } from 'react';
import LandingContext from '../../context/LandingContext';
import '../../ComponentStyles/CreateSlashLogin.css';
import LoginInputs from './LoginInputs';

const Login = () => {

  const { setLogin, setUserData } = useContext(LandingContext)
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const inputs = [
    {
      id: 8,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username should be between 3-20 characters and shouldn't include any special characters!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,20}$",
      required: true
    },
    {
      id: 9,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password must be 8-20 characters and should include atleast 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*?[A-Z])(?=.?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z0-9#?!@$%^&*-].{8,20}$`,
      required: true
    }

  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let jsonDat = JSON.stringify(loginData)

    let fetchData = {
      method: "POST",
      body: jsonDat,
      headers: new Headers({
        'Content-type': 'application/json'
      })
    }
    fetch('https://find-luv.herokuapp.com/api/login', fetchData)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data[0]);
        setLogin(true);
      });


  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  };


  return (
    <div className='loginForm--container'>

      <div className='loginForm--header'>
        <div className='loginForm--title'>
          Welcome Back
        </div>
        <div className='loginForm--closeBtn'>
          <span>&times;</span>
        </div>
      </div>

      <div className='loginForm--wrapper'>

        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <LoginInputs
              key={input.id}
              {...input}
              value={loginData[input.name]}
              onChange={handleChange}
            />
          ))}

          <button className='btn-submit'>Submit</button>
        </form>

      </div>
    </div>
  )
}

export default Login;