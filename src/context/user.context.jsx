import { useState, createContext, useEffect } from "react";

export const UserContext = createContext({
  userAccountInfos: {},
  userVoices: {},
  numberOfvoices: 0,
  setUserAccountInfos: () => {},
  setUserVoices: () => {},
  setNumberOfvoices: {},
});

export const UserProvider = ({ children }) => {
  const [userAccountInfos, setUserAccountInfos] = useState({});
  const [userVoices, setUserVoices] = useState({});
  const [numberOfvoices, setNumberOfvoices] = useState(0);

  useEffect(() => {
    let savedUserContext = JSON.parse(localStorage.getItem("savedUserContext"));

    if (savedUserContext) {
      setUserAccountInfos({
        id: savedUserContext.id,
        email: savedUserContext.email,
        language: savedUserContext.language,
        tickets: savedUserContext.tickets,
      });

      setUserVoices(savedUserContext.userVoices);
    } else {
      const initInfos = {
        id: "none",
        email: "none",
        language: "none",
        tickets: "none",
      };
      setUserAccountInfos(initInfos);
      setUserVoices({});
      localStorage.setItem(
        "savedUserContext",
        JSON.stringify({
          userAccountInfos: initInfos,
          userVoices: {},
          numberOfvoices: 0,
        })
      );
    }
  }, []);

  useEffect(() => {
    setNumberOfvoices(userVoices.length);
  }, [userVoices]);

  const value = {
    userAccountInfos,
    setUserAccountInfos,
    userVoices,
    setUserVoices,
    numberOfvoices,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
