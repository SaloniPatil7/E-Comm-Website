import './App.css';
import Nav from './Components/Nav.jsx';
import Routes from './Components/AllRoutes.jsx';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Components/Footer.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Nav />
        <div className="content-wrap">
          <Routes />
        </div>
        <Footer />x
      </div>
    </BrowserRouter>
  );
}


export default App;


