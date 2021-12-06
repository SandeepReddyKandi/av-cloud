import React from "react";
import auth from "../services/authService";
import Joi from "joi-browser";
import Form from "./common/form";
import { Redirect } from "react-router";
import "../styles/register.scss";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      const user = await auth.login(username, password);
      console.log(' User is ', user);
      const { state } = this.props.location;
      if (state && state.from.pathname) {
        window.location = state.from.pathname
      } else {
       window.location = user.isadmin ? '/dashboard' : 'myStatus';
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const user = auth.getCurrentUser();

    if (!user) {
      console.log("DID NOT GET USER");
      return (
      <div className='register-container'>
        <div className='register-background'>
          <div className='background'/>
        </div>
        <div className='register-content'>
          <div className='form-container'>
            <h1 className="text-center">Login</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              <div className='button-cont d-flx justify-content-center'>
                {this.renderButton("Login")}
              </div>
            </form>
          </div>
        </div>
      </div>
      );
    } else {
      console.log("GOT USER");
      if (user && user.isadmin) {
        return (
          <Redirect
            to={{
              pathname: "/dashboard",
            }}
          />
        );
      } else {
        return (
          <Redirect
            to={{
              pathname: "/myStatus",
            }}
          />
        );
      }
    }
  }
}

export default LoginForm;
