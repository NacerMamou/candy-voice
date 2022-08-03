import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSimpleToken,
  getUserInformations,
} from "../../http/request-functions";
import { AuthContext } from "../../context/auth.context";

const Auth = () => {
  const { isAuthenticated, setIsAuthenticated, setXrfToken, xrfToken } =
    useContext(AuthContext);
  let navigate = useNavigate();
  const [typedEmail, setTypedEmail] = useState("");
  const [typedPassword, setTypedPassword] = useState("");
  const authSubmitHandler = (e) => {
    e.preventDefault();
    let response = getSimpleToken(typedEmail, typedPassword, true);
    response
      .then((res) => {
        if (res.status === 200) {
          setIsAuthenticated(true);
          setXrfToken(res.data.xsrf_token);
          localStorage.setItem(
            "savedAuthContext",
            JSON.stringify({
              isAuthenticated: true,
              xrfToken: res.data.xsrf_token,
            })
          );
          navigate("/");
        }
      })
      .catch((err) => {
        alert(`${err.response.statusText}, ${err.response.data.error}, try again!`);
      });
  };
  const emailChangeHandler = (e) => {
    setTypedEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setTypedPassword(e.target.value);
  };
  return (
    <div id="login-page">
      <form action="" onSubmit={authSubmitHandler}>
        <div className="email-container">
          <label>Email</label>
          <input type="email" onChange={emailChangeHandler} />
        </div>
        <div className="password-container">
          <label>Password</label>
          <input type="password" onChange={passwordChangeHandler} />
        </div>
        <input type="submit" className="submit-button" />
      </form>
    </div>
  );
};

export default Auth;
