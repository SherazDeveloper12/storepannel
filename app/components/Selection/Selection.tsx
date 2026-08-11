import { addBrand, addBrandlocally, addCategory, addCategorylocally, updateSettings } from '@/app/store/slices/settingSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Selection({ options, name, value, setValue }) {
    const [selectedValue, setSelectedValue] = React.useState(`${value}`);
    const { categories, brands } = useSelector((state: any) => state.setting);
    const [addingOption, setAddingOption] = React.useState(false);
   const [category, setCategory] = React.useState('');
   const [brand, setBrand] = React.useState('');
    const dispatch = useDispatch();
    const handleAddCategory = () => {
        dispatch(addCategorylocally(category));
        dispatch(addCategory(category));
        setAddingOption(false);
        setCategory('');
    }
    const handleAddBrand = () => {
        dispatch(addBrandlocally(brand));
        dispatch(addBrand(brand));
        setAddingOption(false);
        setBrand('');
    }
    
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
                    onClick={() => setAddingOption(true)}
                    className=' text-red-500 cursor-pointer text-sm  hover:underline '
                >
                    Add {name}
                </p>
            </div>
            {addingOption ? (
                <div className='flex justify-start items-center gap-2 w-full'>
                    <input
                        type="text"
                        placeholder={`Enter new ${name}`}
                        className='bg-neutral-900 border border-gray-300 rounded p-1 w-full'
                        value={options === categories ? category : brand}
                        onChange={(e) => options === categories ? setCategory(e.target.value) : setBrand(e.target.value)}
                    />
                    <div className='flex justify-end items-center gap-2 '>
                         <button
                            onClick={() =>  options === categories ? handleAddCategory() : handleAddBrand()}
                            className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
                        >
                            Add
                        </button>
                        <button
                            onClick={() => setAddingOption(false)}
                            className='bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600'
                        >
                            Cancel
                        </button>
                       
                    </div>
                </div>
            ) : (
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
            )}
            
        </div>
    )
}

