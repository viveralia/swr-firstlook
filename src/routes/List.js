import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

import React from "react";
import { Skeleton } from "@material-ui/lab";
import axios from "axios";
import { navigate } from "@reach/router";
import useSWR from "swr";

const List = () => {
  const fetcher = async (endpoint) => {
    const { data } = await axios.get(endpoint);
    return data;
  };

  const { data: users } = useSWR("/users", fetcher);

  return (
    <Container>
      <Box marginTop="1rem" marginBottom="1rem">
        <Box marginBottom="2rem">
          <Typography variant="h4" component="h1">
            Users
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {(users || [1, 2, 3, 4]).map((user, i) => (
            <Grid key={user.uuid || i} item xs={12} md={6} lg={4} xl={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {user?.name || (
                      <Skeleton variant="text" width={200} height={32} />
                    )}
                  </Typography>
                  <Typography color="textSecondary">
                    {user?.role || (
                      <Skeleton variant="text" width={160} height={24} />
                    )}
                  </Typography>
                </CardContent>
                <CardActions>
                  {user?.uuid ? (
                    <Button
                      size="small"
                      onClick={() => navigate(`/${user.uuid}`)}
                    >
                      Learn More
                    </Button>
                  ) : (
                    <Skeleton
                      variant="text"
                      width={94}
                      height={30}
                      style={{ marginLeft: "0.5rem" }}
                    />
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default List;
