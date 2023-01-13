import { useState } from 'react';

const Number = ({person}) => <p>{person.name} {person.number}</p>

const Numbers = ({persons}) => persons.map(person => <Number key={person.id} person={person}/>)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1}
  ]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    // check if the name is already added and prevent duplicates
    if (persons.findIndex(element => element.name === newName)>=0){
      window.alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    } 
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )
};

export default App;