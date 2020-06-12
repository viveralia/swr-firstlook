import { Box, Container, Grid, Typography } from "@material-ui/core";
import useSWR, { mutate, trigger } from "swr";

import React from "react";
import UserCard from "../components/UserCard";
import axios from "axios";

const List = () => {
  const fetcher = async (endpoint) => {
    const { data } = await axios.get(endpoint);
    return data;
  };

  const usersEndpoint = "/users";

  const { data: users } = useSWR(usersEndpoint, fetcher);

  const deleteUser = async (uuid) => {
    mutate(
      usersEndpoint,
      users.filter((user) => user.uuid !== uuid),
      false
    );
    await axios.delete(`${usersEndpoint}/${uuid}`);
    trigger(usersEndpoint);
  };

  return (
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
  );
};

export default List;
