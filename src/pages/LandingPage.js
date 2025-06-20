import navlogo from '../assets/navlogo.svg';
import './LandingPage.css';
import medicineImg from "../assets/medicine.png"
import CompanyPicker from "../components/CompanyPicker";
import {useState} from "react";
import {login as loginApiCall} from "../externalCalls/ApiAction";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./context/AuthContext";

const LandingPage = () => {

    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const {login} = useAuth();

    const loginAction = () => {
        loginApiCall(companyName, phoneNumber).then((res) => {
            console.log(res);

            res['companyName'] = companyName
            res['isAdmin'] = false

            login(res);
            navigate("/home");

        })
    }

    return (
        <div className="App">
            <div className="navbar">
                <div className="main-nav-image">
                    <img src={navlogo} alt="navbar-logo"/>
                    <span>Rishov Medical</span>
                </div>
                <div className="navbar-links">
                    <a href="#">Home</a>
                    <div onClick={()=>navigate("/adminLogin")}>Admin</div>
                    {/*<a href="/adminLogin">Admin</a>*/}
                    {/*<Link to="/AdminHomePage">Home</Link>*/}
                    {/*<a href="#">Contact Us</a>*/}
                </div>
            </div>

            <div className="body-container">
                <div className="body-container-hero-details">
                    <div className="mobile-adjust-view">
                        <p className="primary-header">Medicine Store</p>
                        <p className="secondary-header">Your Trusted Pharmacy Store</p>
                        <p className="detail">For Stocklist, Wholesalers, Retailers. <br/>Login with your Company Name and Phone Number. <br/>Check out my stocks. Stocks can be ordered online.</p>
                    </div>
                    <div className="medicine-img-container">
                        <img src={medicineImg} alt="medicine-kit-image"/>
                    </div>
                </div>
                <div className="login-form">
                    <span className="form-header">LOGIN</span>
                    <div className="form-details">
                        {/*<div className="input-fields">*/}
                        {/*    <input type="name" placeholder="Company Name"/>*/}
                        {/*</div>*/}
                        <CompanyPicker
                            value={companyName}
                            onChange={setCompanyName}
                        />
                        <div className="home-input-fields">
                            <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                   placeholder="Phone Number"/>
                        </div>
                    </div>
                    <button className="submit-btn" onClick={loginAction}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
