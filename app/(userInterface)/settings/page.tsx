'use client'
import ImageUploader from '@/app/components/ImageUploader/ImageUploader';
import PageStarter from '@/app/components/PageStarter/PageStarter'
import React, { useEffect } from 'react'
import { addCategory, deleteCategory, updateCategory, updateCategoryLocally } from '@/app/store/slices/categorySlice'
import { useDispatch, useSelector } from 'react-redux';
import { addBrand, deleteBrand, updateBrand, updateBrandLocally } from '@/app/store/slices/brandSlice'
import { motion } from 'motion/react';
import { Pen, Save, Trash2 } from 'lucide-react';
import { updateProfile } from '@/app/store/slices/authSlice';
export default function page() {
  const user = useSelector((state: any) => state.auth.user);

  const [data, setDate] = React.useState({
    storeName: '',
    storeURL: '',
    storeDescription: '',
    storeDeliveryCharges: '',
    storePaymentMethods: [],
  });
  useEffect(() => {
    if (user) {
      setDate({
        storeName: user.storeName || '',
        storeURL: user.storeURL ? user.storeURL : '',
        storeDescription: user.storeDescription ? user.storeDescription : '',
        storeDeliveryCharges: user.storeDeliveryCharges ? user.storeDeliveryCharges : '',
        storePaymentMethods: user.storePaymentMethods ? user.storePaymentMethods : [],
      });
    }
  }, [user])

  const { categories } = useSelector((state: any) => state.categories);
  const { brands } = useSelector((state: any) => state.brands);
  const [addStorePaymentMethod, setAddStorePaymentMethod] = React.useState(false);
  const [updateStorePaymentMethod, setUpdateStorePaymentMethod] = React.useState(null);
  console.log('updateStorePaymentMethod', updateStorePaymentMethod);
  useEffect(() => {
    if (updateStorePaymentMethod !== null) {
      setPaymentMethodFormData({
        type: user.storePaymentMethods[updateStorePaymentMethod].type || '',
        accountName: user.storePaymentMethods[updateStorePaymentMethod].accountName || '',
        accountNumber: user.storePaymentMethods[updateStorePaymentMethod].accountNumber || '',
        enabled: user.storePaymentMethods[updateStorePaymentMethod].enabled || false,
        bankName: user.storePaymentMethods[updateStorePaymentMethod].bankName || '',
      });
    }
  }, [updateStorePaymentMethod])
  const dispatch = useDispatch();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (updateStorePaymentMethod !== null) {
      // Update existing payment method
     const updatedPaymentMethods = [...user.storePaymentMethods];
      updatedPaymentMethods[updateStorePaymentMethod] = PaymentMethodFormData;
      dispatch(updateProfile({ storePaymentMethods: updatedPaymentMethods }));
    }
    else {
      // Add new payment method
      dispatch(updateProfile({ storePaymentMethods: [...user.storePaymentMethods, PaymentMethodFormData] }));
    }

    setAddStorePaymentMethod(false);
    setUpdateStorePaymentMethod(null);
    setPaymentMethodFormData({
      type: '',
      accountName: '',
      accountNumber: '',
      enabled: false,
      bankName: '',
    });
  }
  const handleSaveClick = (field: string) => {
    if (field === 'storeName') {
      dispatch(updateProfile({ storeName: data.storeName }));

    } else if (field === 'storeURL') {
      dispatch(updateProfile({ storeURL: data.storeURL }));
    }
    SeteditingStoreInfoItem('');
  };


  const [editingStoreInfoItem, SeteditingStoreInfoItem] = React.useState('');
  const handleCancelClick = (e) => {
    e.preventDefault();
    setAddStorePaymentMethod(false);
    setUpdateStorePaymentMethod(null);
    SeteditingStoreInfoItem('');
  }
  const [PaymentMethodFormData, setPaymentMethodFormData] = React.useState({
    type: '',
    accountName: '',
    accountNumber: '',
    enabled: false,
    bankName: '',
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='flex flex-col gap-4 w-full  '>
      <PageStarter />
      <div className='flex flex-col items-start gap-2 w-full '>
        <div className='flex flex-col gap-2 w-120 '>
          <h2 className='text-lg font-semibold text-white'>Your Store Information </h2>
          <div className='flex gap-2 items-center '>
            <p className='text-sm text-neutral-400 min-w-60'>Your Store Name : </p>

            {editingStoreInfoItem === 'storeName' ?
              <>
                <input type="text" value={data.storeName} onChange={(e) => { setDate({ ...data, storeName: e.target.value }) }} className='border-b border-neutral-600 focus:outline-none  text-sm text-white' />
                <span>

                  <Save
                    onClick={() => { handleSaveClick('storeName') }}
                    size={16} className=' text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />
                </span>
              </>
              :
              <>
                <p className='text-sm text-white'>{user?.storeName ? user?.storeName : 'Not set'}</p>
                <span>
                  <Pen
                    onClick={() => SeteditingStoreInfoItem('storeName')}
                    size={16} className=' text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />
                </span>
              </>
            }

          </div>

          <div className='flex gap-2'>
            <p className='text-sm text-neutral-400 min-w-60'>Your Store ID : </p>
            <p className='text-sm text-white'>{user?.storeID}</p>
          </div>

          <div className='flex gap-2 items-center'>
            <p className='text-sm text-neutral-400 min-w-60'>Your Store URL : </p>
            {editingStoreInfoItem === 'storeURL' ?
              <>
                <input type="text" value={data.storeURL} onChange={(e) => { setDate({ ...data, storeURL: e.target.value }) }} className='border-b border-neutral-600 focus:outline-none  text-sm text-white' />
                <span>

                  <Save
                    onClick={() => { handleSaveClick('storeURL') }}
                    size={16} className=' text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />
                </span>
              </>
              :
              <>
                <p className='text-sm text-white'>{user?.storeURL ? user?.storeURL : 'Not set'}</p>
                <span>
                  <Pen
                    onClick={() => SeteditingStoreInfoItem('storeURL')}
                    size={16} className=' text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />
                </span>
              </>
            }

          </div>
          <div className='flex gap-2 items-center'>
            <p className='text-sm text-neutral-400 min-w-60'>Your Store Delivery Charges : </p>
            {editingStoreInfoItem === 'storeDeliveryCharges' ?
              <>
                <input type="text" value={data.storeDeliveryCharges} onChange={(e) => { setDate({ ...data, storeDeliveryCharges: e.target.value }) }} className='border-b border-neutral-600 focus:outline-none  text-sm text-white' />
                <span>

                  <Save
                    onClick={() => { }}
                    size={16} className=' text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />
                </span>
              </>
              :
              <>
                <p className='text-sm text-white'>{user?.storeDeliveryCharges ? user?.storeDeliveryCharges : 'Not set'}</p>
                <span>
                  <Pen
                    onClick={() => SeteditingStoreInfoItem('storeDeliveryCharges')}
                    size={16} className=' text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />
                </span>
              </>
            }

          </div>
        </div>
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex gap-2 items-center justify-between'>
            <p className='text-sm text-neutral-400 min-w-60'>Your Store Payment Methods : </p>
            {addStorePaymentMethod || updateStorePaymentMethod !== null ? null :
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setAddStorePaymentMethod(true);
                }}
                className='bg-red-700 cursor-pointer text-white relative font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300'
              >

                Add Method
              </motion.button>
            }

          </div>

          {
            addStorePaymentMethod || updateStorePaymentMethod !== null ?
              <div className='flex flex-col  gap-2'>
                <h1 className='text-xl font-semibold  '>{updateStorePaymentMethod !== null ? " Update" : "Add"} Your Payment Methods</h1>

                <form
                  onSubmit={(e) => handleFormSubmit(e)}

                  className='flex gap-2 bg-neutral-800 p-4 rounded w-full'>

                  <div className='flex flex-col gap-2 flex-1 w-full'>
                    <div className='flex flex-col gap-2 flex-1 w-full '>
                      <label htmlFor="itemname" className='font-semibold'>Select Payment Method:</label>
                      <select required value={PaymentMethodFormData.type} id="itemname" onChange={(e) => setPaymentMethodFormData({ ...PaymentMethodFormData, type: e.target.value })} className='border border-neutral-300 bg-neutral-900 rounded p-2'>
                        <option value="" disabled selected>Select a payment method</option>
                        {user?.storePaymentMethods.find((method: any) => method.type === "cod") ? null : (
                          <option value="cod">Cash on Delivery</option>
                        )}
                        { }
                        <option value="easypaisa">Easypaisa</option>
                        <option value="jazzcash">JazzCash</option>
                        <option value="bank_transfer">Bank Transfer</option>
                      </select>
                      {PaymentMethodFormData.type === 'bank_transfer' && (<>
                        <label htmlFor="itemDescription" className='font-semibold'>Enter Bank Name:</label>
                        <input value={PaymentMethodFormData.bankName} type="text" id="itemDescription" placeholder={`Enter bank name`} onChange={(e) => setPaymentMethodFormData({ ...PaymentMethodFormData, bankName: e.target.value })} className='border border-neutral-300 bg-neutral-900 rounded p-2' />

                      </>)}
                      {PaymentMethodFormData.type !== "cod" && (<>
                        <label htmlFor="itemDescription" className='font-semibold'>Enter Account Name:</label>
                        <input value={PaymentMethodFormData.accountName} type="text" id="itemDescription" placeholder={`Enter account name`} onChange={(e) => setPaymentMethodFormData({ ...PaymentMethodFormData, accountName: e.target.value })} className='border border-neutral-300 bg-neutral-900 rounded p-2' />
                        <label htmlFor="itemDescription" className='font-semibold'>Enter Account Number:</label>
                        <input value={PaymentMethodFormData.accountNumber} type="text" id="itemDescription" placeholder={`Enter account number`} onChange={(e) => setPaymentMethodFormData({ ...PaymentMethodFormData, accountNumber: e.target.value })} className='border border-neutral-300 bg-neutral-900 rounded p-2' />
                      </>
                      )}
                      <label htmlFor="status" className='font-semibold'>Status:</label>
                      <select required value={PaymentMethodFormData.enabled ? 'enabled' : 'disabled'} id="status" onChange={(e) => setPaymentMethodFormData({ ...PaymentMethodFormData, enabled: e.target.value === 'enabled' })} className='border border-neutral-300 bg-neutral-900 rounded p-2'>
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>
                    <div className='flex items-center gap-2'>
                      <button className='flex-1 bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300'
                        type='submit'
                      >{updateStorePaymentMethod !== null ? 'Update' : 'Add'}</button>
                      <button
                        onClick={(e) => handleCancelClick(e)}
                        className='flex-1 bg-gray-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300 ml-2'

                      >Cancel</button>
                    </div>
                  </div>



                </form>

              </div> :
              <table className='w-full text-left border-collapse rounded overflow-hidden bg-red-500'>
                <thead className='bg-neutral-800 w-full'>
                  <tr className=' border border-neutral-600 p-2'>
                    <td className='p-2'>Payment Method</td>
                    <td className='p-2'>Account Name</td>
                    <td className='p-2'>Account Number</td>
                    <td className='p-2'>Status</td>
                    <td className='p-2'>Actions</td>
                  </tr>
                </thead>
                <tbody className='bg-neutral-900'>
                  {user?.storePaymentMethods ?
                    user.storePaymentMethods.map((method: string, idx) =>
                      <tr key={idx} className='border border-neutral-600 hover:bg-neutral-700 transition-colors duration-300'>
                        <td className='p-2'>{method.type || 'NAN'}</td>
                        <td className='p-2'>{method.accountName || ''}</td>
                        <td className='p-2'>{method.accountNumber ? method.accountNumber : ''}</td>
                        <td className='p-2'><span className={method.enabled ? 'text-neutral-800 font-semibold rounded bg-green-500 p-1' : 'text-neutral-800 font-semibold rounded bg-orange-500 p-1'} >{method.enabled ? 'Enabled' : 'Disabled'}</span></td>
                        <td className='p-2'>
                          <span>
                            <Pen
                              onClick={() => setUpdateStorePaymentMethod(idx)}
                              size={16} className=' text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />
                          </span>
                        </td>
                      </tr>
                    ) : null}
                </tbody>
              </table>
          }


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

          <h2 className='text-lg font-semibold text-white'>Adding {categoriesdata ? 'Category' : 'Brand'}</h2>
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

        <h2 className='text-lg font-semibold text-white'>Manage {categoriesdata ? 'Categories' : 'Brands'}</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingMode(true);
          }}
          className='bg-red-700 cursor-pointer text-white relative font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300'
        >

          Add {categoriesdata ? 'Category' : 'Brand'}
        </motion.button>

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

                <td className='px-1 md:px-4 flex gap-1  items-center   py-2  text-sm text-white  '>
                  <div className='flex flex-col md:flex-row   items-center'>
                    <Pen onClick={() => {
                      setEditingItem(item._id);
                      setUpdatingMode(true);
                    }} size={16} className='text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />

                  </div>

                  <div className='flex flex-col md:flex-row   items-center'>
                    <Trash2 onClick={() => { categoriesdata ? handleDeleteCategory(item._id) : handleDeleteBrand(item._id) }} size={16} className='text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />

                  </div>
                </td>
              </tr>
            ))}
          </>}

        </tbody>

      </table>
    </div>
  )
}