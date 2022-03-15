import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';

function Logout() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const storedJwt = localStorage.removeItem('token');
  //  setIsSubmitted(false);
   return(
         <Navigate to="/signin" />

    // <div className="dashboard-page">
    //   Dashboard
    // </div>
  )
}
export default Logout;
