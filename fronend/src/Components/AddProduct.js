import React, { useState } from 'react'

const AddProduct = () => {


    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const collectData = async () => {
        console.log(name, price, category, company);

        if (!name || !price || !category || !company) {
            setError(true)
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                      authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        });

        result = await result.json();

        console.warn('front end result ------------', result);


    }

    return (


        <div className='product'>

            <h1>Add Product</h1>
            <input className='inputbox' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' />

            {error && !name && <span className='invalid_title'> Enter valid name</span>}
            <input className='inputbox' type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter your price' />
            {error && !price && <span className='invalid_title'> Enter valid price</span>}
            <input className='inputbox' type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter your category' />
            {error && !category && <span className='invalid_title'> Enter valid category</span>}
            <input className='inputbox' type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Enter your company' />
            {error && !company && <span className='invalid_title'> Enter valid company</span>}
            <button className='appButton' onClick={collectData} type='button'>Add product</button>
        </div>
    )






}

export default AddProduct;