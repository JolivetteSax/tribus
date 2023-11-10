
import React from "react";
import { Navigate, Link } from 'react-router-dom';

import Session from '../api/Session';

import '../stylesheets/Main.css';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.session = new Session();
    // let email = this.session.getUser();
    this.state = {
       stillAuthorized: true,
    };
    this.logout = this.logout.bind(this);
  }

  logout(ev) {
    ev.preventDefault();
    this.setState({ working: true });
    this.session.logout()
      .then((result) => {
        this.setState({ stillAuthorized: false });
      });
  }
  componentDidMount() {
    this.session.isLoggedIn(true)
      .then((stillAuthorized) => {
        this.setState({ stillAuthorized });
      });
  }

  render() {
    if (!this.state.stillAuthorized) {
      return <Navigate to="/auth" />
    }

    return (
      <>
        <div className="Main-container">

          <div className="User-controls">

            <Link className="btn btn-light" to="/personal">
              My Collection
            </Link>
            &nbsp;
            <button className="btn btn-light" onClick={this.logout}>
              &gt;&gt; Sign out
            </button>
          </div>
          <div className="break"></div>
          <div className="Gallery-container">
            <div className="Gallery">Salon</div>
          </div>
        </div>

      </>
    );
  }
};