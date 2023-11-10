
import React from "react"
import { Navigate, Link } from 'react-router-dom';

import Session from '../api/Session';

import '../stylesheets/Auth.css';


export default class Auth extends React.Component {

  constructor(props) {
    super(props);
    this.session = new Session();
    let email = this.session.getUser();
    if (!email) {
      email = '';
    }
    this.state = {
      email,
      pass: '',
      login: false,
      invalid: false,
      attempts: 0,
      stillAuthorized: false,
      working: false,
    };
    this.submit = this.submit.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleEmail = (ev) => {
    this.setState({ email: ev.target.value });
  };
  handlePass = (ev) => {
    this.setState({ pass: ev.target.value })
  };

  submit(ev) {
    ev.preventDefault();
    this.setState({ working: true });
    this.session.login(this.state.email, this.state.pass)
      .then(login => {
        let invalid = !login;
        let attempts = 0;
        if (invalid) {
          attempts = this.state.attempts + 1;
        }
        this.setState({ login, invalid, attempts, working: false });
      });
  }

  logout(ev) {
    ev.preventDefault();
    this.setState({ working: true });
    this.session.logout()
      .then((result) => {
        this.setState({ login: false, invalid: false, working: false, stillAuthorized: false });
      });
  }

  componentDidMount() {
    this.session.isLoggedIn(true)
      .then((stillAuthorized) => {
        this.setState({ stillAuthorized });
      });
  }

  render() {
    if (this.state.login) {
      return <Navigate to="/main" />
    }
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={this.submit}>
          <div className="Auth-form-content">
            {!this.state.stillAuthorized &&
              <h3 className="Auth-form-title">Sign in</h3>
            }

            {this.state.stillAuthorized &&
              <>
                <h3 className="Auth-form-title-already">Already Signed in</h3>
                <Link to="/">Continue</Link>
              </>
            }
            {this.state.invalid &&
              <h5 className="Auth-incorrect">Incorrect username or password({this.state.attempts})</h5>
            }
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleEmail}
              />
            </div>
            <div className="form-group mt-3">
              {!this.state.stillAuthorized &&
                <span>
                  <label>Password</label>
                  <input
                    type="password"
                    value={this.state.pass}
                    onChange={this.handlePass}
                    className="form-control mt-1"
                    placeholder="Enter password"
                  />
                </span>
              }
            </div>
            <div className="d-grid gap-2 mt-3">
              {!this.state.stillAuthorized &&
                <>
                  {this.state.working &&
                    <button disabled type="submit" className="btn btn-primary">
                      Submitting...
                    </button>
                  }
                  {!this.state.working &&
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  }
                </>
              }
              {this.state.stillAuthorized &&
                <>
                  {this.state.working &&
                    <button disabled className="btn btn-primary">
                      Logging out...
                    </button>
                  }
                  {!this.state.working &&
                    <button className="btn btn-info" onClick={this.logout}>
                      &gt;&gt; Sign out
                    </button>
                  }
                </>
              }
            </div>
            {!this.state.stillAuthorized &&
              <p className="forgot-password text-right mt-2">
                Forgot <a href="#">password?</a>
              </p>
            }
          </div>
        </form>
      </div>
    )
  }
}