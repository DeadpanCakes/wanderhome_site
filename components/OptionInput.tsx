import { useState } from "react"
import { v4 as uuid } from "uuid"

const OptionInput = ({ name, submittedData, setSubmitted }) => {
    const [newData, setNewData] = useState("")
    return (
        <>
            <label htmlFor={name}>{name}</label>
            <ul>
                {submittedData.map((i) => {
                    return <li key={uuid()}>{i}</li>
                })}
            </ul>
            <div>
                <input id={name} value={newData} onChange={(e) => setNewData(e.target.value)}></input>
                <button onClick={(e) => {
                    e.preventDefault()
                    setSubmitted(prevState => prevState.concat(newData))
                    setNewData("")
                }}>+</button>
            </div>
        </>
    )
}

export default OptionInput