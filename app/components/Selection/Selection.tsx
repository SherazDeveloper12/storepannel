import React, { useEffect } from 'react'

export default function Selection({ options, name, value , setValue }) {
    const [selectedValue, setSelectedValue] = React.useState(`${value}`);
    useEffect(() => {
        setSelectedValue(value);
    }, [value]);
    return (
        <div className='w-full'>
            <label
                htmlFor="selectionlabel"
                className='font-semibold'
            >
                Please Select the {name}:
            </label>
            <select
                id="selectionlabel"
                className="bg-neutral-900 border border-gray-300 rounded p-1 w-full"
                value={selectedValue}
                onChange={(e) => { setSelectedValue(e.target.value); setValue(e.target.value); }}
            >
                {
                    options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))
                }

            </select>
        </div>
    )
}

