import { use, useState } from "react";
import './Nav.css';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function UpdateProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();



    useEffect(() => {
        console.log(params);
        getProductDetail();
    }, [])

    async function getProductDetail() {
        let result = await fetch('http://localhost:3000/product/' + params.id, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`

            }
        });
        result = await result.json();
        console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }


    async function UpdateProduct(e) {
        e.preventDefault();
        console.log(name);
        let result = await fetch('http://localhost:3000/product/' + params.id, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`


            },
        })

        result = result.json();
        console.log(result);
        navigate('/');
        alert('Product updated')
    }

    return (
        <>
            <div className='AddProduct'>

                <h1>Update Products</h1>

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

                    />
                    {error && !category && < span className='invalid-input'> Enter  Valid Category </span >}

                    <input
                        type="string"
                        name="company"
                        placeholder="Enter Company"
                        value={company}
                        onChange={(e) => { setCompany(e.target.value) }}

                    />

                    <br></br>
                    <button onClick={UpdateProduct} type="submit">Update Product</button>
                </form >

            </div >

        </>
    )
}