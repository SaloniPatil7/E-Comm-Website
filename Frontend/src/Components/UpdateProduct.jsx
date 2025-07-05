import { useState, useEffect } from "react";
import './Components.css';
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        company: ''
    });
    const [error, setError] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = async () => {
        try {
            const res = await fetch(`https://e-comm-website-1-pjbl.onrender.com/product/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            setProduct({
                name: data.name || '',
                price: data.price || '',
                category: data.category || '',
                company: data.company || ''
            });
        } catch (err) {
            console.error("Failed to fetch product:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
        setError(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const { name, price, category, company } = product;
        if (!name || !price || !category || !company) {
            setError(true);
            return;
        }

        try {
            const res = await fetch(`https://e-comm-website-backend.onrender.com/product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(product)
            });

            if (res.ok) {
                alert("Product updated successfully.");
                navigate('/');
            } else {
                const errText = await res.text();
                alert("Update failed: " + errText);
            }
        } catch (err) {
            console.error("Update error:", err);
            alert("Something went wrong.");
        }
    };

    return (
        <div className='AddProduct'>
            <h1>Update Product</h1>
            <form className="AddProductForm" onSubmit={handleUpdate}>
                {['name', 'price', 'category', 'company'].map(field => (
                    <div key={field}>
                        <input
                            type="text"
                            name={field}
                            placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                            value={product[field]}
                            onChange={handleChange}
                        />
                        {error && !product[field] && (
                            <span className='invalid-input'>Enter valid {field}</span>
                        )}
                    </div>
                ))}
                <br />
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
}
