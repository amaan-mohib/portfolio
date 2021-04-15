import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { userSignedIn, signOut } from "./firebase";
import {
  MdExpandLess,
  MdExpandMore,
  MdDescription,
  MdLink,
  MdLanguage,
  MdAdd,
  MdClose,
  MdEdit,
  MdDelete,
  MdHome,
  MdFolder,
} from "react-icons/md";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import history from "./history";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useRef } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  nested: {
    backgroundColor: "#e7e6e7",
    margin: "10px",
    borderRadius: "5px",
  },
  right: {
    justifyContent: "flex-end",
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

export default function ProjectAdd(props) {
  const [items, setItems] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [gitAvatar, setGitAvatar] = useState("");
  const [login, setLogin] = useState("");
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  function Msg() {
    if (props.msg) {
      return (
        <div className="msg">
          <Collapse in={open} unmountOnExit>
            <Alert
              variant="filled"
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(!open);
                  }}>
                  <MdClose />
                </IconButton>
              }>
              {props.msg}
            </Alert>
          </Collapse>
        </div>
      );
    } else return <div></div>;
  }
  useEffect(() => {
    setTimeout(() => {
      let user = firebase.auth().currentUser;
      if (user) {
        setName(user.displayName);
        setAvatar(user.photoURL);
      } else {
        setName("Timeout failed");
        setAvatar("https://www.w3schools.com/w3css/img_avatar3.png");
      }

      history.replace({ pathname: "/projects", state: "" });
    }, 3000);
    userSignedIn();
    const signout = document.getElementById("signout");
    signout.onclick = () => signOut();

    //GitHub API
    const fetchRepos = async () => {
      const data = await fetch(
        "https://api.github.com/users/amaan-mohib/repos"
      );
      const items = await data.json();
      console.log(items);
      setItems(items);
      setLogin(items[0].owner.login);
      setGitAvatar(items[0].owner.avatar_url);
    };
    fetchRepos();

    //Get projects in firestore
    const getProjects = () => {
      let db = firebase.firestore();
      const getCollection = db.collection("projects");
      getCollection.onSnapshot(function (querysnapShot) {
        const docs = querysnapShot.docs.map((doc) => doc.data());
        setAddedItems(docs);
        console.log(docs);
      });
    };
    getProjects();
  }, []);
  return (
    <div className="add-page">
      <div id="signed-out" className="signed-out">
        <nav className="navbar">
          <h1>
            <Link to="/login">Login</Link> to add / remove projects.
          </h1>
        </nav>
      </div>
      <div id="signed-in" className="signed-in" style={{ display: "none" }}>
        <nav className="navbar">
          <h1>Projects</h1>
          <div className="nav-buts">
            <Button id="signout" variant="contained" color="primary">
              Log out
            </Button>
          </div>
        </nav>
        <Divider />
        <div>
          <Link to="/">
            <IconButton id="home" aria-label="home" color="primary">
              <MdHome />
            </IconButton>
          </Link>
          <Link to="/links">
            <IconButton aria-label="home" color="primary">
              <MdLink />
            </IconButton>
          </Link>
          <Link to="/projects">
            <IconButton aria-label="home" color="primary">
              <MdFolder />
            </IconButton>
          </Link>
        </div>
        <Divider />
        <Msg />
        <div className="sign-in-info">
          <div style={{ marginBottom: "5px" }}>Signed in as</div>
          <div>
            <img alt={name} src={`${avatar}`} />
            <span>{name} | </span>
            <div style={{ width: "10px" }}></div>
            <img alt="GitAvtr" src={`${gitAvatar}`} />
            <span>{login}</span>
          </div>
        </div>
        <div id="project-div" className="project-div">
          <div id="project-titles" className="project-titles">
            <Paper component="div" className={classes.root}>
              <List
                component="div"
                subheader={
                  <ListSubheader
                    key="titleHeader"
                    component="div"
                    disableSticky>
                    Titles
                  </ListSubheader>
                }
                className={classes.root}>
                <Divider />
                {items.map((item) => {
                  return (
                    <TitleList
                      item={item}
                      key={item.id}
                      id={item.id}
                      buttons="add"
                    />
                  );
                })}
              </List>
            </Paper>
          </div>
          <div className="added-projects">
            <Paper component="div" className={classes.root}>
              <List
                component="div"
                subheader={
                  <ListSubheader
                    key="addedTitlesHeader"
                    component="div"
                    disableSticky>
                    Added Titles
                  </ListSubheader>
                }
                className={classes.root}>
                <Divider />
                {addedItems.map((item, index) => {
                  return (
                    <TitleList
                      item={item}
                      key={index}
                      id={index}
                      buttons="edit"
                    />
                  );
                })}
              </List>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

function TitleList(props) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div key={props.id}>
      <ListItem
        key={props.item.name + "-" + props.id}
        button
        onClick={handleClick}>
        <ListItemText
          key={props.item.name + "-item-" + props.id}
          primary={props.item.name}
        />
        {open ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
      </ListItem>
      <Collapse key={props.id} in={open} unmountOnExit timeout="auto">
        <Divider key="d1" />
        {props.buttons === "add" ? (
          <TitleNameList id={props.id} item={props.item} />
        ) : (
          <AddedTitles id={props.id} item={props.item} />
        )}
        <Divider key="d2" />
      </Collapse>
    </div>
  );
}
function TitleNameList(props) {
  const classes = useStyles();
  return (
    <List
      key={props.item.id + "list"}
      disablePadding
      component="div"
      className={classes.nested}>
      <ListItem key="10">
        <ListItemIcon>
          <MdDescription size={24} />
        </ListItemIcon>
        <ListItemText primary={`${props.item.description}`} />
      </ListItem>
      <ListItem key="11">
        <ListItemIcon>
          <MdLink size={24} />
        </ListItemIcon>
        <ListItemText primary={props.item.html_url} />
      </ListItem>
      <ListItem key="12">
        <ListItemIcon>
          <MdLanguage size={24} />
        </ListItemIcon>
        <ListItemText primary={props.item.language} />
      </ListItem>
      <Add item={props.item} />
    </List>
  );
}
function AddedTitles(props) {
  const classes = useStyles();
  return (
    <Card key={props.item.id + "card"} className={classes.nested}>
      <CardMedia
        component="img"
        height="140"
        title={props.item.name + " (" + props.item.img_type + ")"}
        image={props.item.image}
      />
      <CardContent>
        <List disablePadding component="div">
          <ListItem key="20">
            <ListItemIcon>
              <MdDescription size={24} />
            </ListItemIcon>
            <ListItemText primary={`${props.item.description}`} />
          </ListItem>
          <ListItem key="21">
            <ListItemIcon>
              <MdLink size={24} />
            </ListItemIcon>
            <ListItemText
              primary={`${props.item.html_url} ( ${props.item.type} )`}
            />
          </ListItem>
          <ListItem key="22">
            <ListItemIcon>
              <MdLanguage size={24} />
            </ListItemIcon>
            <ListItemText primary={props.item.language} />
          </ListItem>
        </List>
      </CardContent>
      <Edit item={props.item} />
    </Card>
  );
}
function Add(props) {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpen2(false);
  };

  //Add projects to firestore
  const addProjects = (item) => {
    let db = firebase.firestore();
    let docRef = db.collection("projects").doc(`${item.name}`);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("doc exists");
        setOpen2(true);
      } else {
        docRef
          .set({
            name: item.name,
            description: item.description,
            html_url: item.html_url,
            image: "https://amaan-mohib.github.io/assets/img/movie_icon.png",
            language: item.language,
            type: "repo",
            img_type: "banner",
          })
          .then(function () {
            handleClick();
          });
      }
    });
  };
  const classes = useStyles();
  return (
    <ListItem key="14" className={classes.right}>
      <Button
        id="addBut"
        variant="contained"
        onClick={() => {
          addProjects(props.item);
        }}
        startIcon={<MdAdd size={24} />}>
        Add
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert variant="filled" severity="success" onClose={handleClose}>
          {props.item.name} added
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open2}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert variant="filled" severity="info" onClose={handleClose}>
          {props.item.name} exists
        </Alert>
      </Snackbar>
    </ListItem>
  );
}
function Edit(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const openForm = () => {
    ref.current.handleOpen();
  };
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  //Remove Project
  const removeProject = (item) => {
    let db = firebase.firestore();
    let docRef = db.collection("projects").doc(`${item.name}`);
    setName(`${item.name}`);
    docRef
      .delete()
      .then(function () {
        console.log("deleted");
        handleClick();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <CardActions key={"cardAction" + props.item.id} className={classes.right}>
      <Button
        className="mr5"
        variant="contained"
        color="primary"
        onClick={openForm}
        startIcon={<MdEdit size={24} />}>
        Edit
      </Button>
      <Form item={props.item} ref={ref} />
      <Button
        id="remove"
        variant="contained"
        color="secondary"
        startIcon={<MdDelete size={24} />}
        onClick={() => {
          removeProject(props.item);
        }}>
        Remove
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert variant="filled" severity="error" onClose={handleClose}>
          {name} deleted
        </Alert>
      </Snackbar>
    </CardActions>
  );
}
const Form = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: props.item.name,
      img: props.item.image,
      link: props.item.html_url,
      linkType: props.item.type,
      lang: props.item.language,
      desc: props.item.description,
      imgType: props.item.img_type,
    }
  );
  const classes = useStyles();
  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setValue({ [name]: newValue });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  useImperativeHandle(ref, () => {
    return {
      handleOpen: handleOpen,
    };
  });
  //Update projects
  const updateProjects = (item) => {
    let db = firebase.firestore();
    let docRef = db.collection("projects").doc(`${item.name}`);

    docRef
      .set({
        name: value.name,
        description: value.desc,
        html_url: value.link,
        image: value.img,
        language: value.lang,
        type: value.linkType,
        img_type: value.imgType,
      })
      .then(function () {
        setOpen2(true);
      });
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title">
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <DialogContentText>Change the following values.</DialogContentText>
        <form
          id="editForm"
          onSubmit={() => {}}
          autoComplete="off"
          className={classes.form}>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={value.name}
            onChange={handleChange}
          />
          <div className="form-inline">
            <TextField
              id="img"
              name="img"
              label="Image Link"
              variant="outlined"
              onChange={handleChange}
              className="form-inline-1"
              value={value.img}
            />
            <TextField
              id="imgType"
              name="imgType"
              label="Banner type"
              variant="outlined"
              value={value.imgType}
              className="form-inline-2"
              onChange={handleChange}
              select>
              <MenuItem value="banner">Banner</MenuItem>
              <MenuItem value="icon">Icon</MenuItem>
            </TextField>
          </div>
          <TextField
            id="desc"
            name="desc"
            label="Description"
            multiline
            rowsMax={4}
            variant="outlined"
            onChange={handleChange}
            fullWidth
            value={value.desc}
          />
          <div className="form-inline">
            <TextField
              id="link"
              name="link"
              label="Link"
              variant="outlined"
              className="form-inline-1"
              value={value.link}
              onChange={handleChange}
            />
            <TextField
              id="linkType"
              name="linkType"
              label="Type"
              variant="outlined"
              value={value.linkType}
              className="form-inline-2"
              onChange={handleChange}
              select>
              <MenuItem value="repo">GitHub Repo</MenuItem>
              <MenuItem value="link">Web link</MenuItem>
            </TextField>
          </div>
          <TextField
            id="lang"
            name="lang"
            label="Language"
            variant="outlined"
            fullWidth
            value={value.lang}
            onChange={handleChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            updateProjects(props.item);
          }}
          color="primary">
          Save
        </Button>
      </DialogActions>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open2}
        autoHideDuration={2000}
        onClose={handleClose2}>
        <Alert variant="filled" severity="info" onClose={handleClose2}>
          {props.item.name} updated
        </Alert>
      </Snackbar>
    </Dialog>
  );
});
