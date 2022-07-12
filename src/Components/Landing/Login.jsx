import { React, useState } from 'react'
import LoginInputs from "./LoginInputs"

const Login = () => {

const [loginData, setLoginData] = useState({
  username:"",
  password: ""
});

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username should be between 3-20 characters and shouldn't include any special characters!",
      label:"Username",
      pattern: "^[A-Za-z0-9]{3,20}$",
      required: true
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password must be 8-20 characters and should include atleast 1 letter, 1 number and 1 special character!",
      label:"Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*][8-20]$`,
      required: true
    }

  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value})
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
        {inputs.map((input)=>(
          <LoginInputs
          key={input.id} 
          {...input} value={loginData[input.name]}
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