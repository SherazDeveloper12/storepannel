'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, updateProduct } from "../store/slices/productsSlice";
import { useRouter, useParams } from 'next/navigation';




export default function useProductForm() {
    const [AddProduct, setAddProduct] = useState(false);
    const  [editingProductId, setEditingProductId] = useState(null);
    const router = useRouter();
    const [category, setcategory] = useState('electronics');
    const [brand, setbrand] = useState('Apple');
    const [condition, setcondition] = useState('New');
    const [freeShipping, setfreeShipping] = useState(true);
    const [newArrivals, setnewArrivals] = useState(false);
    const [title, settitle] = useState('');
    const [heading, setheading] = useState('');
    const [price, setprice] = useState(0);
    const [quantity, setquantity] = useState(1);
    const [description, setdescription] = useState('');
    const [images, setimages] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    
    const products = useSelector((state) => state.products.Products)
     const status = useSelector((state) => state.products.status)
    const existingProduct = products.find(prod => prod._id === editingProductId);
    

        useEffect(() => {
            if (existingProduct && editingProductId) {
            setcategory(existingProduct.category);
            setbrand(existingProduct.brand);
            setcondition(existingProduct.condition);
            setfreeShipping(existingProduct.freeShipping);
            setnewArrivals(existingProduct.newArrival);
            settitle(existingProduct.title);
            setheading(existingProduct.heading);
            setprice(existingProduct.price);
            setquantity(existingProduct.quantity);
            setdescription(existingProduct.description);
            setimages(existingProduct.img);
            setEditMode(true);
              }
        }, [editingProductId]);
  
    const product = {
        title: title,
        heading: heading,
        price: price,
        img: images,
        freeShipping: freeShipping,
        newArrival: newArrivals,
        quantity: quantity,
        description: description,
        category: category,
        brand: brand,
        condition: condition,
    };
    const handledelete = (id) => {
        dispatch(deleteProduct(id))
       }
       const handleedit = (id) => {

        setEditingProductId(id);
        setAddProduct(true);
        setEditMode(true);
       }
   const handleAddProductClick = (product) => {
        console.log('Adding product:', product);
        dispatch(createProduct(product));
        setbrand('Apple');
        setcategory('electronics');
        setcondition('New');
        setfreeShipping(true);
        setnewArrivals(false);
        settitle('');
        setheading('');
        setprice(0);
        setquantity(1);
        setdescription('');
        setimages([]);
    }
    const handleUpdateProductClick = (product) => {
        console.log('Updating product:', product);
        const updatedProduct = { ...product, _id: existingProduct._id };
        // Dispatch update action here
        dispatch(updateProduct(updatedProduct));
        setbrand('Apple');
        setcategory('electronics');
        setcondition('New');
        setfreeShipping(true);
        setnewArrivals(false);
        settitle('');
        setheading('');
        setprice(0);
        setquantity(1);
        setdescription('');
        setimages([]);
        setAddProduct(false);
        editingProductId(null);
        setEditMode(false);

    }
    return {
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
        status,
        products,
         handledelete,
         handleedit
    }
};
