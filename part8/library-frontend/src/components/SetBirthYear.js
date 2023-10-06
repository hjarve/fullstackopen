import { useState } from "react"
import { EDIT_BORN } from "../queries"
import { useMutation } from "@apollo/client"

const SetBirthYear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editBorn ] = useMutation(EDIT_BORN)

  const submit = async (event) => {
  event.preventDefault()
  console.log(name, born);

  editBorn({variables: {name, born: Number(born)}})
  setName('')
  setBorn('')
  }

  return(
    <div>
      <h3>Set birth year</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input 
            value={name}
            onChange={({target}) => setName(target.value)}
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