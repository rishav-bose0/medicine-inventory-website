import navlogo from '../assets/navlogo.svg';
import './LandingPage.css';
import medicineImg from "../assets/medicine.png"
import CompanyPicker from "../components/CompanyPicker";
import {useState} from "react";
import {adminLoginApiCall, login as loginApiCall} from "../externalCalls/ApiAction";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./context/AuthContext";

const AdminLandingPage = () => {

    const [adminId, setAdminId] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { login } = useAuth();

    const loginAction = () => {
        adminLoginApiCall(adminId, adminPassword).then((res) => {
            console.log(res);

            if(res.error){
                setError(res.error);
                return;
            }

            res['companyName'] = 'Rishov Medical';

            login(res);

            if (res.is_admin) {
                navigate("/admin");
            } else {
                setError('Not an Admin credential.')
            }
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
                    <a href="/">Home</a>
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
                        <img src={medicineImg} alt="medicine-kit-image"/>
                    </div>
                </div>
                <div className="login-form">
                    <span className="form-header"><span style={{color: '#D64779'}}>ADMIN</span> LOGIN</span>
                    <div className="form-details">
                        <div className="home-input-fields">
                            <input type="text" value={adminId} onChange={(e)=>setAdminId(e.target.value)} placeholder="Admin ID"/>
                        </div>

                        <div className="home-input-fields">
                            <input type="password" value={adminPassword} onChange={(e)=>setAdminPassword(e.target.value)} placeholder="Password"/>
                        </div>
                    </div>
                    {error && <span style={{color: 'red', fontWeight:800}}>{error}</span>}
                    <button className="submit-btn" onClick={loginAction}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default AdminLandingPage;
