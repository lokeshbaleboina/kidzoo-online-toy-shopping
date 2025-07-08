
import './App.css';
import Home from './screen/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screen/Login';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Signup from './screen/Signup.js';
import { Cartprovider } from './components/ContextReducer.js';
import Myorders from './screen/Myorders.js';


function App() {
  return (
    <Cartprovider>
      <Router>
        <div>
          <Routes>
            <Route excat path="/" element={<Home></Home>}></Route>
            <Route exact path="/login" element={<Login></Login>}></Route>
            <Route exact path="/createuser" element={<Signup></Signup>}></Route>
            <Route exact path='/myorder' element={<Myorders></Myorders>}></Route>
          </Routes>

        </div>
      </Router>
    </Cartprovider>


  );
}

export default App;
