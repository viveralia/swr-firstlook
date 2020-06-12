import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

import React from "react";
import { Skeleton } from "@material-ui/lab";
import { navigate } from "@reach/router";

const UserCard = ({ user, deleteUser }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" component="h2">
          {user?.name || <Skeleton variant="text" width={200} height={32} />}
        </Typography>
        <Typography color="textSecondary">
          {user?.role || <Skeleton variant="text" width={160} height={24} />}
        </Typography>
      </CardContent>

      <CardActions>
        {user?.uuid ? (
          <Button size="small" onClick={() => navigate(`/${user.uuid}`)}>
            Learn More
          </Button>
        ) : (
          <Skeleton
            variant="text"
            width={80}
            height={30}
            style={{ marginLeft: "0.5rem" }}
          />
        )}

        {user?.uuid ? (
          <Button size="small" onClick={() => deleteUser(user.uuid)}>
            Delete
          </Button>
        ) : (
          <Skeleton
            variant="text"
            width={70}
            height={30}
            style={{ marginLeft: "1rem" }}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default UserCard;
