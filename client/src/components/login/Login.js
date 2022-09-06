import React, { useState } from 'react'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordCon] = useState('')

  return (
    <form>
      <input
        type="text"
        name=""
        id=""
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        name=""
        id=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        name=""
        id=""
        value={password_confirmation}
        onChange={(e) => setPasswordCon(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login