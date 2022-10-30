import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Paper,
  Button,
  Typography,
  Modal,
  Box,
  FormControl,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";

function App() {
  const [data, setData] = useState();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  console.log(body, title);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "#DEB887" ? "#8FBC8F" : "#87CEFA",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      const json = await response.json();
      setData(json);
    };
    fetchData();
  }, []);

  const handleCreate = () => {
    setOpen(!open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      body: JSON.stringify({ userId: 1, title: title, body: body }),
    };

    const addData = async () => {
      let response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`,
        requestOptions
      );
      let res = await response.json();
      data.unshift(res);

      //clear data from input box

      setTitle("");
      setBody("");
      setOpen(!open);
    };
    addData();
  };

  const handleDelete = (id) => {
    setData(data.filter((row) => row.id != id));
    console.log(data.filter((row) => row.id != id));
  };
  const handleUpdate = (id) => {
    console.log(id);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Typography variant="h4" component="h4">
        Today's Post
      </Typography>
      <Button
        onClick={() => handleCreate()}
        variant="outlined"
        sx={{ size: "small" }}
      >
        Create New Post
        <AddIcon />
      </Button>
      <br />
      <br />
      <Grid container spacing={2}>
        {data?.map((row) => (
          <Grid item xs={4} className="post_list">
            <Item>
              <h2>{row.title}</h2>
              {row.body}
              <br />

              <Button
                onClick={() => handleUpdate(`${row.id}`)}
                sx={{ size: "small" }}
              >
                <CreateIcon />
              </Button>
              <Button
                onClick={() => handleDelete(`${row.id}`)}
                sx={{ size: "small" }}
              >
                <DeleteIcon />
              </Button>
            </Item>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleCreate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Create New Post
          </Typography>
          <br />
          <FormControl>
            <TextField
              style={{ width: "400px" }}
              id="outlined-basic"
              name="title"
              label="Post Title"
              variant="outlined"
              required
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Post Body"
              variant="outlined"
              multiline
              name="body"
              required
              type="text"
              rows="6"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
            <br />
            <Grid container>
              <Button
                onClick={handleSubmit}
                type="submit"
                variant="outlined"
                sx={{ m: 1 }}
              >
                Submit
              </Button>
              <Button onClick={handleCreate} variant="outlined" sx={{ m: 1 }}>
                Cancel
              </Button>
            </Grid>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}

export default App;
