import { useState } from "react";
import User from "./User";
import Repos from "./Repos";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setUsername(input);
    setInput("");
  };

  return (
    <Grid container spacing={2} direction="column">
      {/* Search Group */}
      <Grid
        item
        xs={2}
        container
        direction="row"
        alignContent={"center"}
        justifyContent={"center"}
      >
        {/* Search Field */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Search a Github User"
            variant="outlined"
            size="small"
            value={input}
            onChange={changeHandler}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitHandler(e);
              }
            }}
          />
        </Grid>
        {/* Search Button */}
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SearchIcon />}
            onClick={(e) => {
              submitHandler(e);
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {/* User Info Group */}
      {username ? (
        <Grid
          container
          direction="row"
          alignContent={"center"}
          justifyContent={"center"}
          sx={{ flexDirection: { xs: "column", md: "row" }, mt: "3em" }}
        >
          <Grid item xs={2}>
            <User username={username} />
          </Grid>
          <Grid item xs={2}>
            <Repos username={username} />
          </Grid>
        </Grid>
      ) : (
        <p>Type a username</p>
      )}
    </Grid>
  );
}

export default Search;
