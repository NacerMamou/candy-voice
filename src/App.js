import logo from "./logo.svg";

import { getSimpleToken } from "./http/request-functions";
import Navigation from "./routes/navigation/navigation.route";
import Home from "./routes/home/home.route";
import { Routes, Route, Navigate } from "react-router-dom";

import Auth from "./routes/auth/auth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="login" element={<Auth />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
