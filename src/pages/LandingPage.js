import navlogo from '../assets/navlogo.svg';
import './LandingPage.css';
import medicineImg from "../assets/medicine.png"
import CompanyPicker from "../components/CompanyPicker";
import {useState} from "react";
import {login} from "../externalCalls/ApiAction";
import {useNavigate} from "react-router-dom";

const LandingPage = () => {

    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const loginAction = () => {
        login(companyName, phoneNumber).then((res) => {
            console.log(res);
            if (res.is_admin) {
                navigate("/admin", {
                    state: {
                        loginDetails: {
                            companyName: companyName,
                            userId: res.id
                        }
                    }
                });
            } else {
                navigate("/home", {
                    state: {
                        loginDetails: {
                            companyName: companyName,
                            userId: res.id
                        }
                    }
                });
            }
        })
    }

    return (
        <div className="App">
            <div className="navbar">
                <div className="main-nav-image">
                    <img src={navlogo}/>
                    <span>Rishov Medical</span>
                </div>
                <div className="navbar-links">
                    <a href="#">Home</a>
                    {/*<Link to="/AdminHomePage">Home</Link>*/}
                    {/*<a href="#">Contact Us</a>*/}
                </div>
            </div>

            <div className="body-container">
                <div className="body-container-hero-details">
                    <div className="mobile-adjust-view">
                        <p className="primary-header">Medicine Store</p>
                        <p className="secondary-header">Your Trusted Pharmacy Store</p>
                        <p className="detail">Libero diam auctor tristique hendrerit in eu vel id. Nec leo amet suscipit
                            nulla. Nullam vitae sit tempus diam.</p>
                    </div>
                    <div className="medicine-img-container">
                        <img src={medicineImg}/>
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
                            <input type="number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder="Phone Number"/>
                        </div>
                    </div>
                    <button className="submit-btn" onClick={loginAction}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
