import React, { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import { GoogleLogin } from "react-google-login";

import "./auth.css";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessfull. Try again later!");
  };

  const clientId =
    "588064018449-pqt1099ngtl9kuu0mnil73p158r0eakv.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        client_id: clientId,
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <div className="app__auth-bg image">
      <div className="app__auth">
        <div className="app__auth-header">
          {isSignUp ? "Sign Up" : "Sign In"} to Book your Table 🍽
        </div>
        <form>
          <div className="app__auth-data">
            {isSignUp && (
              <div className="app__auth-input">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="app__auth-input">
              <label>Email Id:</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email-ID"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="app__auth-input">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Your Password"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" onClick={handleSubmit}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <GoogleLogin
            clientId="588064018449-pqt1099ngtl9kuu0mnil73p158r0eakv.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <img
                  src="https://i0.wp.com/nanophorm.com/wp-content/uploads/2018/04/google-logo-icon-PNG-Transparent-Background.png?w=1000&ssl=1"
                  alt="g"
                  className="gimage"
                />
                Google Sign In
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <button
            type="button"
            onClick={switchMode}
            style={{
              backgroundColor: "var(--color-crimson)",
              color: "var(--color-black)",
            }}
          >
            {isSignUp
              ? "Already have an Account? Sign In"
              : "Don't have an Account? Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
