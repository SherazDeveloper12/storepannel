import React, { useEffect } from 'react'

export default function RadioInput({ options, name, setValue, value }) {
    const [selectedValue, setSelectedValue] = React.useState(value);
    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    return (
        <div>
            <div className='font-semibold flex gap-1'>
                <p>Please Select the</p>
                <p>{name}</p>
                <p>:</p>

            </div>
            <div className='flex gap-2 items-center '>
                {options.map((option, index) => (
                    <div key={index} className='flex gap-1 items-center'>
                        <input type="radio"  className="size-4" id={option} checked={option === value} name="radio"
                            onChange={() => { setSelectedValue(option); setValue(option); }} />
                        <label htmlFor={option} >{option}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}
