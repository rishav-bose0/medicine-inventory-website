import React, {useState, useEffect} from 'react';
import "./NonAdminHomePage.css"
import PlaceOrderModal from "../components/PlaceOrderModal";
import comingSoon from "../assets/26691.png";
import {getStockList} from "../externalCalls/ApiAction";
import {useNavigate} from "react-router-dom";
import OrdersList from "../components/OrdersList";
import {useAuth} from "./context/AuthContext";

const tabs = [
    {key: 'order', label: 'Order Medicines'},
    {key: 'orders', label: 'My Past Orders'},
    {key: 'cart', label: 'My Cart'},
    {key: 'logout', label: 'Log Out'},

];

const NonAdminHomePage = () => {
    const [selectedTab, setSelectedTab] = useState('order');

    const [mobileOpen, setMobileOpen] = useState(false)

    const { user } = useAuth()

    const navigate = useNavigate();

    const { logout } = useAuth();


    const handleLogoutClick = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        // #f0f5ff
        <div className="container">

            {/* mobile header */}
            <header className="mobile-header">
                <button
                    className="hamburger"
                    onClick={() => setMobileOpen(open => !open)}
                >
                    ☰
                </button>
                <h2 className="company-name">{user.companyName}</h2>
            </header>

            {/* backdrop: only when menu is open */}
            {mobileOpen && (
                <div
                    className="backdrop"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
                <h2 className={`company-name ${mobileOpen ? 'hide' : ''}`}>{user.companyName}</h2>
                <ul>
                    {tabs.map(tab => (
                        <li
                            key={tab.key}
                            className={selectedTab === tab.key ? 'activeTab' : ''}
                            onClick={() => {
                                setSelectedTab(tab.key)
                                if (tab.key === 'logout') {
                                    handleLogoutClick();
                                }
                                setMobileOpen(false) // auto-close on mobile
                            }}
                        >
                            {tab.label}
                        </li>
                    ))}
                </ul>
            </aside>

            <main>
                {selectedTab === 'order' && <OrderMedicines companyDetails={user}/>}
                {selectedTab === 'orders' && <OrdersList user={user}/>}
                {selectedTab === 'cart' && <MyCart/>}
                {selectedTab === 'logout'}
            </main>
        </div>
    );
}

function OrderMedicines({companyDetails}) {
    const [stockList, setStockList] = useState([]);
    const [search, setSearch] = useState('');
    const [quantities, setQuantities] = useState({});

    const [openOrderModal, setOpenOrderModal] = useState(false);

    // Fetch once on mounts
    useEffect(() => {
        getStockList().then((res) => {
            const allStockList = res["stock_list"];
            setStockList(allStockList.map((name, idx) => ({ name, idx })));
            }
        );
    }, []);

    const filtered = stockList.filter(item =>
        item.name.stock.toLowerCase().includes(search.toLowerCase())
    )

    function togglePlaceOrderModal() {
        setOpenOrderModal(!openOrderModal);
    }

    function handleOrderCompletion(){
        setQuantities({});
        setOpenOrderModal(!openOrderModal);
    }

    const handleQtyChange = (stockId, name, field, value) => {
        setQuantities(prev => {
            // 1. Clone the existing fields for this name (or start fresh)
            const current = {...(prev[name] || {})};

            // 2. Add or remove the specific field
            if (value === "") {
                delete current[field];
            } else {
                current[field] = value;
            }

            // 3. Build the next state object
            const next = {...prev};

            // 4. If after deletion there's nothing left, remove the whole name
            if(Object.keys(current).includes("box") || Object.keys(current).includes("strip")){
                next[name] = current;
                next[name]["internal_idx"]= stockId;
            } else {
                delete next[name];
            }

            return next;
        });
    };

    return (
        <>
            <div className="medicine-list-container">
                <h2 style={{textAlign:'center'}}>Stock List Of <span>Rishov Medical</span></h2>
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search medicines…"
                        value={search}
                        className="search"
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="table‐wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Medicine Name</th>
                            <th>Number of Box</th>
                            <th>Number of Strips</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filtered.map(item => (
                            <tr key={item.name.stock_id}>
                                <td>{item.name.stock}</td>
                                <td>
                                    <div className="input-fields">
                                        <input
                                            type="number"
                                            min="0"
                                            value={quantities[item.name.stock]?.box || ''}
                                            onChange={e =>
                                                handleQtyChange(item.name.stock_id, item.name.stock, 'box', e.target.value)
                                            }
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="input-fields">
                                        <input
                                            type="number"
                                            min="0"
                                            value={quantities[item.name.stock]?.strip || ''}
                                            onChange={e =>
                                                handleQtyChange(item.name.stock_id, item.name.stock, 'strip', e.target.value)
                                            }
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {
                    Object.keys(quantities).length !== 0 &&
                    <div className="place-order-btn" onClick={togglePlaceOrderModal}>
                        <span>Place Order</span>
                    </div>
                }
            </div>
            {
                openOrderModal &&
                <PlaceOrderModal companyDetails={companyDetails} selectedStocks={quantities} onCloseModal={togglePlaceOrderModal}
                                 onQuantityChange={handleQtyChange} onOrderComplete={handleOrderCompletion}/>
            }
        </>

    );
}

function MyCart(){
    return (
        <div className="cart-container">
            <img src={comingSoon} alt="Coming soon"/>
        </div>
    )
}

export default NonAdminHomePage;