import React from "react";
import '../stylesheets/welcome.css';
import { Link } from 'react-router-dom';


export default class Welcome extends React.Component {
  render() {
    return <>
      <div className="background">
        <div className="overlay">
          <div className="overlay-content">

            <p>
              
              Tracking design alternatives
              <br/>
              Manage projects and priorities
              <br/>
              Clear decision-making
              <br/>           
            </p>
            <div className="d-grid gap-1 mt-3">
              <Link to="/login">
              <button className="btn btn-primary">
                Sign In
              </button>
              </Link>
            </div>

            <div className="d-grid gap-1 mt-3">

            </div>

          </div>
        </div>
      </div>

    </>
  }
};