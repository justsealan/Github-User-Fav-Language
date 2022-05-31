import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { Typography } from "@mui/material";

function User(props) {
  const [userData, setUserData] = useState({});
  const [hasError, setHasError] = useState(false);

  //   Github api token
  const token = "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";

  useEffect(() => {
    fetch(`https://api.github.com/users/${props.username}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.message ? setHasError(true) : setUserData(data);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      });
  }, [props.username]);

  return (
    <Box>
      { hasError && (
        <Alert severity="error" color="error">
          User not found
        </Alert>
      )}
      {!props.username ? (
        <p>Loading..</p>
      ) : (
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={4}>
            <Link href={userData.html_url} target="_blank" underline="hover">
              <Typography variant="h5">{userData.name}</Typography>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href={userData.html_url} target="_blank" underline="hover">
              <Avatar
                src={userData.avatar_url}
                alt="avatar"
                sx={{ m: "1.25em", width: 200, height: 200 }}
              />
            </Link>
          </Grid>
          <Grid item xs={4} justifyContent={"center"}>
            <Alert severity="info" color="info">
              Number of repositories: {userData.public_repos}
            </Alert>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default User;
