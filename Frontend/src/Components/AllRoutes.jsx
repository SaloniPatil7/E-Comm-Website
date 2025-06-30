import { Routes, Route } from 'react-router-dom';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import PrivateComponent from './PrivateComponent.jsx';
import AddProduct from './AddProduct.jsx';
import ListProducts from './ListProducts.jsx';
import UpdateProduct from './UpdateProduct.jsx';

export default function AllRoutes() {
    return (
        <>

            <Routes >

                <Route element={<PrivateComponent />}>
                    <Route path="/" element={<ListProducts />} />
                    <Route path="/add" element={<AddProduct />} />
                    <Route path="/update/:id" element={<UpdateProduct />} />
                    <Route path="/logout" element={<h1> logout</h1>} />
                </Route>

                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />

                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>

        </>
    )
}