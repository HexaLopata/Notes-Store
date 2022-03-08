import { ButtonGroup, ToggleButton } from "react-bootstrap"

export default function Selection({ header, options, value, setValue, variant = 'outline-primary', className }) {
    return (
        <div className={className}>
            <h5>{header}</h5>
            <ButtonGroup>
                {options.map((choice) => {
                    return (
                        <ToggleButton
                            key={choice}
                            type='radio'
                            variant={variant}
                            checked={value === choice}
                            onClick={(_) => setValue(choice)}
                        >
                            {choice}
                        </ToggleButton>
                    )
                })}

            </ButtonGroup>
        </div >
    )
}
