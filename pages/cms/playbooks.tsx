import { useState } from "react";
import OptionInput from "../../components/OptionInput"

const Playbooks = () => {
    const [animals, setAnimals] = useState([])
    const [personality, setPersonality] = useState([])
    const [appearance, setAppearance] = useState([])
    const [history, setHistory] = useState([])
    const [relationships, setRelationships] = useState([])
    const [signatureMoves, setSignatureMoves] = useState([])
    const [seasonalMoves, setSeasonalMoves] = useState([])

    return <form>
        <label htmlFor="name">Playbook Name</label>
        <input id="name"></input>
        <label htmlFor="description">Description</label>
        <input id="description"></input>
        <OptionInput name="animal" submittedData={animals} setSubmitted={setAnimals} />
        <OptionInput name="personality" submittedData={personality} setSubmitted={setPersonality} />
        <OptionInput name="appearance" submittedData={appearance} setSubmitted={setAppearance} />
        <OptionInput name="history" submittedData={history} setSubmitted={setHistory} />
        <OptionInput name="relationships" submittedData={relationships} setSubmitted={setRelationships} />
        <OptionInput name="signatureMoves" submittedData={signatureMoves} setSubmitted={setSignatureMoves} />
        <OptionInput name="seasonalMoves" submittedData={seasonalMoves} setSubmitted={setSeasonalMoves} />
    </form>
}

export default Playbooks