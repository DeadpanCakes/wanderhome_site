import React, { useEffect } from "react"

const useOutsideChecker = (ref, setVisible) => {
    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setVisible(false)
            }
        }
        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [])
    return;
}

export default useOutsideChecker