import React from 'react'
import CreateUserForm from './CreateUserForm'
import '../../ComponentStyles/Landing.css'

const gender = []
const random = []
const sizes = []
const initialPositions = []

function coinToss(possibilities) {
  return Math.floor(Math.random() * 2) ?
  possibilities[0] : possibilities[1]
}
// just - run eight times
for (let _ = 0; _ < 8; _++) {
  random.push(Math.floor(Math.random() * 70))
  gender.push(coinToss([true, false]))
  sizes.push(Math.floor(Math.random() * (266 - 150) + 150))
  initialPositions.push([
    Math.floor(Math.random() * coinToss([100, -100])),
    Math.floor(Math.random() * coinToss([100, -100]))
  ])
}

export default function Landing() {
  return (
    <div id="landing-root">
      <div id="landing-bg"></div>
      <div className="box">
        <img src={`https://xsgames.co/randomusers/assets/avatars/${gender[0] ? 'male' : 'female'}/${random[0]}.jpg`}
         alt="female"
         className="bubble"
         style={{
          height: `${sizes[0]}px`,
          transform: `translate(${initialPositions[0][0]}px,${initialPositions[0][1]}px)`
        }}/>
      </div>
      <div className="box">
        <img src={`https://xsgames.co/randomusers/assets/avatars/${gender[1] ? 'male' : 'female'}/${random[1]}.jpg`}
         alt="female"
         className="bubble"
         style={{
          height: `${sizes[1]}px`,
          transform: `translate(${initialPositions[1][0]}px,${initialPositions[1][1]}px)`
        }}/>
      </div>
      <div className="box">
        <img src={`https://xsgames.co/randomusers/assets/avatars/${gender[2] ? 'male' : 'female'}/${random[2]}.jpg`}
         alt="female"
         className="bubble"
         style={{
          height: `${sizes[2]}px`,
          transform: `translate(${initialPositions[2][0]}px,${initialPositions[2][1]}px)`
        }}/>
      </div>
      <div className="box">
        <img src={`https://xsgames.co/randomusers/assets/avatars/${gender[3] ? 'male' : 'female'}/${random[3]}.jpg`}
         alt="female"
         className="bubble"
         style={{
          height: `${sizes[3]}px`,
          transform: `translate(${initialPositions[3][0]}px,${initialPositions[3][1]}px)`
        }}/>
      </div>
      <div className="box">
        <img src={`https://xsgames.co/randomusers/assets/avatars/${gender[4] ? 'male' : 'female'}/${random[4]}.jpg`}
         alt="female"
         className="bubble"
         style={{
          height: `${sizes[4]}px`,
          transform: `translate(${initialPositions[4][0]}px,${initialPositions[4][1]}px)`
        }}/>
      </div>
      <div className="box" id="infoBox">
        <h1>.Find(luv)</h1>
        {/* paragraph with cool animation goes here */}
        <button>Sign Up</button>
        <button>Log In</button>
      </div>
      <div className="box empty"></div>
      <div className="box">
        <img src={`https://xsgames.co/randomusers/assets/avatars/${gender[5] ? 'male' : 'female'}/${random[5]}.jpg`}
         alt="female"
         className="bubble"
         style={{
          height: `${sizes[5]}px`,
          transform: `translate(${initialPositions[5][0]}px,${initialPositions[5][1]}px)`
        }}/>
      </div>
      <div className="box">
        <img src={`https://xsgames.co/randomusers/assets/avatars/${gender[6] ? 'male' : 'female'}/${random[6]}.jpg`}
         alt="female"
         className="bubble"
         style={{
          height: `${sizes[6]}px`,
          transform: `translate(${initialPositions[6][0]}px,${initialPositions[6][1]}px)`
        }}/>
      </div>
      <div className="box">
        <img src={`https://xsgames.co/randomusers/assets/avatars/${gender[7] ? 'male' : 'female'}/${random[7]}.jpg`}
         alt="female"
         className="bubble"
         style={{
          height: `${sizes[7]}px`,
          transform: `translate(${initialPositions[7][0]}px,${initialPositions[7][1]}px)`
        }}/>
      </div>
      <div className="box empty"></div>
      {/* <CreateUserForm /> */}
    </div>
  )
}
