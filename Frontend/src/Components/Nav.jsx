
import './Nav.css'
import { Link, useNavigate } from 'react-router-dom'
export default function Nav() {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        console.log("logedOut");
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <>
            <div className='nav'>

                <img alt='LOGO' className='logo' src='./ProjectLogo.png' ></img>

                {

                    auth ?
                        <ul className='nav-ul'>
                            <li> <Link to="/"> Products</Link></li>
                            <li> <Link to="/add">Add Product</Link></li>
           

                            <li className="logout-item">
                                <Link onClick={logout} to="/signup">Log Out  ({JSON.parse(auth).name})</Link>
                            </li>
                        </ul> :
                        <ul className='nav-ul nav-right'>
                            <>
                                <li>  <Link to="/signup"> SignUp</Link></li>
                                <li> <Link to="/login">Login</Link></li>
                            </>


                        </ul>
                }

            </div>

        </>
    )
}