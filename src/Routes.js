import { CssBaseline } from "@material-ui/core";
import Detail from "./routes/Detail";
import List from "./routes/List";
import React from "react";
import { Router } from "@reach/router";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

const Routes = () => {
  return (
    <>
      <CssBaseline />

      <Router>
        <Detail path="/:id" />
        <List path="/" />
      </Router>
    </>
  );
};

export default Routes;
