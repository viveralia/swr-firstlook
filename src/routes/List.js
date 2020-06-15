import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Snackbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import useSWR, { mutate, trigger } from "swr";

import React from "react";
import UserCard from "../components/UserCard";
import axios from "axios";
import { useRequest } from "../hooks";

const useStyles = makeStyles({
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
});

const List = () => {
  const classes = useStyles();

  const usersEndpoint = "/users";

  const { data: users } = useSWR(usersEndpoint);

  const { makeRequest, data: success, error, isLoading } = useRequest({
    handleManualError: true,
  });

  const deleteUser = async (uuid) => {
    mutate(
      usersEndpoint,
      users.filter((user) => user.uuid !== uuid),
      false
    );

    await makeRequest(() => axios.delete(`${usersEndpoint}/${uuid}`));
    trigger(usersEndpoint);
  };

  return (
    <>
      {isLoading && <LinearProgress className={classes.progress} />}
      {error && <Snackbar open message="No se pudo eliminar al usuario" />}
      {success && <Snackbar open message="Usuario eliminado" />}

      <Container>
        <Box marginTop="1rem" marginBottom="1rem">
          <Box marginBottom="2rem">
            <Typography variant="h4" component="h1">
              Users
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {(users || [1, 2, 3]).map((user, i) => (
              <Grid key={user.uuid || i} item xs={12} md={6} lg={4} xl={3}>
                <UserCard user={user} deleteUser={deleteUser} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default List;
