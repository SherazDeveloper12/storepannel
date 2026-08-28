'use client'
import ImageUploader from '@/app/components/ImageUploader/ImageUploader';
import PageStarter from '@/app/components/PageStarter/PageStarter'
import React from 'react'

import Selection from '@/app/components/Selection/Selection';
import RadioInput from '@/app/components/Radio/RadioInput';
import useProductForm from '@/app/hooks/useAddProductForm';
import { Pen, Trash2, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
export default function page() {


  const { categories } = useSelector((state: any) => state.categories);
  const { brands } = useSelector((state: any) => state.brands);

  const {
    AddProduct,
    setAddProduct,
    editingProductId,
    setEditingProductId,
    category,
    setcategory,
    brand,
    setbrand,
    condition,
    setcondition,
    freeShipping,
    setfreeShipping,
    newArrivals,
    setnewArrivals,
    title,
    settitle,
    heading,
    setheading,
    price,
    setprice,
    quantity,
    setquantity,
    description,
    setdescription,
    images,
    setimages,
    product,
    handleAddProductClick,
    editMode,
    handleUpdateProductClick,
    handleedit,
    handledelete,
    status,
    products,
    rating,
    setrating,
    discount,
    setdiscount
  } = useProductForm();


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className=' flex flex-col w-full gap-2'>
      {!AddProduct && (
        <div className='flex justify-between items-center'>
          <PageStarter />
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setAddProduct(true) }}
              className='bg-red-700 cursor-pointer text-white relative font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300'
            >

              Add Product
            </motion.button>
          </div>
        </div>
      )}
      {AddProduct &&
        <div className='p-2 flex flex-col gap-2 w-full'>
          <h2 className='text-xl font-semibold text-white'>Add Products</h2>
          <form className='bg-neutral-800 border border-neutral-600 rounded-lg p-4 flex flex-col md:flex-row gap-4 w-full'>
            <div className='flex-1'>
              <ImageUploader value={images[images.length - 1]} setValue={(value) => setimages(prevImages => [...prevImages, value])} />
              <div>
                <p className='font-semibold mt-2'>Uploaded Images:</p>
                <div className='flex gap-2 mt-1 flex-wrap '>
                  {images.map((img, index) => (
                    <div className='relative'>
                      <X className='cursor-pointer text-black absolute top-0 right-0' onClick={() => { setimages(images.filter((_, i) => i !== index)); }} />
                      <img key={index} src={img} alt={`Uploaded ${index}`} className="w-20 h-20 object-cover border border-gray-300 rounded" />
                    </div>))}
                </div>
              </div>
            </div>
            <div className='flex-1'>
              <label htmlFor="ProductTitle" className='font-semibold'>Enter Product Title:</label>
              <input type="text" id="ProductTitle" placeholder='i.e Iphone 8 Plus' name="ProductTitle" required className="bg-neutral-900 border border-gray-300 rounded p-1 w-full" onChange={(e) => settitle(e.target.value)} value={title} />
              <label htmlFor="ProductHeading" className='font-semibold'>Enter Product Heading:</label>
              <input type="text" id="ProductHeading" placeholder='i.e Iphone 8 Plus 64GB Factory Unlocked' name="ProductHeading" className="bg-neutral-900 border border-gray-300 rounded p-1 w-full" onChange={(e) => setheading(e.target.value)} value={heading} />
              <div className='flex gap-2 '>
                <div className='flex-1'>
                  <label htmlFor="ProductPrice" className='font-semibold'>Enter Product Price:</label>
                  <input type="number" id="ProductPrice" placeholder='i.e 699' name="ProductPrice" value={price} className="bg-neutral-900 border border-gray-300 rounded p-1 w-full" onChange={(e) => setprice(e.target.value)} />
                </div>
                <div className='flex-1'>
                  <label htmlFor="ProductQuantity" className='font-semibold'>Enter Product Quantity:</label>
                  <input type="number" id="ProductQuantity" placeholder='i.e 12' name="ProductQuantity" min={1} value={quantity} className="bg-neutral-900 border border-gray-300 rounded p-1 w-full" onChange={(e) => setquantity(e.target.value)} />
                </div>
              </div>
              <div className='flex gap-2 '>
                <div className='flex-1'>
                  <label htmlFor="ProductDiscount" className='font-semibold'>Enter Product Discount: (%)</label>
                  <input type="number" id="ProductDiscount" placeholder='i.e 10' name="ProductDiscount" value={discount} className="bg-neutral-900 border border-gray-300 rounded p-1 w-full" onChange={(e) => setdiscount(e.target.value)} />
                </div>
                <div className='flex-1'>
                  <label htmlFor="ProductRating" className='font-semibold'>Enter Product Rating:</label>
                  <input type="number" id="ProductRating" placeholder='i.e 4.5' name="ProductRating" min={0} max={5} step={1} value={rating} className="bg-neutral-900 border border-gray-300 rounded p-1 w-full" onChange={(e) => setrating(e.target.value)} />
                </div>
              </div>
              <label htmlFor="ProductDescription" className='font-semibold'>Enter Product Description:</label>
              <textarea id="ProductDescription" placeholder='i.e This is a great phone with...' name="ProductDescription" className="bg-neutral-900 border border-gray-300 rounded p-1 w-full" rows={12} onChange={(e) => setdescription(e.target.value)} value={description} />
            </div>
            <div className='flex-1'>
              <div>
                <p className='font-semibold'>Tick if  given service is true for this product:</p>
                <div className='flex gap-4 items-center '>
                  <input type="checkbox" className="size-4 " id='FreeShipping' onChange={(e) => setfreeShipping(e.target.checked)} checked={freeShipping} />
                  <label htmlFor="FreeShipping" >Free Shipping Available</label>
                </div>
                <div className='flex gap-4 items-center '>
                  <input type="checkbox" className="size-4" id='NewArrivals' onChange={(e) => setnewArrivals(e.target.checked)} checked={newArrivals} />
                  <label htmlFor="NewArrivals" >New Arrivals</label>
                </div>
              </div>
              <Selection options={categories} name="category" setValue={(value) => setcategory(value)} value={category} />
              <Selection options={brands} name="Brand" setValue={(value) => setbrand(value)} value={brand} />
              <RadioInput options={["New", "Used", "Refurbished"]} name="Condition" setValue={(value) => setcondition(value)} value={condition} />
              <button className='bg-red-500 text-white rounded px-4 py-2 mt-4 hover:bg-red-600' onClick={editMode ? () => { handleUpdateProductClick(product) } : () => handleAddProductClick(product)}>{editMode ? "Update Product" : "Add Product"}</button>
              <button className='bg-gray-500 text-white rounded px-4 py-2 mt-4 ml-2 hover:bg-gray-600' onClick={() => { setAddProduct(false) }}>Cancel</button>
            </div>
          </form>
        </div>
      }
      <div className=' flex flex-col gap-2 w-full'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold text-neutral-400'></h2>
          <div className='text-neutral-400 '>
            Total Products: <span className='text-neutral-400 '>{products.length}</span>
          </div>
        </div>

        {status === 'loading' ? <div>Loading...</div> : <div>

          {products && products.length > 0 ? (
            <table className='w-full text-left border-collapse rounded overflow-hidden'>
              <thead>
                <tr className='bg-neutral-800 border border-neutral-600'>
                  <th className=' p-2'>Images </th>
                  <th className=' p-2'>Title</th>
                  <th className='hidden md:table-cell  p-2'>Stock</th>

                  <th className='hidden md:table-cell  p-2'>Category</th>
                  <th className='hidden md:table-cell  p-2'>Brand</th>
                  <th className='hidden md:table-cell p-2'>Price</th>
                  <th className='p-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-neutral-900'>
                {products.map((product) => (
                  <tr key={product._id} className='border border-neutral-600 hover:bg-neutral-700 transition-colors duration-300 '>
                    <td className='  '>
                      <div className='flex justify-start items-center flex-wrap  md:gap-2 overflow-x-auto'>
                        {product.img.map((image, index) => (
                          <div key={index} className='size-10 md:size-16 p-2  rounded-md'>
                            <img
                              key={index}
                              src={image}
                              alt={product.title}
                              className=' object-cover w-full h-full rounded-md'
                            />
                          </div>
                        ))
                        }
                      </div>
                    </td>
                    <td className=' p-2'>{product.title}</td>
                    <td className='hidden md:table-cell  p-2'>{product.quantity}</td>

                    <td className='hidden md:table-cell  p-2'>{product.category}</td>
                    <td className={`hidden md:table-cell ${product.brand ? 'text-white' : 'text-neutral-400'}  p-2`}>{product.brand ? product.brand : 'N/A'}</td>
                    <td className='hidden md:table-cell p-2 font-semibold'>${product.price}</td>
                    <td className='px-1 md:px-4 flex gap-1  items-center   py-6  text-sm text-white  '>
                      <div className='flex flex-col md:flex-row   items-center'>
                        <Pen onClick={() => handleedit(product._id)} size={16} className='text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />

                      </div>

                      <div className='flex flex-col md:flex-row   items-center'>
                        <Trash2 onClick={() => handledelete(product._id)} size={16} className='text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products available.</p>
          )}
        </div>
        }


      </div>



    </motion.div>
  )
}
