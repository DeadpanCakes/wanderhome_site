import { useState } from "react"

interface Props {
    children: React.ReactNode
}

const Accordian = ({ children }: Props) => {
    const [isExpanded, setExpansion] = useState(false)
    const toggleExpansion = () => setExpansion(prevState => !prevState)
    return (
        <div>
            <div>
                {children}
            </div>
            <button onClick={toggleExpansion}>{isExpanded ? "^" : "v"}</button>
        </div>
    )
}

export default Accordian