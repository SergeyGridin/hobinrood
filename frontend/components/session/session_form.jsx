import React from "react";
import { withRouter } from "react-router-dom";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
  }

  componentDidMount() {
    // this.props.location.state.isDemo only exists if demo login was triggered ( state was set to true)
    if (this.props.location.state) {
      this.handleDemoLogin();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleDemoLogin() {
    const username = "putin".split("");
    this.handleDemoUsername(username);
  }

  handleDemoUsername(putin) {
    setTimeout(() => {
      this.setState({ username: this.state.username + putin.shift() }, () => {
        if (putin.length === 0) {
          const password = "123456".split("");
          this.handleDemoPassword(password);
        } else {
          this.handleDemoUsername(putin);
        }
      });
    }, 150);
  }

  handleDemoPassword(pass) {
    setTimeout(() => {
      this.setState({ password: this.state.password + pass.shift() }, () => {
        if (pass.length === 0) {
          this.props.demoLogin(this.state);
        } else {
          this.handleDemoPassword(pass);
        }
      });
    }, 150);
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  componentWillUnmount() {
    this.props.receiveErrors([]);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => {
          return (
            <div key={i} className="session-errors-li">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <g fillRule="evenodd" transform="translate(0 -2)">
                  <circle cx="8" cy="10" r="8"></circle>
                  <text
                    fontFamily="DINPro-Black, DINPro"
                    fontSize="11.5"
                    fontWeight="700"
                    letterSpacing=".048"
                    fill="#fff"
                  >
                    <tspan x="5.729" y="14">
                      !
                    </tspan>
                  </text>
                </g>
              </svg>
              <li className="error-li" key={i}>
                {error}
              </li>
            </div>
          );
        })}
      </ul>
    );
  }

  render() {
    let buttonTxt, emailField, linkTxt;
    if (this.props.formType === "signup") {
      linkTxt = "Sign In";
      buttonTxt = "Sign Up";
      emailField = (
        <label>
          Email
          <br />
          <input
            required
            type="email"
            onChange={this.update("email")}
            value={this.state.email}
          />
          <br />
        </label>
      );
    } else {
      linkTxt = "Sign Up";
      buttonTxt = "Sign In";
      emailField = "";
    }

    return (
      <div className="sessionform">
        <div className="sessionform-image"></div>
        <div className="sessionform-text">
          <h2>Welcome to HobinRood</h2>
          <form onSubmit={this.handleSubmit}>
            {emailField}
            <label>
              Username
              <br />
              <input
                required
                type="text"
                onChange={this.update("username")}
                value={this.state.username}
              />
            </label>
            <br />
            <label>
              Password
              <br />
              <input
                required
                type="password"
                onChange={this.update("password")}
                value={this.state.password}
              />
            </label>
            <br />
            {this.renderErrors()}
            <br />
            <div className="session-buttons">
              <input className="button" type="submit" value={buttonTxt} />
            </div>
          </form>
        </div>
        {/* <video width="320" height="240" > 
          <source src="app/assets/images/FirstExperienceStopwatchMovie.mp4" type="video/mp4" />
        </video> */}
      </div>
    );
  }
}

export default withRouter(SessionForm);
