import { useState } from 'react'

const LoginInputs = (props) => {

  const {label, errorMessage, onChange, id, ...rest} = props;
  const [focused, setFocused] = useState(false)

  const handleFocus = (e) => {
    setFocused(true)
  }

  return(
  <div className="login--formInput">
    <label>{label}</label>
    <input
    {...rest}
    onChange={onChange} 
    onBlur={handleFocus}
   focused={focused.toString()}
    />
    <span className='form--errorMessages'>{errorMessage}</span>
  </div>
  )
}

export default LoginInputs;