import User from "../../components/user/user.component";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserInformations,
  getAllVoices,
} from "../../http/request-functions";
import { AuthContext } from "../../context/auth.context";
import { UserContext } from "../../context/user.context";
import Voice from "../../components/voice/voice.component";

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, xrfToken, setXrfToken } =
    useContext(AuthContext);
  const {
    setUserAccountInfos,
    userAccountInfos,
    userVoices,
    setUserVoices,
    numberOfvoices,
  } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated != null && xrfToken != null) {
      getUserInformations(xrfToken).then((res) => {
        if (res.ok === true && res.status == 200) {
          console.log("User authentication is valid");
          res.json().then((data) => {
            getAllVoices(xrfToken).then((voices) => {
              const userInfosToSet = {
                id: data.id,
                email: data.email,
                language: data.locale,
                tickets: data.tickets,
              };
              setUserAccountInfos(userInfosToSet);
              setUserVoices(voices);
              localStorage.setItem(
                "savedUserContext",
                JSON.stringify({
                  userAccountInfos: userInfosToSet,
                  userVoices: voices,
                  numberOfvoices: voices.length,
                })
              );
            });
          });
        } else {
          console.log("User Authentication is not valid");
          // navigate("/login");
        }
      });
    }
  }, [xrfToken, isAuthenticated]);

  return (
    <div id="homepage">
      {isAuthenticated ? (
        <>
          <User />
          {numberOfvoices > 0 && (
            <div className="voices-container">
              <h2>Voices</h2>
              {userVoices.map((voice, index) => {
                return (
                  <Voice
                    name={voice.name}
                    id={voice.id}
                    language={voice.language}
                    key={index}
                  />
                );
              })}
            </div>
          )}
        </>
      ) : (
        <h1>You are not authenticated, please login!</h1>
      )}
      {/* <Outlet /> */}
    </div>
  );
};

export default Home;
