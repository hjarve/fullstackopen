import { useState } from 'react';

const Number = ({number}) => <p>{number.name}</p>

const Numbers = ({numbers}) => numbers.map(person => <Number key={person.name} number={person}/>)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]); 
  const [newName, setNewName] = useState('');

  const addName = (event) => {
    event.preventDefault();
    // check if the name is already added and prevent duplicates
    if (persons.findIndex(element => element.name === newName)>=0){
      window.alert(`${newName} is already added to phonebook`);
      setNewName('');
    } else {
      const nameObject = {
        name: newName
      }
      setPersons(persons.concat(nameObject));
      setNewName('');
    } 
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                value={newName}
                onChange={handleNameChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers numbers={persons} />
    </div>
  )
};

export default App;