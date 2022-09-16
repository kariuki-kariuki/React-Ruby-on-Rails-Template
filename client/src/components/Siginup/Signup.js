import React, { useContext, useState } from "react";
import { UserContext } from "../../context/usercontext";
import "./signup.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordCon] = useState("");
  const [email, setEmail] = useState('')
  const {setUser} = useContext(UserContext)
  const [error, setError] = useState(null)
  const role = "user"
  const [error1, setError1] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    passwordCheck();
  };

  const passwordCheck = () => {
    if (password !== password_confirmation) {
      setError("Password do not match")
    } else if (password.length < 8) {
      setError1("Password should be 8-20 char");
    } else if(password.length > 8){
      setError1(null)
    } else {
      sendRequest();
    }
  };

  const passwordConfirmation = (e) => {
    setPasswordCon(e.target.value)
    if((password.length === password_confirmation.length && password !== password_confirmation) || password.length < password_confirmation.length ){
      setError("Password Do not match")
    } else {
      setError(null)
    }
  }

  const sendRequest = () => {
    const registrationData = {
      username: username,
      password: password,
      password_confirmation: password_confirmation,
      email: email,
      role: role
    };

    fetch("http://localhost:3000/users", {
      method: 'POST',
      headers: {
        Accept : 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registrationData)
    })
    .then((r) => {
      if (r.ok) {
        r.json().then(r => {
          setUser(r)
          localStorage.setItem("jwt",r.jwt)
          setEmail('')
          setPassword('')
          setPasswordCon('')
          setError('')
          setError1('')
          setUsername('')
        });
      } else {
        alert("An error occured while login in");
      }
    });
  };

  return (
    <div className="w3-card-4 s12 l6 w3-col marg">
      <div className="w3-container w3-teal">
        <h2>Register</h2>
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
            
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="" className="w3-text-black">
            Email
          </label>
          <input
            type="email"
            name=""
            className="w3-input w3-border w3-sand"
            
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="" className="w3-text-red">
            {error1 ? error1 : null}
          </label>
        </p>
        <p>
          <label htmlFor="" className="w3-text-black">
            Password Confirmation
          </label>

          <input
            type="password"
            className="w3-input w3-border w3-sand"
            name=""
            
            required
            value={password_confirmation}
            onChange={(e) => passwordConfirmation(e)}
          />
          <label htmlFor="error" className="w3-text-red">
            {error ? error : null}
          </label>
        </p>
        <button type="submit" className="w3-btn w3-brown">
          Submit
        </button>
        <br />
        <br />
      </form>
    </div>
  );
}

export default SignUp;
