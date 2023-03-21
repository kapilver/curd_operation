import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";



const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {

        console.log("clik logout function");

        localStorage.clear();
        navigate('/signup');
    }

    return (
        <div>

<img  src="https://www.fealtytechnologies.com/assets/images/fealty%20(1).png" className='logo' alt="logo" />

            { auth ? <ul className='Nav-ul'>
                <li><Link to="/">Porducts</Link></li>
                <li><Link to="/add-product"> Add Porducts</Link></li>
                <li><Link to="/update">Update Porducts</Link></li>
                <li><Link onClick={logout} to="/signup"> Logout ({JSON.parse(auth).name})</Link> </li>



            </ul> :

                <ul className='Nav-ul Nav-right'>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">login</Link></li>

                </ul>
            }
        </div>
    )
}


export default Nav;