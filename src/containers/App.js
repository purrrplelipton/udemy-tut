
import React, { useState } from "react";
import classes from "./App.css";
import Person from "../components/Persons/Person/Person";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

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
      return p.userId === id
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
  let btnClass = "";

  if ( items.showPersons ) {
    persons = (
      <div>
        {items.persons.map( ( person, index ) => {
          return (
            <ErrorBoundary key={person.id}>
              <Person click={() => deletePersonHandler( index )}
                name={person.name}
                age={person.age}
                changed={( event ) => nameChangedHandler( event, person.id )}/>
            </ErrorBoundary>
          )
        } )}
      </div>
    );

    btnClass = classes.Red;
  }

  const assignedClasses = [];
  if ( items.persons.length <= 2 ) {
    assignedClasses.push( classes.red );
  }
  if ( items.persons.length <= 1 ) {
    assignedClasses.push(classes.bold)
  }

  return (
    <div className={classes.App}>
      <h1>Hi! I'm a react app</h1>
      <p className={assignedClasses.join( " " )}>This is really working!</p>
      <button className={btnClass} onClick={togglePersonsHandler}>Toggle Persons</button>
      {persons}
    </div>
  );
  // return React.createElement("div", {className: "App"}, React.createElement("h1", null, "Does this work now?"));
}

export default App;
