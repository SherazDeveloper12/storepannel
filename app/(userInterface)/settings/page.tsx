'use client'
import ImageUploader from '@/app/components/ImageUploader/ImageUploader';
import PageStarter from '@/app/components/PageStarter/PageStarter'
import React, { useEffect } from 'react'
import { addCategory, deleteCategory, updateCategory, updateCategoryLocally } from '@/app/store/slices/categorySlice'
import { useDispatch, useSelector } from 'react-redux';
import { addBrand, deleteBrand, updateBrand, updateBrandLocally } from '@/app/store/slices/brandSlice'
import { motion } from 'motion/react';
export default function page() {
  const { categories } = useSelector((state: any) => state.categories);
  const { brands } = useSelector((state: any) => state.brands);
    const user = useSelector((state: any) => state.auth.user);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    className='flex flex-col gap-4 '>
      <PageStarter />
      <div className='flex flex-col gap-2 w-90 '>
        <h2 className='text-2xl'>Your Store Information </h2>
        <div className='flex gap-2'>
          <p>Your Store Name</p>
          <p>:</p>
          <p>{user?.storeName}</p>
        </div>
        <div className='flex gap-2'>
          <p>Your Store ID</p>
          <p>:</p>
          <p>{user?.storeID}</p>
        </div>
      </div>
      <CategoriesBrandsManager categoriesdata={categories} />
      <CategoriesBrandsManager brandsdata={brands} />
    </motion.div>
  )
}

function CategoriesBrandsManager({ categoriesdata, brandsdata }: { categoriesdata?: string[], brandsdata?: string[] }) {

  const [editingmode, setEditingMode] = React.useState(false);

  const [categoryformdata, setCategoryFormdata] = React.useState({
    name: '',
    description: '',
    image: '',
  });

  const [brandformdata, setBrandFormdata] = React.useState({
    name: '',
    description: '',
    image: '',
  });
  const [editingItem, setEditingItem] = React.useState<string | null>(null);
  const [UpdateingMode, setUpdatingMode] = React.useState(false);
  // --=========================================================================
  // --=========================================================================
  // --=========================================================================



  const dispatch = useDispatch();
  useEffect(() => {
    if (editingItem) {

      const itemToEdit = categoriesdata?.find((item: any) => item._id === editingItem);
      if (itemToEdit) {

        setCategoryFormdata({
          name: itemToEdit.name,
          description: itemToEdit.description,
          image: itemToEdit.image,
        });
      }
      else {
        const brandToEdit = brandsdata?.find((item: any) => item._id === editingItem);
        if (brandToEdit) {
          setBrandFormdata({
            name: brandToEdit.name,
            description: brandToEdit.description,
            image: brandToEdit.image,
          });
        }
      }

      setEditingMode(true);
    }
  }, [editingItem]);
  const handleAddCategory = () => {

    dispatch(addCategory(categoryformdata));
    setCategoryFormdata({
      name: '',
      description: '',
      image: '',
    });

  }
  const handleAddBrand = () => {
    dispatch(addBrand(brandformdata));
    setBrandFormdata({
      name: '',
      description: '',
      image: '',
    });
  }
  const handleUpdateCategory = (categoryId: string) => {
    dispatch(updateCategoryLocally({ categoryId, categoryData: categoryformdata }));
    dispatch(updateCategory({ categoryId, categoryData: categoryformdata }));
    setCategoryFormdata({
      name: '',
      description: '',
      image: '',
    });
    setEditingItem(null);
    setEditingMode(false);
    setUpdatingMode(false);
  }
  const handleDeleteCategory = (categoryId: string) => {

    dispatch(deleteCategory(categoryId));
  }
  const handleDeleteBrand = (brandId: string) => {
    dispatch(deleteBrand(brandId));
  }
  const handleUpdateBrand = (brandId: string) => {
    dispatch(updateBrandLocally({ brandId, brandData: brandformdata }));
    dispatch(updateBrand({ brandId, brandData: brandformdata }));
    setBrandFormdata({
      name: '',
      description: '',
      image: '',
    });
    setEditingItem(null);
    setEditingMode(false);
    setUpdatingMode(false);
  }
  return (
    <div className='flex flex-col gap-3'>
      
      {editingmode ? (
        <div className='flex flex-col  gap-2'>
          <h1 className='text-xl font-semibold  '>Adding {categoriesdata ? 'Category' : 'Brand'}</h1>

          <form className='flex gap-2 bg-neutral-800 p-4 rounded w-full'>
            <div>
              <ImageUploader value={categoriesdata ? categoryformdata.image : brandformdata.image} setValue={(e) => categoriesdata ? setCategoryFormdata({ ...categoryformdata, image: e }) : setBrandFormdata({ ...brandformdata, image: e })} />
            </div>
            <div className='flex flex-col gap-2 flex-1 w-full'>
              <div className='flex flex-col gap-2 flex-1 w-full '>
                <label htmlFor="itemname" className='font-semibold'>Enter {categoriesdata ? 'Category' : 'Brand'} Name:</label>
                <input value={categoriesdata ? categoryformdata.name : brandformdata.name} type="text" id="itemname" placeholder={categoriesdata ? 'Category Name' : 'Brand Name'} onChange={(e) => categoriesdata ? setCategoryFormdata({ ...categoryformdata, name: e.target.value }) : setBrandFormdata({ ...brandformdata, name: e.target.value })} className='border border-neutral-300 bg-neutral-900 rounded p-2' />
                <label htmlFor="itemDescription" className='font-semibold'>Enter {categoriesdata ? 'Category' : 'Brand'} Description:</label>
                <textarea id="itemDescription" placeholder='i.e Summer Special is our best selling category ...' name="itemDescription" className="bg-neutral-900 border border-gray-300 rounded p-1 w-full" rows={9} onChange={(e) => categoriesdata ? setCategoryFormdata({ ...categoryformdata, description: e.target.value }) : setBrandFormdata({ ...brandformdata, description: e.target.value })} value={categoriesdata ? categoryformdata.description : brandformdata.description} />
              </div>
              <div>
                <button className='bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300'
                  onClick={() => {
                    UpdateingMode ?
                      categoriesdata ? handleUpdateCategory(editingItem) : handleUpdateBrand(editingItem)
                      :
                      categoriesdata ? handleAddCategory() : handleAddBrand();
                    setEditingMode(false);
                  }
                  }
                >{UpdateingMode ? 'Update' : 'Add'} {categoriesdata ? 'Category' : 'Brand'}</button>
                <button className='bg-gray-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300 ml-2'
                  onClick={() => {
                    setEditingMode(false);
                    setUpdatingMode(false);
                    setcategoryFormdata({
                      name: '',
                      description: '',
                      image: '',
                    });
                    setBrandFormdata({
                      name: '',
                      description: '',
                      image: '',
                    });
                    setEditingItem(null);
                  }
                  }
                >Cancel</button>
              </div>
            </div>



          </form>

        </div>
      ) : (<div className='flex justify-between items-center'>
        <h2 className='text-2xl'>Manage {categoriesdata ? 'Categories' : 'Brands'}</h2>
        <button className='bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300'
          onClick={() => {
            setEditingMode(true);
          }}
        >Add {categoriesdata ? 'Category' : 'Brand'}</button>
      </div>)}


      <table className='w-full text-left border-collapse rounded overflow-hidden'>
        <thead className='bg-neutral-800 w-full'>
          <tr className='bg-neutral-800 border border-neutral-600'>
            <th className=' p-2'>{categoriesdata ? 'Categories' : 'Brands'} </th>
            <th className=' p-2'>Actions </th>

          </tr>
        </thead>
        <tbody className='bg-neutral-900'>
          {(categoriesdata ? categoriesdata?.length : brandsdata?.length) === 0 ? <>
            <tr>
              <td className='p-2 border border-neutral-600 hover:bg-neutral-700 transition-colors duration-300' colSpan={2}>
                No {categoriesdata ? 'categories' : 'brands'} found.
              </td>
            </tr>
          </> : <>
            {(categoriesdata ? categoriesdata : brandsdata)?.map((item) => (
              <tr key={item._id} className='border border-neutral-600 hover:bg-neutral-700 transition-colors duration-300'>

                <td className=' p-2'>

                  {item.name}
                </td>
                <td className=' p-2'>
                  <button
                    className='bg-blue-500 text-white px-2 py-1 rounded mr-2 cursor-pointer'
                    onClick={() => {
                      setEditingItem(item._id);
                      setUpdatingMode(true);
                    }}
                  >Edit</button>
                  <button
                    onClick={() => { categoriesdata ? handleDeleteCategory(item._id) : handleDeleteBrand(item._id) }}
                    className='bg-red-500 text-white px-2 py-1 rounded cursor-pointer'>Delete</button>
                </td>
              </tr>
            ))}
          </>}

        </tbody>

      </table>
    </div>
  )
}