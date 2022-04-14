import React, { useState } from "react";

import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import withClass from "../hoc/withClass";
import Aux from "../hoc/Auxiliary";
import AuthContext from "../context/auth-context";

const App = props => {
  const [items, setItems] = useState({
    persons: [
      { id: "asfa1", name: "Max", age: 28 },
      { id: "vasdf1", name: "Manu", age: 29 },
      { id: "asdf11", name: "Stephanie", age: 26 }
    ],
    otherState: "some other state",
    showPersons: false,
    userInput: "",
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  });

  // useEffect(() => {
  //   console.log("[App.js] rendering")
  // }, []);
  
  const nameChangedHandler = ( event, id ) => {
    const personIndex = items.persons.findIndex(p => p.id === id);
    
    const person = {...items.persons[personIndex]};
    
    // const person = Object.assign({}, items.persons[personIndex]);
    
    person.name = event.target.value;
    
    const persons = [...items.persons];
    persons[personIndex] = person;
    
    setItems((prevState, props) => {
      return ({
        ...prevState,
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      });
    });
  };
  
  const deletePersonHandler = (personIndex) => {
    // const persons = items.persons.slice();
    const persons = [...items.persons];
    persons.splice(personIndex, 1);
    setItems({...items, persons: persons});
  }
  
  const togglePersonsHandler = () => {
    const doesShow = items.showPersons;
    setItems({...items, showPersons: !doesShow});
  }

  const loginHangler = () => {
    setItems((prevState, props) => {
      return ({
        ...items,
        authenticated: !prevState.authenticated
      });
    });
  }
  
  let persons = null;
  
  if ( items.showPersons ) {
    persons = (
      <Persons
        persons={items.persons}
        clicked={deletePersonHandler}
        changed={nameChangedHandler}
        isAuthenticated={items.authenticated}
      />
    );
  }
  
  return (
    <Aux>
      <button
        onClick={() => 
          setItems({...items, showCockpit: !items.showCockpit})
        }
      >
        Remove Cockpit
      </button>
      <AuthContext.Provider
        value={{
          authenticated: items.authenticated,
          login: loginHangler
        }} 
      >
        {items.showCockpit ?
          <Cockpit
            title={props.appTitle}
            showPersons={items.showPersons}
            personsLength={items.persons.length} 
            clicked={togglePersonsHandler}
          /> : null
        }
        {persons}
      </AuthContext.Provider>
    </Aux>
  );
  // return React.createElement("div", {className: "App"}, React.createElement("h1", null, "Does this work now?"));
}

export default withClass(App, classes.App);
