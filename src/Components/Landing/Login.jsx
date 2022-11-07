import { React, useContext, useState, useEffect } from 'react';
import LandingContext from '../../context/LandingContext';
import LoginInputs from './LoginInputs';
import { useNavigate } from 'react-router-dom'
import logo from "./logo.png";
import { IoMdCloseCircleOutline } from 'react-icons/io'


const Login = () => {
  const { setLogin, setUserData } = useContext(LandingContext);
  const [loginData, setLoginData] = useState({
    username: "tbrower9",
    password: "XRFD9sC",
  });

  const refreshUserData = () => {
    let jsonDat = JSON.stringify(loginData);

    let fetchData = {
      method: "POST",
      body: jsonDat,
      headers: new Headers({
        "Content-type": "application/json",
      }),
    };

    fetch("https://find-luv.onrender.com/api/login", fetchData)
      .then((res) => res.json())
      .then((data) => setLoginData(data[0]))
  }

  useEffect(() => {

    if (setLogin === true) {
      const interval = setInterval(() => {
        console.log('working')
        refreshUserData()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [])

  const inputs = [
    {
      id: 8,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username should be between 3-20 characters.",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,20}$",
      required: true,
    },
    {
      id: 9,
      name: "password",
      type: "password",
      placeholder: "Password",
      // errorMessage:
      //   "Password must be 8-20 characters and should include atleast 1 letter, 1 number and 1 special character!",
      label: "Password",
      // pattern: `/^(?=.*?[A-Z])(?=.?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z0-9#?!@$%^&*-].{8,20}$/g`,

      required: true,
    },
  ];

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let jsonDat = JSON.stringify(loginData);

    let fetchData = {
      method: "POST",
      body: jsonDat,
      headers: new Headers({
        "Content-type": "application/json",
      }),
    };
    fetch("https://find-luv.onrender.com/api/login", fetchData)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data[0]);
        setLogin(true);
        navigate('/')
      });
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    window.location.reload()
  }
  return (
    <div className="loginForm--container">
      <img
        className="heartLogo2"
        src={logo}
        alt="none"
        height="250px"
        width="250px"
      ></img>
      <div className="loginForm--header">
        <div className="loginForm--title">Welcome Back</div>
        <div className="loginForm--closeBtn">
          <span><IoMdCloseCircleOutline className='landingCloseBtn' onClick={handleClick} /></span>
        </div>
      </div>
      <div className="loginForm--wrapper">
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <LoginInputs
              key={input.id}
              {...input}
              value={loginData[input.name]}
              onChange={handleChange}
              disabled />
          ))}

          <button className="btn-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
