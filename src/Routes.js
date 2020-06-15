import { CssBaseline } from "@material-ui/core";
import Detail from "./routes/Detail";
import List from "./routes/List";
import React from "react";
import { Router } from "@reach/router";
import { SWRConfig } from "swr";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

const Routes = () => {
  const globalFetcher = async (endpoint) => {
    const { data } = await axios.get(endpoint);
    return data;
  };

  const globalErrorHandler = (error) => {
    alert(error.message);
  };

  return (
    <>
      <CssBaseline />

      <SWRConfig
        value={{
          fetcher: globalFetcher,
          onError: globalErrorHandler,
        }}
      >
        <Router>
          <Detail path="/:id" />
          <List path="/" />
        </Router>
      </SWRConfig>
    </>
  );
};

export default Routes;
