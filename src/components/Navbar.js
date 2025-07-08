import React ,{useState}from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Badge from "react-bootstrap/Badge";
import Cart from '../screen/Cart';
import Modal from './Model';
import { useCart } from './ContextReducer';

export default function Navbar() {
   let data = useCart();

  const [cartView, setcartView] = useState(false)

  const navigate = useNavigate();
  const handleLogOut = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div class="container-fluid">
          <Link class="navbar-brand fs-1 fst-1" to="/">KidZoo</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto mb-2">
              <li class="nav-item">
                <Link class="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {
                (localStorage.getItem("authToken")) ?
                  <li class="nav-item">
                    <Link class="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
                  </li>
                  : ""

              }

            </ul>
            {
              (!localStorage.getItem("authToken")) ?

                <div className='d-flex'>
                  <Link class="btn bg-white text-secondary mx-1" to="/login">Login</Link>
                  <Link class="btn bg-white text-secondary mx-1" to="/createuser">SignUp</Link>
                </div>
                : <div>
                  <div class="btn bg-white text-secondary mx-1" onClick={()=>{setcartView(true)}} >
                    My Cart{"    "}
                    <Badge pill bg="danger"> {data.length} </Badge>
                  </div>
                  {cartView? <Modal onClose={()=>setcartView(false)}><Cart/></Modal> :null}
                  <div class="btn bg-danger text-white mx-1" onClick={handleLogOut}>
                    LogOut
                  </div>
                </div>

            }
          </div>
        </div>
      </nav>
    </div>
  )
}
