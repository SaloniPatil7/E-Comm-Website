import './Components.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/signup');
    };

    return (
        <div className='nav'>
            <img alt='LOGO' className='logo' src='./ProjectLogo.png' />

            {auth ? (
                <ul className='nav-ul'>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Product</Link></li>


                    <li className="logout-item">
                        <button onClick={handleLogout} className="logout-button">
                            Log Out ({JSON.parse(auth).name})
                        </button>
                    </li>
                </ul>
            ) : (
                <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            )}
        </div>
    );
}
