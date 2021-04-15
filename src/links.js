import React, { useState } from "react";
import { Button, Divider, IconButton, TextField } from "@material-ui/core";
import { useEffect } from "react";
import firebase from "firebase/app";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import {
  MdAdd,
  MdArrowUpward,
  MdDelete,
  MdFolder,
  MdHome,
  MdLink,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { signOut, userSignedIn } from "./firebase";
import { ContactButton } from "./section";

export default function Links() {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    const getLinks = () => {
      let db = firebase.firestore();
      const getCollection = db.collection("links").orderBy("createdAt", "desc");
      getCollection.onSnapshot(function (querysnapShot) {
        const docs = querysnapShot.docs.map((doc) => doc.data());
        setLinks(docs);
        console.log(docs);
      });
    };
    getLinks();
  }, []);

  //404 bhi banana hai
  const LinkList = (props) => {
    const [list, setList] = useState({
      title: "Loading...",
      description: "Loading...",
      image: "https://ssl.gstatic.com/accounts/ui/avatar_2x.png",
      url: props.link.split("/").splice(0, 2).join("/"),
    });
    useEffect(() => {
      const getPreviews = async (link) => {
        const data = await fetch(
          `http://api.linkpreview.net/?key=19e5180309748adfceac4329e4c2e67b&q=${link}`
        );
        const items = await data.json();
        console.log(items);
        setList(items);
      };
      getPreviews(props.link);
    }, [props.link]);
    return (
      <a
        className="link-list"
        href={`${list.url}`}
        target="_blank"
        rel="noopener noreferrer">
        <img
          alt={`${list.title}`}
          className="link-list-img"
          src={`${list.image}`}
        />
        <div className="link-list-div">
          <span className="link-span link-title">{`${list.title}`}</span>
          <span className="link-span link-desc">{`${list.description}`}</span>
          <span className="link-span link-url">{`${
            list.url.split("/")[2]
          }`}</span>
        </div>
      </a>
    );
  };
  return (
    <div className="link-body">
      <div className="link-head">
        <img
          alt="Amaan Mohib"
          title="Amaan Mohib"
          className="image link-img"
          src="https://amaan-mohib.github.io/assets/img/pfp.jpg"
        />
        <h3>Amaan Mohib</h3>
      </div>
      <div className="links">
        {links.length > 0 ? (
          <div className="links-ul effect-cont" style={{ padding: 0 }}>
            {links.map((data, index) => {
              return <LinkList key={index} link={data.link} />;
            })}
          </div>
        ) : (
          <div className="links-ul" style={{ padding: 0 }}>
            <span style={{ padding: "10px" }}>Loading...</span>
          </div>
        )}
      </div>
      <footer>
        <div className="footer1">
          <ContactButton
            title="YouTube"
            link="https://www.youtube.com/channel/UCjdKxKK2rNKncAlSV-dgvQg"
            icon={<FaYoutube />}
          />
          <ContactButton
            title="Instagram"
            link="https://www.instagram.com/delta_.art/"
            icon={<FaInstagram />}
          />
          <ContactButton
            title="GitHub"
            link="https://github.com/amaan-mohib"
            icon={<FaGithub />}
          />
        </div>
        <a
          className="linkBut port"
          href="https://amaan-mohib.web.app/"
          target="_blank"
          rel="noopener noreferrer">
          Open Portfolio
        </a>
      </footer>
    </div>
  );
}
export function LinkAdd() {
  const [links, setLinks] = useState([]);
  const [value, setValue] = useState("");
  const handleChange = (evt) => {
    const newValue = evt.target.value;
    setValue(newValue);
  };
  useEffect(() => {
    userSignedIn();
    const signout = document.getElementById("signout");
    signout.onclick = () => signOut("links");
    const getLinks = () => {
      let db = firebase.firestore();
      const getCollection = db.collection("links").orderBy("createdAt", "desc");
      getCollection.onSnapshot(function (querysnapShot) {
        const docs = querysnapShot.docs.map((doc) => doc.data());
        setLinks(docs);
        console.log(docs);
      });
    };
    getLinks();
  }, []);

  //Adding link
  const addLink = (link) => {
    if (link) {
      let db = firebase.firestore();
      let docRef = db.collection("links").doc();
      docRef.get().then(function (doc) {
        if (doc.exists) {
          console.log("doc exists");
        } else {
          docRef
            .set({
              id: doc.id,
              link: `${link}`,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => console.log("written", link));
        }
      });
    }
  };
  const deleteLink = (id) => {
    let db = firebase.firestore();
    let docRef = db.collection("links").doc(id);
    docRef
      .delete()
      .then(() => console.log("deleted", id))
      .catch((err) => console.error(err));
  };
  const updateLink = (id) => {
    let db = firebase.firestore();
    let docRef = db.collection("links").doc(id);
    docRef
      .update({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => console.log("updated", id))
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <div id="signed-out" className="signed-out">
        <nav className="navbar">
          <h1>
            <Link to="/login">Login</Link> to add / remove links.
          </h1>
        </nav>
      </div>
      <div id="signed-in" className="signed-in" style={{ display: "none" }}>
        <nav className="navbar">
          <h1>Links</h1>
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
        <div className="links-div">
          {links.length > 0 ? (
            <ul className="links-ul">
              {links.map((data, index) => {
                return (
                  <>
                    <li className="links-li" key={index}>
                      <span className="links-li-span">{`${data.link}`}</span>
                      <div style={{ display: "flex" }}>
                        {index > 0 ? (
                          <IconButton
                            title="Send First"
                            aria-label="Send First"
                            onClick={() => {
                              updateLink(data.id);
                            }}>
                            <MdArrowUpward />
                          </IconButton>
                        ) : null}
                        <IconButton
                          title="Delete"
                          aria-label="Delete"
                          color="secondary"
                          onClick={() => {
                            deleteLink(data.id);
                          }}>
                          <MdDelete />
                        </IconButton>
                      </div>
                    </li>
                    <Divider key={`${index}-div`} />
                  </>
                );
              })}
            </ul>
          ) : (
            <>
              <span style={{ padding: "10px" }}>No Links Added</span>
              <Divider />
            </>
          )}

          <div className="footer1" style={{ padding: "10px", width: "100%" }}>
            <TextField
              id="link"
              label="Link"
              variant="outlined"
              size="small"
              fullWidth
              value={value}
              onChange={handleChange}
            />
            <Button
              startIcon={<MdAdd />}
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              onClick={() => {
                addLink(value);
              }}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
