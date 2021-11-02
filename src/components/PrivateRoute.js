import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import firebase from "firebase/app";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let unsub;
    setTimeout(() => {
      unsub = firebase.auth().onAuthStateChanged((user) => {
        if (user) setUser(user);
        else setUser(null);
      });
    }, 1000);
    return () => {
      unsub && unsub();
    };
  }, []);
  return (
    <Route
      {...rest}
      render={(props) => {
        return !user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/projects" state="Already logged in" />
        );
      }}></Route>
  );
};

export default PrivateRoute;
