import './Components.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-content'>

        {/* Left: Branding */}
        <div className='footer-section'>
          <h3>Product Manager</h3>
          <p>&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>

       

        {/* Right: Contact or Info */}
        <div className='footer-section'>
          <p>Email: support@productmanager.com</p>
        </div>

      </div>
    </footer>
  );
}
