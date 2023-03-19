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
  const [successfulMessage, setSuccessfulMessage] = useState(null);

  useEffect(() =>{
    personsService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
    })
  }, []);

  const showMessage = (message, success) => {
    setMessage(message);
            setSuccessfulMessage(success);
            setTimeout(() => {
              setMessage(null)
              setSuccessfulMessage(null);
            }, 4000);
  }

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
            if(!returnedPerson.status === '404'){
              console.log('status code is 404:');
              console.log(returnedPerson.status);
            }
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson))
            showMessage(`The phone number of ${returnedPerson.name} was changed`, 1);
          }).catch(error => {
            if(error.response.status === 404){
              showMessage(`Information of ${updatePerson.name} has already been removed from server`, 0);
              setPersons(persons.filter(person => person.id !== updatePerson.id));
            }else {
              showMessage(error.response.data.error, 0);
            }
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
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          showMessage(`Added ${returnedPerson.name}`, 1);
        })
        .catch(error => {
          console.log(error.response.data.error);
          showMessage(error.response.data.error, 0);
        })
    } 
  };

  const removePerson = (id) => {
    personsService.remove(id);
    setPersons(persons.filter(person => person.id !== id));
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handlefilterChange = (event) => setFilterString(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} successful={successfulMessage}/>
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
