import { useEffect, useState } from "react";
import './Components.css';
import { Link } from "react-router-dom";

export default function ListProducts() {
    const [products, setProducts] = useState([]);
    const [searchKey, setSearchKey] = useState('');


    useEffect(() => {
        listAllProducts();
    }, []);


    async function listAllProducts() {
        try {
            const response = await fetch('https://e-comm-website-backend.onrender.com/products', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error("Error fetching products:", response.status);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    }


    async function deleteProduct(id) {
        try {
            const response = await fetch('https://e-comm-website-backend.onrender.com/delete/' + id, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {

                setProducts(prev => prev.filter(product => product._id !== id));
            } else {
                console.error("Delete failed:", response.status);
            }
        } catch (err) {
            console.error("Error during delete:", err);
        }
    }


    async function handleSearch(e) {
        const key = e.target.value;
        setSearchKey(key);

        if (key.trim()) {
            try {
                const response = await fetch('https://e-comm-website-backend.onrender.com/search/' + key, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const result = await response.json();
                setProducts(result || []);
            } catch (err) {
                console.error("Search failed:", err);
            }
        } else {
            listAllProducts(); 
        }
    }

    return (
        <div className='ListProducts'>
            <h1>Products List</h1>


            <input
                type="text"
                placeholder="Search Products"
                className="searchBox"
                value={searchKey}
                onChange={handleSearch}
            />

            <ul>
                <li>Sr.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Action</li>
            </ul>

            {products.length > 0 ? (
                products.map((item, index) => (
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                ))
            ) : (
                <h2>No Results Found</h2>
            )}
        </div>
    );
}
