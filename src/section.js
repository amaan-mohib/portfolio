import React, { Fragment, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  MdChevronLeft,
  MdChevronRight,
  MdEmail,
  MdLanguage,
} from "react-icons/md";
import { useInView } from "react-intersection-observer";
import {
  FaFacebookSquare,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import firebase from "firebase/app";
import "./langColors.css";
import analyze from "rgbaster";
import { motion, useAnimation } from "framer-motion";
import {
  Card,
  CardContent,
  CardMedia,
  createMuiTheme,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export default function Section(props) {
  return (
    <div
      className="section"
      id={props.id}
      data-scroll-indicator-title={props.title}>
      <div id={props.id + "-h"} className="head">
        <div style={{ marginRight: "20px" }} width="50px">
          {props.icon}
        </div>
        <h2>{props.title}</h2>
      </div>
      <div className="content">
        {props.content}
        {props.scroll}
      </div>
    </div>
  );
}

export function Logo(props) {
  return (
    <div
      className="icon"
      style={{ backgroundImage: `url(${props.icon})` }}></div>
  );
}
export function About() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const boxVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
    hidden: {
      opacity: 0,
      y: 50,
    },
  };
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  });
  return (
    <motion.div
      className="about"
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={boxVariants}>
      <p>
        I am a student pursuing
        <b> Bachelor of Engineering in Information Science</b> (Expected 2023)
        from Nitte Meenakshi Institute of Technology, Bengaluru, Karnataka,
        India.
        <br />
        My hometown is Ranchi, Jharkhand, India.
        <br /> This website exists as a way to show the world the things I have
        been working on. As I am always learning new things, this site is going
        to be a work in progress.
        <br />
        Now, as you have got an idea about me, make sure to take a peek around
        and explore more about myself.
        <br />
        <br />
        Thank you for visiting!
      </p>
    </motion.div>
  );
}
export function Profile() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("fadeVisible");
    } else {
      controls.start("fadeHidden");
    }
  });
  const parentVariants = {
    hidden: {},
    visible: {},
  };
  const fadeOutVariants = {
    hidden: {},
    visible: {
      opacity: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };
  const imgVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      scale: 1,
      x: 0,
      opacity: 1,
      transition: { type: "spring", delay: 1 },
    },
    fadeVisible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
    fadeHidden: {
      opacity: 0,
      y: 50,
    },
  };
  let lineVariants1 = { hidden: {}, visible: {} },
    lineVariants2 = { hidden: {}, visible: {} };
  if (
    window.matchMedia(
      "only screen and (min-width: 240px) and (max-width: 720px)"
    ).matches
  ) {
    lineVariants1 = {
      hidden: {
        y: "-105%",
      },
      visible: {
        y: 0,
      },
    };
    lineVariants2 = {
      hidden: {
        y: "105%",
      },
      visible: {
        y: 0,
      },
    };
  } else {
    lineVariants1 = {
      hidden: {
        x: "-105%",
      },
      visible: {
        x: 0,
      },
    };
    lineVariants2 = lineVariants1;
  }

  return (
    <motion.div
      className="profile"
      variants={parentVariants}
      initial="hidden"
      animate="visible">
      <motion.img
        alt="Amaan Mohib"
        title="Amaan Mohib"
        className="image"
        src="https://amaan-mohib.github.io/assets/img/pfp.jpg"
        variants={imgVariants}
        animate={controls}
        ref={ref}
      />
      <div className="introDiv">
        <motion.h1
          variants={lineVariants1}
          className="l1"
          transition={{ duration: 0.5, ease: "easeIn", delay: 2 }}>
          Hi, I'm <b>Amaan Mohib</b>
        </motion.h1>
        <motion.h2
          className="l2"
          variants={lineVariants2}
          transition={{ duration: 0.5, ease: "easeIn", delay: 3 }}>
          Welcome to my portfolio!
        </motion.h2>
      </div>
      <motion.div
        id="first-slide"
        className="first-slide"
        variants={fadeOutVariants}
        onAnimationComplete={() => {
          const slide = document.getElementById("first-slide");
          slide.style.display = "none";
        }}></motion.div>
    </motion.div>
  );
}
export function Contact() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const boxVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
    hidden: {
      opacity: 0,
      y: 50,
    },
  };
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  });
  const links = [
    {
      title: "Email",
      link: "mailto:amaan.mohib@gmail.com",
      icon: <MdEmail className="iconBut" />,
    },
    {
      title: "Facebook",
      link: "https://www.facebook.com/amaan.mohib/",
      icon: <FaFacebookSquare className="iconBut" />,
    },
    {
      title: "Instagram",
      link: "https://www.instagram.com/amaanmohib/",
      icon: <FaInstagram className="iconBut" />,
    },
  ];
  const links2 = [
    {
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/amaan-mohib-384870113/",
      icon: <FaLinkedin className="iconBut" />,
    },
    {
      title: "GitHub",
      link: "https://github.com/amaan-mohib",
      icon: <FaGithub className="iconBut" />,
    },
    {
      title: "YouTube",
      link: "https://www.youtube.com/channel/UCSox0WatCscFmLtjmviJQXg",
      icon: <FaYoutube className="iconBut" />,
    },
  ];
  return (
    <motion.div
      className="contactFull"
      variants={boxVariants}
      animate={controls}
      initial="hidden"
      ref={ref}>
      <div className="contact">
        <p>
          Thank you for visiting my website!
          <br /> I am excited that you want to get in touch with me.
          <br />
          <br />
          My presence on the internet:
        </p>
      </div>
      <div className="contact2">
        <hr />
        <div className="contactListDiv">
          <ul className="contactList">
            {links.map((link, index) => {
              return (
                <li key={index}>
                  <ContactButton
                    icon={link.icon}
                    link={link.link}
                    title={link.title}
                  />
                </li>
              );
            })}
          </ul>
          <ul className="contactList">
            {links2.map((link, index) => {
              return (
                <li key={index}>
                  <ContactButton
                    icon={link.icon}
                    link={link.link}
                    title={link.title}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <hr />
      </div>
      <p>© Made by Amaan Mohib</p>
    </motion.div>
  );
}
function ContactButton(props) {
  return (
    <a
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      title={props.title}
      className="linkBut">
      {props.icon}
    </a>
  );
}
function Arrow(props) {
  let className = props.type === "next" ? "nextArrow" : "prevArrow";
  className += " arrow";
  const char =
    props.type === "next" ? (
      <div className="arrowBut">
        <MdChevronRight size={24} />
      </div>
    ) : (
      <div className="arrowBut">
        <MdChevronLeft size={24} />
      </div>
    );
  return (
    <span className={className} onClick={props.onClick}>
      {char}
    </span>
  );
}
export function Project() {
  const [items, setItems] = useState([]);
  const [skeleton, setSkeleton] = useState(true);
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const boxVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
    hidden: {
      opacity: 0,
      y: 50,
    },
  };
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
    setTimeout(() => {
      const project = document.getElementById("project");
      //Get projects in firestore
      const getProjects = () => {
        let db = firebase.firestore();
        const getCollection = db.collection("projects");
        getCollection.onSnapshot(function (querysnapShot) {
          const docs = querysnapShot.docs.map((doc) => doc.data());
          setItems(docs);
          console.log(docs);
          if (project.scrollHeight > project.offsetHeight) {
            project.style.justifyContent = "space-between";
          }
        });
        setSkeleton(false);
      };
      getProjects();
    }, 3500);
  }, [inView, controls]);
  const cards = items.map((item) => {
    return <MyCardContent key={item.name} item={item} />;
  });
  const settings = {
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  const slider = <Slider {...settings}>{cards}</Slider>;

  return (
    <motion.div
      id="project"
      className="project"
      variants={boxVariants}
      animate={controls}
      initial="hidden"
      ref={ref}>
      <div className="gridContainer">{cards}</div>
      <div className="slider">{slider}</div>
      {skeleton && <CardSkeleton />}
      <a
        href="https://github.com/amaan-mohib"
        rel="noopener noreferrer"
        target="_blank"
        className="github">
        View more
      </a>
    </motion.div>
  );
}
function MyCardContent(props) {
  const [icon, setIcon] = useState(<div></div>);
  const [banner, setBanner] = useState("");
  const [color, setColor] = useState("");
  const [button, setButton] = useState(<div></div>);
  useEffect(() => {
    const lang = document.getElementById("lang");
    lang.style.backgroundColor = props.item.language;
    const getColor = async (img) => {
      const result = await analyze(img, {
        ignore: ["rgb(255,255,255)", "rgb(0,0,0)"],
      });
      setColor(result[0].color);
    };
    if (props.item.img_type === "icon") {
      setIcon(
        <div
          className="icon-banner"
          style={{ backgroundImage: `url(${props.item.image})` }}></div>
      );
      getColor(props.item.image);
    } else {
      setBanner(`url(${props.item.image})`);
    }
    if (props.item.type === "repo") {
      setButton(
        <a
          href={props.item.html_url}
          target="_blank"
          className="repo-but"
          rel="noopener noreferrer">
          <FaGithub className="mr5" size={20} />
          <span>Github</span>
        </a>
      );
    } else {
      setButton(
        <a
          href={props.item.html_url}
          target="_blank"
          className="repo-but"
          rel="noopener noreferrer">
          <MdLanguage className="mr5" size={20} />
          <span>Visit</span>
        </a>
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="card-container">
      <div className="card" title={props.item.name}>
        <div
          id="banner"
          className="banner"
          style={{ backgroundImage: banner, backgroundColor: color }}>
          {icon}
        </div>
        <div className="title">{props.item.name}</div>
        <div className="desc">{props.item.description}</div>
        <div className="lang">
          <div id="lang" className={props.item.language}>
            <p className="lang-p">{props.item.language}</p>
          </div>
        </div>
        <div className="visitBar">{button}</div>
      </div>
    </div>
  );
}
function CardSkeleton() {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Card>
        <CardMedia>
          <Skeleton variant="rect" width={250} height={166} />
        </CardMedia>
        <CardContent>
          <Fragment>
            <Typography variant="h3">
              <Skeleton />
            </Typography>
            <Typography variant="body1">
              <Skeleton />
            </Typography>
            <Typography variant="body1">
              <Skeleton />
            </Typography>
            <Typography variant="body1">
              <Skeleton />
            </Typography>
          </Fragment>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Skeleton width={129} height={32} />
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
export function Scroll(props) {
  return (
    <div id="scroller" className="scroller">
      <div className="titles">
        <p id="t1"></p>
        <p id="t2"></p>
        <p id="t3"></p>
        <p id="t4"></p>
      </div>
      <div>
        <button className="scrollBut active"></button>
        <button className="scrollBut"></button>
        <button className="scrollBut"></button>
        <button className="scrollBut"></button>
      </div>
    </div>
  );
}
