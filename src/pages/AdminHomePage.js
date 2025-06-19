import React, {useEffect, useState} from "react";
import FileUploader from "../components/FileUploader";
import OrdersList from "../components/OrdersList";
import {getStockList} from "../externalCalls/ApiAction";
import {useAuth} from "./context/AuthContext";

const tabs = [
    {key: 'update', label: 'Update StockList'},
    {key: 'orders', label: 'Received Orders'},
    {key: 'viewStocks', label: 'View StockList'},
];

const AdminHomePage = () => {
    const { user } = useAuth()

    const [selectedTab, setSelectedTab] = useState('orders');

    const [mobileOpen, setMobileOpen] = useState(false)


    return (
        <div className="container">

            {/* mobile header */}
            <header className="mobile-header">
                <button
                    className="hamburger"
                    onClick={() => setMobileOpen(open => !open)}
                >
                    ☰
                </button>
                <h2 className="company-name">Rishov Medical</h2>
            </header>

            {/* backdrop: only when menu is open */}
            {mobileOpen && (
                <div
                    className="backdrop"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
                <h2 className={`company-name ${mobileOpen ? 'hide' : ''}`}>Rishov Medical</h2>
                <ul>
                    {tabs.map(tab => (
                        <li
                            key={tab.key}
                            className={selectedTab === tab.key ? 'activeTab' : ''}
                            onClick={() => {
                                setSelectedTab(tab.key)
                                setMobileOpen(false) // auto-close on mobile
                            }}
                        >
                            {tab.label}
                        </li>
                    ))}
                </ul>
            </aside>

            <main>
                {selectedTab === 'update' && <FileUploader adminId={user.id}/>}
                {selectedTab === 'orders' && <OrdersList user={user}/>}
                {selectedTab === 'viewStocks' && <ViewStockList/>}
            </main>
        </div>
    );
}

function ViewStockList() {
    const [stockList, setStockList] = useState([]);
    const [search, setSearch] = useState('');


    // Fetch once on mount
    useEffect(() => {
        // setStockList(stocks);

        getStockList().then((res) => {
                const allStockList = res["stock_list"];
                setStockList(allStockList.map((name, idx) => ({ name, idx })));
            }
        );

        // fetch('http://abc.com/getMedicines')
        //     .then(res => res.json())
        //     .then(data => {
        //         setStockList(data.stock_list || []);
        //     })
        //     .catch(console.error);
    }, []);

    const filtered = stockList.filter(item =>
        item.name.stock.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <>
            <div className="medicine-list-container">
                <h2 style={{textAlign:'center'}}>Your Current Stocks</h2>
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
                        </tr>
                        </thead>
                        <tbody>
                        {filtered.map(item => (
                            <tr key={item.name.stock_id}>
                                <td>{item.name.stock}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
}

export default AdminHomePage;