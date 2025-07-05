import { useState } from "react";
import './Components.css';
import { useNavigate } from "react-router-dom";
export default function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    async function handleAdd(e) {
        e.preventDefault();
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        let storedUser = JSON.parse(localStorage.getItem('user'));
        let userID = storedUser._id;
        let result = await fetch('https://e-comm-website-backend.onrender.com/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, userID, category, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
        result = await result.json();
        alert('Product added');
        navigate('/');
    }
    return (
        <>
            <div className='AddProduct'>

                <h1>Add Products</h1>

                <form className="AddProductForm" >
                    <input
                        type="string"
                        name="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}

                    />
                    {error && !name && < span className='invalid-input'> Enter  Valid Name </span>}
                    <input
                        type="string"
                        name="price"
                        placeholder="Enter Price"
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}

                    />
                    {error && !price && < span className='invalid-input'> Enter  Valid Price </span>}

                    <input
                        type="string"
                        name="category"
                        placeholder="Enter Category"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}
                        className="input"
                    />
                    {error && !category && < span className='invalid-input'> Enter  Valid Category </span >}

                    <input
                        type="string"
                        name="company"
                        placeholder="Enter Company"
                        value={company}
                        onChange={(e) => { setCompany(e.target.value) }}

                    />
                    {error && !company && < span className='invalid-input' > Enter  Valid company </span >}
                    <br></br>
                    <button onClick={handleAdd} type="submit">Add Product</button>
                </form >

            </div >

        </>
    )
}