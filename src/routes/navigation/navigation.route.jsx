import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import { UserContext } from "../../context/user.context";

const Navigation = () => {
  const { isAuthenticated, setIsAuthenticated, setXrfToken } =
    useContext(AuthContext);
  const { setUserAccountInfos, setUserVoices } = useContext(UserContext);

  const signOutClickHandler = (e) => {
    // e.preventDefault();

    setIsAuthenticated(false);
    setXrfToken("none");

    const userInfosToSet = {
      id: "none",
      email: "none",
      language: "none",
      tickets: "none",
    };
    setUserAccountInfos(userInfosToSet);
    setUserVoices({});
    localStorage.setItem(
      "savedAuthContext",
      JSON.stringify({
        isAuthenticated: false,
        xrfToken: "none",
      })
    );
    localStorage.setItem(
      "savedUserContext",
      JSON.stringify({
        setUserAccountInfos: userInfosToSet,
        userVoices: {},
        numberOfVoices: 0,
      })
    );
  };
  return (
    <Fragment>
      <div id="navigation">
        <Link to="/" className="logo-container">
          <img src="https://webapp.candyvoice.com/assets/img/logo-300x178.png" />
        </Link>
        <div className="navlinks-container">
          {isAuthenticated ? (
            <Link to="/login" onClick={signOutClickHandler}>
              SIGN OUT
            </Link>
          ) : (
            <Link to="/login">SIGN IN</Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
