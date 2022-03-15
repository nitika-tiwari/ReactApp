import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
const apiUrl = 'http://localhost:8080';
axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem('token');
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
function SignIn() {
  const storedJwt = localStorage.getItem('token');
   const [jwt, setJwt] = useState(storedJwt || null);
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);


  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

     var { uname, pass } = document.forms[0];
     const userData = {
         username: uname.value,
         password: pass.value
       };

    axios.post('http://localhost:8080/login', userData)
        .then(res =>{
            console.log(res.data);
          if(res.data.statusCode == "200"){
            localStorage.setItem('token', res.data.token);
            setJwt(res.data.token);
              setIsSubmitted(true);
          } else {
            setErrorMessages({ name: "pass", message: res.data.message });
          }

        })
        .catch(err => {
          console.log(err)
        })

  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return(
    <div className="login-form">
         <div className="title">Sign In</div>
         {isSubmitted ? <Navigate to="/dashboard" /> : renderForm}
       </div>
  )
}
export default SignIn;
