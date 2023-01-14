
const Person = ({person}) => <p>{person.name} {person.number}</p>

const Persons = ({persons, filterString}) => {
  //filter the people whose names contain the filterString, case insensitive
  return (persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase())).map(person => {
     return <Person key={person.id} person={person}/>}
    )
  )
};

export default Persons;