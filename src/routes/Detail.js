import { Box, Container, Typography } from "@material-ui/core";

import React from "react";
import { Skeleton } from "@material-ui/lab";
import axios from "axios";
import { useParams } from "@reach/router";
import useSWR from "swr";

const Detail = () => {
  const { id } = useParams();

  const fetcher = async (endpoint) => {
    const { data } = await axios.get(endpoint);
    return data;
  };

  const { data: user } = useSWR(`/users/${id}`, fetcher);

  return (
    <Container>
      <Box marginTop="1rem" marginBottom="1rem">
        <Box marginBottom="2rem">
          <Typography variant="h4" component="h1">
            {user?.name || <Skeleton variant="text" width={200} height={41} />}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Detail;
