
const Button = ({person, removePerson}) => {
  return(
    <button 
      type='button'
      onClick={(event)=>{
        if(window.confirm(`Delete ${person.name}?`)){
          removePerson(person.id)
        }
      }}
      >delete
    </button>
  )
};

const Person = ({person, removePerson}) => <p>{person.name} {person.number} <Button person={person} removePerson={removePerson}/></p>

const Persons = ({persons, filterString, removePerson}) => {
  //filter the people whose names contain the filterString, case insensitive
  return (persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase())).map(person => {
     return <Person key={person.id} person={person} removePerson={removePerson}/>}
    )
  )
};

export default Persons;