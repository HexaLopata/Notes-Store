import { useLayoutEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useTransition } from '../../hooks/useTransition'
import classes from './SmartAlert.module.css'

const SmartAlert = ({ message, lifeTime = 5000, hideAlert, variant = 'info' }) => {

    const fade = () => {
        makeTransition(classes.fading, classes.hidden, classes.fixed, 400)
    }

    const appear = () => {
        makeTransition(classes.appearing, classes.active, '', 400)
    }

    useLayoutEffect(() => {
        if (message.trim() !== '') {
            setPrevMessage(message)
            appear()
            const timeout = setTimeout(() => {
                hideAlert()
                fade()
            }, lifeTime)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [message])

    const [prevMessage, setPrevMessage] = useState('')
    const [transitionClasses, isFading, makeTransition] = useTransition(classes.hidden + ' ' + classes.fixed)

    const content = isFading ? prevMessage : message

    return (
        <Alert className={transitionClasses} variant={variant}>
            {content}
        </Alert>
    )
}

export default SmartAlert