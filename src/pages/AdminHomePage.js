import React, {useEffect, useState} from "react";
import FileUploader from "../components/FileUploader";
import OrdersList from "../components/OrdersList";
import {useLocation} from "react-router-dom";
import {getStockList} from "../externalCalls/ApiAction";

const tabs = [
    {key: 'update', label: 'Update StockList'},
    {key: 'orders', label: 'Received Orders'},
    {key: 'viewStocks', label: 'View StockList'},
];

const stocks = [
    "TRESIBA 3 ML FLEX TO",
    "BETONIN AST PLUS(L) ",
    "BETONIN PLUS SYP ",
    "CLARIBID 250 mg  ",
    "CREMAFFIN + SYP  ",
    "CYTOGARD OD",
    "DUPHASTON  ",
    "ENSURE DIABETES 1 KG",
    "FACECLIN -AT  ",
    "FLAGYL 400 mg ",
    "GTN SORBITRATE CR2.6",
    "HEPTRAL 400 MG",
    "I-TYZA-200 MG CAP",
    "IVABID-5 MG TAB  ",
    "IVABID-5MG TAB",
    "kenacort 0.1% oint  ",
    "LEVESAM 500MG TAB",
    "MONTI-FX",
    "NEW FOLLIHAIR TAB",
    "NICODUCE OD 10",
    "NICODUCE-10 TAB  ",
    "NICODUCE-5 TAB",
    "NOVOMIX 30 FLEXPEN  ",
    "PANKREOFLAT Tab  ",
    "REJOINT CAP",
    "RYZODEG PENFILL  ",
    "SECNIL FORTE  ",
    "SELSUN SHAMPOO.  ",
    "SORBITRATE 5 mg  ",
    "STEMETIL MD",
    "THYRONORM 12.5 TAB  ",
    "THYRONORM 50 MG  ",
    "THYRONORM 75MG TAB  ",
    "TIXYLIX SYR",
    "TYZA CREAM 30.GM ",
    "TYZA CREEM ",
    "TYZA M CREAM  ",
    "TYZA TAB",
    "UDILIV 300mg  ",
    "XEVOR 5 MG ",
    "DISPERZYME TAB",
    "NEERI SYRUP",
    "NEERI TAB  ",
    "APDROP KT 5ML ",
    "APDROPS DM E/D",
    "APDROPS E/D",
    "APDROPS LP EYE DROPS",
    "AQUALUBE  LIQUIEL",
    "ATORFIT CV-10 MG ",
    "ATORFIT CV-20MG  "
]

const AdminHomePage = () => {

    const location = useLocation();
    const { loginDetails } = location.state || {};

    const [selectedTab, setSelectedTab] = useState('orders');

    return (
        // #f0f5ff
        <div className="container">
            <aside className="sidebar">
                <h2 className="company-name" >Rishov Medical</h2>
                <ul>
                    {tabs.map(tab => (
                        <li
                            key={tab.key}
                            className={selectedTab === tab.key ? "activeTab" : ""}
                            onClick={() => setSelectedTab(tab.key)}
                        >
                            {tab.label}
                        </li>
                    ))}
                </ul>
            </aside>

            <main>
                {selectedTab === 'update' && <FileUploader adminId={loginDetails.userId}/>}
                {selectedTab === 'orders' && <OrdersList/>}
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