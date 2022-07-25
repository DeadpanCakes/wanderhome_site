import { useState } from "react"
import { v4 as uuid } from "uuid"
import styles from "../styles/OptionInput.module.css"

const OptionInput = ({ name, submittedData, setSubmitted }) => {
    const [newData, setNewData] = useState("")
    return (
        <>
            <input name={name} value={JSON.stringify(submittedData)} className={styles.hiddenField} readOnly={true}></input>
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