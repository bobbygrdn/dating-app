import { React, useContext, useState } from 'react'
import CreateInputs from './CreateInputs.jsx'
import LandingContext from '../../context/LandingContext'
import '../../ComponentStyles/CreateSlashLogin.css'

const CreateUserForm = () => {
  const [newTempUserData, setTempUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    verifyPassword: "",
    zipcode: ""
  });
  //const [ setNewUser ] = useContext(LandingContext)

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
      name: "first_name",
      type: "text",
      placeholder: "First Name",
      errorMessage: "",
      label:"First Name",
      required: true
    },

    {
      id: 3,
      name: "last_name",
      type: "text",
      placeholder: "Last Name",
      errorMessage: "",
      label:"Last Name",
      required: true
    },

    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Should be a vailid email address!",
      label:"Email",
      required: true
    },

    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password must be 8-20 characters and should include atleast 1 letter, 1 number and 1 special character!",
      label:"Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*][8-20]$`,
      required: true
    },

    {
      id: 6,
      name: "verifyPassword",
      type: "password",
      placeholder: "Verify Password",
      errorMessage: "Passwords must match!",
      label:"Verify Password",
      pattern: newTempUserData.password,
      required: true
    },

    {
      id: 7,
      name: "zipcode",
      type: "text",
      placeholder: "Zip Code",
      errorMessage: "Max five digits and should only contain numbers!",
      label:"Zip Code",
      pattern: `^[0-9]{5,5}$`,
      required: true
    }

  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(newTempUserData))
    let fetchData = {
        method: "POST",
        body: JSON.stringify(newTempUserData),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    fetch('http://localhost:3000/api/users',fetchData).then(() => {
      console.log('createdUser')
    })
  };

   const handleChange = (e) => {
    setTempUserData({...newTempUserData, [e.target.name]: e.target.value})
   };
  return (
    <div
     className='createuser--container'>
      <div className='createuser--header'>

        <div className='createuser--title'>
            Sign Up to Find Luv Now
        </div>

        <div className='createuser--closebtn'>
          <span>&times;</span>
        </div>

      </div>
      <div className='createuser--formWrapper'>
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <CreateInputs
            key={input.id}
            {...input} value={newTempUserData[input.name]}
            onChange={handleChange}
            />
          ))}

            <button className='btn--submit'>Submit</button>

        </form>
      </div>
    </div>
  )
}

export default CreateUserForm;
