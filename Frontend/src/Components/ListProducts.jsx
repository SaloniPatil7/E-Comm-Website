import { useEffect, useState } from "react";
import './Nav.css'
import { Link } from "react-router-dom";
export default function ListProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ListAllProducts();
    }, [])
    async function ListAllProducts() {
        let result = await fetch('http://localhost:3000/products', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`

            }
        });
        result = await result.json();
        setProducts(result);
    }
    async function deleteProduct(id) {
        console.log(id);
        let result = await fetch('http://localhost:3000/delete/' + id, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`

            }
        });
        result = await result.json();
        console.log(result);
        ListAllProducts();
    }

    async function handleSearch(e) {
        console.log(e.target.value);
        let key = e.target.value;
        if (key) {
            let result = await fetch('http://localhost:3000/search/' + key, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`

                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            ListAllProducts();
        }

    }

    return (
        <>
            <div className='ListProducts'>

                <h1>Products List </h1>
                <input type="text" placeholder="search Products" className="searchBox" onChange={handleSearch}></input>
                <ul>
                    <li>  Sr.No </li>
                    <li>   Name </li>
                    <li>  Price </li>
                    <li>  Category </li>
                    <li>  Company </li>
                    <li>  Action  </li>
                </ul>
                {
                    products.length > 0 ? products.map((item, index) => (
                        <ul key={item._id || index}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li >
                                <button onClick={() => { deleteProduct(item._id) }}>Delete</button>
                                <Link to={"/update/" + item._id}>update</Link>
                            </li>
                        </ul>
                    )) : <h1>No Results Found</h1>

                }


            </div>

        </>
    )
}