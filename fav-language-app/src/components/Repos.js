import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircleChart from "./CircleChart";
import Alert from "@mui/material/Alert";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import SortIcon from "@mui/icons-material/Sort";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";

function Repos(props) {
  const [repos, setRepos] = useState([]);
  const [clicked, setClicked] = React.useState(false);
  const [hasError, setHasError] = useState(false);
  let languages = [];

  const handleChange = () => {
    setClicked((prev) => !prev);
  };
  //   Github api token
  const token = "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";

  useEffect(() => {
    fetch(`https://api.github.com/users/${props.username}/repos`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.message ? setHasError(true) : setRepos(data);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      });
  }, [props.username]);

  //   if username is not found

  languages = repos.map((repo) => repo.language);

  // sort languages
  languages.sort();

  // if it has only null values, then return null
  if (languages.every((language) => language === null)) {
    return (
      <Alert severity="error" color="error">
        No language found. Please refresh the page and try again.
      </Alert>
    );
  }

  //filter out null values
  const filteredLanguages = languages.filter((language) => language !== null);

  //most used language
  let max = 0;
  let result;
  let frequency = 1;
  for (let i = 0; i < filteredLanguages.length - 1; i++) {
    if (filteredLanguages[i] === filteredLanguages[i + 1]) {
      frequency++;
    } else {
      frequency = 1;
    }
    if (frequency > max) {
      max = frequency;
      result = filteredLanguages[i];
    }
  }

  return (
    <Box>
      {/* Show most used language as favourite lang*/}
      {!hasError && (
        <Grid container spacing={0} direction="column" alignItems="center">
          <Grid item xs={5}>
            <CircleChart languages={filteredLanguages} />
          </Grid>
          <Grid item xs={4}>
            <Alert severity="success" color="success" sx={{ m: "1em" }}>
              Favourite language: {result}
            </Alert>
          </Grid>

          {/* Click to see all repos */}
          <Grid item xs={3}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
              onClick={handleChange}
            >
              <SortIcon /> Show all repositories
            </Fab>
            {repos.map((repo) => {
              return (
                <Zoom
                  key={repo.id}
                  in={clicked}
                  sx={{ transitionDelay: clicked ? "500ms" : "0ms" }}
                >
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                    aria-label="repository list"
                  >
                    <ListItem>
                      <ListItemButton href={repo.html_url}>
                        <ListItemText primary={repo.name} />
                        <ListItemText primary={repo.language} />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Zoom>
              );
            })}
          </Grid>
        </Grid>
      )}

      {hasError && (
        <Alert severity="error" color="error">
          Please refresh the page and try again
        </Alert>
      )}
    </Box>
  );
}

export default Repos;
