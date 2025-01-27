import React from 'react'
import "../App.css";
import { Link } from 'react-router-dom';

export default function landingPage() {
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navheader">
          <h2>DevTv Video Call</h2>
        </div>

        <div className="navlist">
          <p>Join as Guest</p>
          <p>Register</p>

          <div role="button">
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
            <h1>
              <span style={{ color: "#FF8939" }}>Connect</span> with your loved Ones
            </h1>
            
            <p>Cover a distance by DevTv Video Call </p>

            <div role='button'>
              <Link to={"/home"}>Get Started</Link>
            </div>
        
        </div>

        <div>
            <img src="/mobile.png" alt="" />
        </div>
      </div>
    </div>
  );
}
