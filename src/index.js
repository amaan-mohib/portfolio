import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Helmet } from "react-helmet";
import { Router, Link, Route, Switch } from "react-router-dom";
import firebaseInit, { userSignedIn } from "./util/firebase";
import "./index.css";
import logo from "./assets/logo_white_bold.png";
import * as serviceWorker from "./serviceWorker";
import Section, {
  Logo,
  Project,
  About,
  Contact,
  Profile,
  Scroll,
} from "./components/section";
import Login from "./components/login";
import ProjectAdd from "./components/projects";
import history from "./util/history";
import { useRef } from "react";
import Links, { LinkAdd } from "./components/links";
import NotFound from "./components/NotFound";
import { MdAttachment, MdFolder, MdLink } from "react-icons/md";
import { IconButton } from "@material-ui/core";
import PrivateRoute from "./components/PrivateRoute";
import Skills from "./components/Skills";

const project =
  "https://img.icons8.com/material-rounded/96/eeecec/folder-invoices.png";
const about = "https://img.icons8.com/material-rounded/96/eeecec/user.png";
const contact =
  "https://img.icons8.com/material-rounded/96/eeecec/phone--v1.png";
const skills =
  "https://img.icons8.com/material-rounded/96/eeecec/development-skill.png";

// Initialize Firebase
firebaseInit();

ReactDOM.render(
  <React.StrictMode>
    <Paths />
  </React.StrictMode>,
  document.getElementById("root")
);

function Paths() {
  const TitleComp = ({ title, desc }) => {
    const defaultTitle = "Amaan Mohib";
    const defaultDesc = "Amaan Mohib's personal website.";
    return (
      <Helmet>
        <title>{title ? `${defaultTitle} - ${title}` : defaultTitle}</title>
        <meta
          name="description"
          content={desc ? desc : defaultDesc}
          data-react-helmet="true"
        />
      </Helmet>
    );
  };

  const withTitle =
    ({ ChildComp, title, desc }) =>
    (props) =>
      (
        <>
          <TitleComp title={title} desc={desc} />
          <ChildComp {...props} />
        </>
      );
  const HomeComp = withTitle({
    ChildComp: App,
  });
  const LinksComp = withTitle({
    ChildComp: Links,
    desc: "Links shared by Amaan Mohib",
    title: "Links",
  });
  const LinkAddComp = withTitle({
    ChildComp: LinkAdd,
    desc: "Add links to be shared by Amaan Mohib",
    title: "Add Links",
  });
  const ProjectsComp = withTitle({
    ChildComp: ProjectAdd,
    desc: "Projects to be added for portfolio",
    title: "Projects",
  });
  const LoginComp = withTitle({
    ChildComp: Login,
    desc: "Login",
    title: "Login",
  });
  const NFComp = withTitle({
    ChildComp: NotFound,
    desc: "404. Not Found",
    title: "Not Found",
  });
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomeComp} />
        <Route path="/links" exact component={LinksComp} />
        <Route path="/links/add" component={LinkAddComp} />
        <Route
          path="/projects"
          render={(props) => <ProjectsComp msg={props.location.state} />}
        />
        <PrivateRoute component={LoginComp} />
        <Route path="*" component={NFComp} />
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
    setTimeout(() => {
      userSignedIn();
    }, 1000);
  }, []);

  useEffect(() => {
    if (window) {
      window.location.href = "https://amaan-mohib.net";
    }
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
        icon={<Logo icon={skills} />}
        title="Skills"
        content={<Skills />}
      />
      <Section
        id="section5"
        icon={<Logo icon={contact} />}
        title="Contact"
        content={<Contact />}
      />
      <Scroll num={num} />
      <div id="signed-in" className="nav-float" style={{ display: "none" }}>
        <Link to="/projects">
          <IconButton aria-label="home" color="primary">
            <MdFolder />
          </IconButton>
        </Link>
        <Link to="/links">
          <IconButton aria-label="home" color="primary">
            <MdLink />
          </IconButton>
        </Link>
        <Link to="/links/add">
          <IconButton aria-label="home" color="primary">
            <MdAttachment />
          </IconButton>
        </Link>
      </div>
      <div id="signed-out" style={{ display: "none" }}></div>
    </div>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
