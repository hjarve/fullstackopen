import { useState } from "react"
import { EDIT_BORN } from "../queries"
import { useMutation } from "@apollo/client"
import Select from 'react-select';

const SetBirthYear = ({authors}) => {
  const options = authors.map(a =>{ return {value: a.name, label: a.name}})

  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  const [ editBorn ] = useMutation(EDIT_BORN)

  const submit = async (event) => {
  event.preventDefault()

  editBorn({variables: {name: selectedOption.value, born: Number(born)}})
  setSelectedOption(null)
  setBorn('')
  }

  return(
    <div>
      <h3>Set birth year</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            defaulValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born<input
            type="number"
            value={born}
            onChange={({target}) => setBorn(target.value)}
          />
        </div>
        <button type="submit">
          Update author
        </button>
      </form>
    </div>
  )
}

export default SetBirthYear