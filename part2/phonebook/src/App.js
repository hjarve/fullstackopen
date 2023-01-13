import { useState } from 'react';

const Person = ({person}) => <p>{person.name} {person.number}</p>

const Persons = ({persons, filterString}) => {
  //filter the people whose names contain the filterString, case insensitive
  return (persons.filter(person => person.name.toLowerCase().includes(filterString)).map(person => {
     return <Person key={person.id} person={person}/>}
    )
  )
};

const App = () => {
  const [persons, setPersons] = useState([
    // dummy data
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterString, setFilterString] = useState('');

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
  const handlefilterChange = (event) => setFilterString(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input 
        value={filterString}
        onChange={handlefilterChange}/>
      </div>
      <h2>add a new</h2>
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
      <Persons persons={persons} filterString={filterString}/>
    </div>
  )
};

export default App;