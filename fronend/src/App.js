
import './App.css';


import {BrowserRouter , Routes ,Route} from "react-router-dom"
import Footer from './Components/Footer';
import Nav from "./Components/Nav";
import SignUp from './Components/SignUp'
import Login from './Components/login';
import AddProduct from './Components/AddProduct';
import PrivateComponent from './Components/PrivateComponent'
import ProductsList from './Components/ProductsList';

import UpdateProduct from './Components/UpdateProduct'
function App() {
  return (

    <div className="App">

      <BrowserRouter>
    <Nav/>
    <Routes>  

      <Route element={<PrivateComponent/>}>
      <Route path = "/" element = {<ProductsList/>} ></Route>
      <Route path = "/add-product" element = {<AddProduct/>} ></Route>
      <Route path = "/update/:id" element = {<UpdateProduct/>} ></Route>
      <Route path = "/logout" element = {<h1>Logout listinng component</h1>} ></Route>
      <Route path = "/profile" element = {<h1>Profile listinng component</h1>} ></Route>
      </Route>

      <Route path = "/SignUp" element = {<SignUp/>} ></Route>
      <Route path = "/login" element = {<Login/>} ></Route>
  
    </Routes>
    </BrowserRouter>
    <Footer/>
    </div>
 
  );
}

export default App;
