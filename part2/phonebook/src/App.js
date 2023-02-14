import { useEffect, useState } from 'react';
import personsService from './services/persons';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterString, setFilterString] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() =>{
    personsService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
    })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const updatePerson = persons.find(element => element.name === newName);
   // if name is already added, ask if number should be changed 
    if(updatePerson){
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const changedPerson = {...updatePerson, number: newNumber};
        personsService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson =>{
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson))
            setMessage(`The phone number of ${returnedPerson.name} was changed`);
            setTimeout(() => {
              setMessage(null)
            }, 4000);
          })
        setNewName('');
        setNewNumber('');

      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('');
          setNewNumber('');
          setMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setMessage(null)
          }, 4000);
        })
    } 
  };

  const removePerson = (id) => {
    personsService.remove(id)
    setPersons(persons.filter(person => person.id !== id))
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handlefilterChange = (event) => setFilterString(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filterString={filterString} handlefilterChange={handlefilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterString={filterString} removePerson={removePerson}/>
    </div>
  )
};

export default App;
