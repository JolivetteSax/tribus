
import React from "react";
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import Session from '../api/Session';

import '../stylesheets/Main.css';


export default class myProjects extends React.Component {

  constructor(props) {
    super(props);
    this.session = new Session();
    this.state = {
      stillAuthorized: true,
    };
  }

  componentDidMount() {
    this.session.isLoggedIn(true)
      .then((stillAuthorized) => {
        if(!stillAuthorized){
          return this.setState({stillAuthorized});
        }
/*        this.session.callApi('/items')
          .then((items) => {
            console.log(items);
            this.setState({ items: items.json });
          });*/
      });
  }

  render() {
    if (!this.state.stillAuthorized) {
      return <Navigate to="/auth" />
    }
    return (
      <>
        <div className="Main-container">
        </div>
      </>
    );
  }
};