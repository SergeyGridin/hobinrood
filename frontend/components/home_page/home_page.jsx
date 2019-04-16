import React from 'react';
// import { Link } from 'react-router-dom';
import NavBar from './../nav_bar/nav_bar';
import Splash from '../splash/splash';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.demoLogin = this.demoLogin.bind(this);
  }

  demoLogin() {
    this.props.history.push({
      pathname: '/login',
      state: { isDemo: true }
    });
  }
  
  render() {
    const { currentUser, logout } = this.props;

    const display = currentUser ? (
      <div className="greet">
        <p>Hello, {currentUser.username}</p>
      </div>
    ) : (
        <div>
          <Splash />
        </div>
      );

    return (
      <div>
        <NavBar currentUser={currentUser} logout={logout} demoLogin={this.demoLogin}/>
        <br/>
        {display}
      </div>
    );
  }

}


export default HomePage;
