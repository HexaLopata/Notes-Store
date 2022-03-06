import { useState } from "react"

export const useTransition = (defaultState) => {

    const makeTransition = (
        transitionClass = '', 
        toStateClass = '', 
        endState = '', 
        trasitionTime = 500,
        callback
    ) => {
        setTransition(transitionClass)
        setCurrentState(toStateClass)
        setIsMakingTransition(true)
        setTimeout(() => {
            setIsMakingTransition(false)
            setTransition('')
            setCurrentState(toStateClass + ' ' + endState)
            if (callback) {
                callback()
            }
        }, trasitionTime)
    }

    const [transition, setTransition] = useState('');
    const [currentState, setCurrentState] = useState(defaultState)
    const [isMakingTransition, setIsMakingTransition] = useState(false)

    return [`${transition} ${currentState}`, isMakingTransition, makeTransition]
}