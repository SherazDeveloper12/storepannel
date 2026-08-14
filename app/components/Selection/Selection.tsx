import { addBrand, addBrandlocally, addCategory, addCategorylocally, updateSettings } from '@/app/store/slices/settingSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
export default function Selection({ options, name, value, setValue }) {
    const [selectedValue, setSelectedValue] = React.useState(`${value}`);  
    const router = useRouter();
    useEffect(() => {
        setSelectedValue(value);
    }, [value]);
    return (
        <div className='w-full'>
            <div className='flex justify-start items-start gap-1 w-full'>
                <label
                    htmlFor="selectionlabel"
                    className=' text-sm'
                >
                    Please Select the {name}:
                </label>
                <p
                    onClick={() => {router.push(`/settings`)}}
                    className=' text-red-500 cursor-pointer text-sm  hover:underline '
                >
                    Add {name}
                </p>
            </div>
            
                <select
                id="selectionlabel"
                className="bg-neutral-900 border border-gray-300 rounded p-1 w-full"
                value={selectedValue}
                onChange={(e) => { setSelectedValue(e.target.value); setValue(e.target.value); }}
            >
                {
                   
                    options.map((option, index) => (
                        
                        <option key={index} value={option.name}>{option.name}</option>
                    ))
                }

            </select>
            
            
        </div>
    )
}

