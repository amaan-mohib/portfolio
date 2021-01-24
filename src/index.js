import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import firebase from "firebase/app";
import firebaseInit from "./firebase";
import "./index.css";
import logo from "./logo_white_bold.png";
import * as serviceWorker from "./serviceWorker";
import Section, {
  Logo,
  Project,
  About,
  Contact,
  Profile,
  Scroll,
} from "./section";
import Login from "./login";
import ProjectAdd from "./projects";
import history from "./history";
import { useRef } from "react";

const project =
  "https://img.icons8.com/material-rounded/96/eeecec/folder-invoices.png";
const about = "https://img.icons8.com/material-rounded/96/eeecec/user.png";
const contact =
  "https://img.icons8.com/material-rounded/96/eeecec/phone--v1.png";

ReactDOM.render(
  <React.StrictMode>
    <Paths />
  </React.StrictMode>,
  document.getElementById("root")
);

function Paths() {
  const [signIn, setSignIn] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) setSignIn(true);
        else setSignIn(false);
      });
    }, 1000);
  }, []);
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={App} />
        <Route
          path="/projects"
          render={(props) => <ProjectAdd msg={props.location.state} />}
        />
        <Route
          path="/login"
          render={() =>
            !signIn ? (
              <Login />
            ) : (
              <Redirect
                to={{ pathname: "/projects", state: "Already logged in" }}
              />
            )
          }
        />
      </Switch>
    </Router>
  );
}

function App() {
  let num = useRef(1);
  useEffect(() => {
    const sections = [];
    const sectionsTitle = [];
    const sectionTitle = [];
    const section = document.getElementsByClassName("section");
    const buttons = document.getElementsByClassName("scrollBut");
    num.current = section.length;
    for (let i = 0; i < section.length; i++) {
      sections[i] = document.getElementById(`section${i + 1}`);
      sectionTitle[i] = document.getElementById(`t${i + 1}`);
      sectionsTitle[i] = sections[i].getAttribute(
        "data-scroll-indicator-title"
      );
    }
    for (let i = 0; i < section.length; i++) {
      buttons[i].addEventListener("click", function () {
        sections[i].scrollIntoView({ behavior: "smooth" });
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
      if (window.matchMedia("(pointer: fine) and (hover: hover)").matches) {
        buttons[i].addEventListener("mouseover", function () {
          sectionTitle[i].innerHTML = sectionsTitle[i] + " - ";
          sectionTitle[i].classList.add("mr5");
        });
        buttons[i].addEventListener("mouseleave", function () {
          sectionTitle[i].innerHTML = "";
          sectionTitle[i].classList.remove("mr5");
        });
      }
    }
    window.addEventListener(
      "scroll",
      function () {
        let scrollVal =
          document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.scrollY;
        for (let i = 0; i < buttons.length; i++) {
          let pos = Math.round(scrollVal / window.innerHeight);
          if (i === pos) {
            buttons[i].classList.add("active");
          } else {
            buttons[i].classList.remove("active");
          }
        }
      },
      true
    );
  }, []);

  return (
    <div className="container">
      <Section
        id="section1"
        icon={<Logo icon={logo} />}
        title="Amaan Mohib"
        content={<Profile />}
      />
      <Section
        id="section2"
        icon={<Logo icon={project} />}
        title="Projects"
        content={<Project />}
      />
      <Section
        id="section3"
        icon={<Logo icon={about} />}
        title="About"
        content={<About />}
      />
      <Section
        id="section4"
        icon={<Logo icon={contact} />}
        title="Contact"
        content={<Contact />}
      />
      <Scroll num={num} />
    </div>
  );
}

// Initialize Firebase
firebaseInit();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
