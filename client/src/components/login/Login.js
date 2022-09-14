import React, { useState } from 'react'
import "./Login.css"

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordCon] = useState('')
  const [user, setUser] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    passwordCheck()
  }

  const passwordCheck = () => {
    if(password !== password_confirmation ){
      alert("Password do not match")
    } else if(password.length < 8 ) {
      alert("password must be 8 characters long")
    } else {
      sendRequest()
    }
  }

  const sendRequest = () => {
    const loginData = {
      username: username,
      password: password,
      password_confirmation: password_confirmation
    }

    fetch('http://localhost:3000/login')
    .then(r => {
      if(r.ok){
        r.json().then(setUser)
      } else {
        alert("An error occured while login in")
      }
    })
  }

  return (
    <div className="w3-card-4 s12 l6 w3-col marg">
      <div className="w3-container w3-teal">
        <h2>Login</h2>
      </div>
      <form className="w3-container" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="" className="w3-text-black">
            Username
          </label>
          <input
            type="text"
            name=""
            className="w3-input w3-border w3-sand"
            id=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="" className="w3-text-black">
            Password
          </label>

          <input
            type="password"
            className="w3-input w3-border w3-sand"
            name=""
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="" className="w3-text-black">
            Password Confirmation
          </label>

          <input
            type="password"
            className="w3-input w3-border w3-sand"
            name=""
            id=""
            value={password_confirmation}
            onChange={(e) => setPasswordCon(e.target.value)}
          />
        </p>
        <button type="submit" className='w3-btn w3-brown'>Submit</button>
      </form>
    </div>
  );
}

export default Login