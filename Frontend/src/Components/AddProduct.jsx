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
        if (!name.trim() || !price.trim() || !category.trim() || !company.trim()) {
            setError(true);
            return;
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

                <form className="AddProductForm" onSubmit={handleAdd} noValidate>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setError(false); }}
                    />
                    {error && !name.trim() && <span className='invalid-input'>Enter a valid name</span>}

                    <input
                        type="number"
                        name="price"
                        placeholder="Enter Price"
                        value={price}
                        onChange={(e) => { setPrice(e.target.value); setError(false); }}
                    />
                    {error && !price.trim() && <span className='invalid-input'>Enter a valid price</span>}

                    <input
                        type="text"
                        name="category"
                        placeholder="Enter Category"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value); setError(false); }}
                    />
                    {error && !category.trim() && <span className='invalid-input'>Enter a valid category</span>}

                    <input
                        type="text"
                        name="company"
                        placeholder="Enter Company"
                        value={company}
                        onChange={(e) => { setCompany(e.target.value); setError(false); }}
                    />
                    {error && !company.trim() && <span className='invalid-input'>Enter a valid company</span>}

                    <br />
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </>
    )
}
