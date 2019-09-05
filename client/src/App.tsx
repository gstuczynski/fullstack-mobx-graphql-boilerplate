import React from "react";
import { Route, Switch } from "react-router-dom";
import { Profile } from "./components/Profile";
import { MessageWall } from "./components/MessageWall";

import "./App.css";
import Home from "./Home";

const App = () => (
  <>
    <Profile />
    <MessageWall />
  </>
);

export default App;
