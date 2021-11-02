import React, { useState, useRef, useEffect } from "react";
import "./skills.css";
import { IconButton } from "@material-ui/core";
import { MdClose } from "react-icons/md";
import ClickAwayListener from "../util/ClickAwayListener";
import { AnimatePresence, motion } from "framer-motion";
import illustration from "../assets/undraw_coding.svg";

const Skills = () => {
  const [subList, setSubList] = useState(null);
  const [title, setTitle] = useState("");
  const web = [
    {
      name: "HTML",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      child: [
        {
          name: "Bootstrap",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        },
      ],
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      child: [
        {
          name: "React",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        },
        {
          name: "Svelte",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
        },
        {
          name: "Vue.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
        },
        {
          name: "Node.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "Express.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        },
        {
          name: "Socket.IO",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
        },
      ],
    },
    {
      name: "mongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "Firebase",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    },
  ];
  const software = [
    {
      name: "C",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    },
    {
      name: "C++",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    },
    {
      name: "Dart",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
      child: [
        {
          name: "Flutter",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
        },
      ],
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "GO",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      child: [
        {
          name: "Android",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        },
      ],
    },
    {
      name: "Linux",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      child: [
        {
          name: "Vim",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg",
        },
        {
          name: "Bash",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
        },
      ],
    },
    {
      name: "Markdown",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      child: [
        {
          name: "Flask",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
        },
      ],
    },
  ];
  const design = [
    {
      name: "Adobe AfterEffects",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg",
    },
    {
      name: "Blender",
      icon: "https://img.icons8.com/fluency/48/000000/blender-3d.png",
    },
    {
      name: "Figma (Beginner)",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "Adobe Illustrator (Beginner)",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
    },
    {
      name: "Adobe Photoshop (Beginner)",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
    },
    {
      name: "Adobe Premiere Pro",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg",
    },
  ];
  const parentList = [
    {
      name: "Software Development",
      icon: "https://img.icons8.com/fluency/48/000000/backend-development.png",
      child: software,
    },
    {
      name: "Web Development",
      icon: "https://img.icons8.com/fluency/48/000000/domain.png",
      child: web,
    },
    {
      name: "Design",
      icon: "https://img.icons8.com/fluency/48/000000/design.png",
      child: design,
    },
  ];

  return (
    <div className="skills">
      <div className="skills-grid">
        {parentList.map((item, index) => (
          <div
            key={index + "-s"}
            className={`skill ${title === item.name ? "skill-active" : ""}`}
            onClick={() => {
              setSubList(item.child);
              setTitle(item.name);
            }}>
            <div
              style={{
                backgroundImage: `url(${item.icon})`,
                width: "48px",
                height: "48px",
                backgroundSize: "contain",
              }}
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      {subList ? (
        <SubGrid
          list={subList}
          title={title}
          setSubList={setSubList}
          setTitle={setTitle}
        />
      ) : (
        <div
          className="illustration"
          style={{
            backgroundImage: `url(${illustration})`,
          }}></div>
      )}
    </div>
  );
};

const SubGrid = ({ list, title, setSubList, setTitle }) => {
  const [dialog, setDialog] = useState(false);
  const [itemState, setItem] = useState(null);
  const toggleDialog = () => {
    setDialog(!dialog);
    if (dialog) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };
  return (
    <>
      <div
        className="skills grid-inside"
        style={{ padding: 0, justifyContent: "space-between" }}>
        <div className="skills-title">
          <h3>{title}</h3>
          <IconButton
            title="Close"
            onClick={() => {
              setSubList(null);
              setTitle("");
            }}>
            <MdClose color="white" />
          </IconButton>
        </div>
        <div
          className="skills-grid"
          style={{
            height: "100%",
          }}>
          {list.map((item) => (
            <>
              <div
                key={item.name}
                className="skill"
                onClick={() => {
                  if (item.child) {
                    setItem(item);
                    toggleDialog();
                  }
                }}>
                <div
                  style={{
                    backgroundImage: `url(${item.icon})`,
                    width: "48px",
                    height: "48px",
                    padding: "3px",
                    backgroundOrigin: "content-box",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                  }}
                />
                <p>{item.name}</p>
                {item.child && <div className="childIndicator"></div>}
              </div>
            </>
          ))}
        </div>
        <div></div>
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}>
        {dialog && itemState.child && (
          <SkillDialog
            list={itemState.child}
            title={itemState.name}
            toggleDialog={toggleDialog}
          />
        )}
      </AnimatePresence>
    </>
  );
};
const SkillDialog = ({ list, title, toggleDialog }) => {
  const ref = useRef(null);
  ClickAwayListener(ref, toggleDialog);

  return (
    <>
      <motion.div
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <motion.div
          ref={ref}
          className="dialog skill-dialog"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}>
          <div className="project-title">
            <h2>{title}</h2>
            <IconButton onClick={toggleDialog} title="Close">
              <MdClose color="white" />
            </IconButton>
          </div>
          <div className="project-content">
            <div
              className="skills-grid"
              style={{
                height: "100%",
              }}>
              {list.map((item, index) => (
                <div key={index + "-s"} className="skill">
                  <div
                    style={{
                      backgroundImage: `url(${item.icon})`,
                      width: "48px",
                      height: "48px",
                      padding: "3px",
                      backgroundOrigin: "content-box",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                    }}
                  />
                  <p>{item.name}</p>
                  {item.child && <div className="childIndicator"></div>}
                </div>
              ))}
            </div>
          </div>
          <div className="project-end"></div>
        </motion.div>
      </motion.div>
    </>
  );
};
export default Skills;
