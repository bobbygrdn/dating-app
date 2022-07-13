import { useState } from 'react'

const CreateInputs = (props) => {
  const {label, errorMessage, onChange, id, ...rest} = props;
  const [focused, setFocused ] = useState(false)


  /**onBlur + focused state is setting the value of focus to true whenever an input element is focused. It is written in the HTML, please see inspect form inputs for further explanation */
  const handleFocus = (e) => {
    setFocused(true)
  }

  return (
    <div className='createuser--Inputs'>
      <label>{label}</label>
      <input
      {...rest}
      onChange={onChange}
      onBlur={handleFocus}
      onFocus={() => rest.name === "verifyPassword" && setFocused(true)}
      focused={focused.toString()}/>
      <span className='form--errorMessages'>{errorMessage} </span>
    </div>
  )
}

export default CreateInputs;
