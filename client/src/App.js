import { useContext, useEffect } from 'react';
import './App.css';
import Login from './components/login/Login';
import SignUp from './components/Siginup/Signup';
import { UserContext } from './context/usercontext';

function App() {
  const {user, setUser} = useContext(UserContext)
  const token = localStorage.getItem("jwt")

  const logout = () => {
    localStorage.removeItem("jwt")
    setUser(null)
  }

  useEffect(() => {
    fetch("http://localhost:3000/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(r => {
      if(r.ok){
        r.json().then(r => setUser(r))
      }
    })
  }, [token, setUser])

  return (
    <div className="w3-container-main hero">
      <div className="w3-card-4 card">
        <div className="w3-center login">
          <p>
            {user && user.username
              ? `logged in as ${user.username}`
              : "not logged in"}
          </p>
          {user ? (
            <button className="w3-btn w3-red logout" onClick={logout}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
      {!user ? (
        <div>
          <br /> <Login />
        </div>
      ) : null}
      {!user ? (
        <div>
          <SignUp />
        </div>
      ) : null}
    </div>
  );
}

export default App;
