import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/Auxiliary";
import withClass from "../../../hoc/withClass";
import classes from "./Person.css";
import AuthContext from "../../../context/auth-context";

const Person = ( props ) => {
  const focusLastInputRef = useRef(null);

  useEffect(() => {
    // console.log("[Person.js] rendering")
    focusLastInputRef.current.focus();
    return () => {
      // console.log("[Person.js] cleanup work in useEffect");
    };
  });

  return (
    <Aux>
      <AuthContext.Consumer>{
        (context) => {
          return (
            context.authenticated ?
            <p>Authenticated!</p> :
            <p>Please Log In</p>
          );
        }
      }</AuthContext.Consumer>
      <p onClick={props.clicked}>
        I'm {props.name} and I am {props.age} years old!
      </p>
      <p key="12" >{props.children}</p>
      <input
        key="i3"
        type="text"
        ref={focusLastInputRef}
        onChange={props.changed}
        value={props.name}
      />
    </Aux>
  );
};

Person.propTypes = {
  clicked: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  change: PropTypes.func
};

export default withClass(Person, classes.Person);
