import React, { useState } from "react";

import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

const App = () => {
  const [items, setItems] = useState({
    persons: [
    { id: "asfa1", name: "Max", age: 28 },
    { id: "vasdf1", name: "Manu", age: 29 },
    { id: "asdf11", name: "Stephanie", age: 26 }
    ],
    otherState: "some other state",
    showPersons: false,
    userInput: ""
  });

  const nameChangedHandler = ( event, id ) => {
    const personIndex = items.persons.findIndex( p =>  {
      return p.id === id
    } );
    
    const person = { ...items.persons[personIndex] };

    // const person = Object.assign({}, items.persons[personIndex]);

    person.name = event.target.value;

    const persons = [ ...items.persons ];
    persons[personIndex] = person;

    setItems( { ...items, persons: persons } );
  }

  const deletePersonHandler = (personIndex) => {
    // const persons = items.persons.slice();
    const persons = [...items.persons];
    persons.splice(personIndex, 1);
    setItems( { ...items, persons: persons } );
  }

  const togglePersonsHandler = () => {
    const doesShow = items.showPersons;
    setItems( { ...items, showPersons: !doesShow } );
  }

  let persons = null;

  if ( items.showPersons ) {
    persons = <Persons
          persons={items.persons}
          clicked={deletePersonHandler}
          changed={nameChangedHandler} />
  }

  return (
    <div className={classes.App}>
      <Cockpit
        showPersons={items.showPersons}
        persons={items.persons} 
        clicked={togglePersonsHandler} />
      {persons}
    </div>
  );
  // return React.createElement("div", {className: "App"}, React.createElement("h1", null, "Does this work now?"));
}

export default App;
