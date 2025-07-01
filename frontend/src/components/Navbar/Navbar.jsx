import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({showLogin , setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const navigate = useNavigate();
    const location = useLocation();
    const { getTotalCartAmount, token, setToken, setCartItems } = useContext(StoreContext);

    const logout = async () => {
        localStorage.removeItem("token");
        setToken("");
        navigate('/')
       // window.location.reload();
    };


//  useEffect(()=>{
//        if(localStorage.getItem("token"))
//             setToken(localStorage.getItem("token"))
//     },[])



    return (
        <div className="navbar">
            <Link to="/"> <img src={assets.logo} alt="" className="logo" /> </Link>
            {location.pathname === "/" && (
            <ul className="navbar-menu">

                <Link to="/"  onClick={() => setMenu("home")}  className={menu === "home" ? "active" : ""}  > home</Link>
                <a  href="#explore-menu" onClick={() => setMenu("menu")}   className={menu === "menu" ? "active" : ""}   >
                    menu
                </a>
                <a
                    href="#footer"
                    onClick={() => setMenu("contact-us")}
                    className={menu === "contact-us" ? "active" : ""}
                >
                    contact us
                </a>
            </ul>)
            }
            <div className="navbar-right"> 
                <div className="navbar-search-icon">
                    <Link to="/cart">
                        <img src={assets.basket_icon} alt="" />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>sign up</button>
                ) : (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate("/myorders")}>
                             <Link to="/myorders">   <img src={assets.bag_icon} alt="" /> </Link>
                                Orders
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" />
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
