import "./AdminOrderListPage.css";
import React, {useEffect, useState} from "react";
import {getMyOrders, updateStockStatus} from "../externalCalls/ApiAction";
import ParticularOrderDetailsModal from "../components/ParticularOrderDetailsModal";

const AdminOrderListPage = ({user}) => {

    const [ordersList, setOrdersList] = useState([]);
    const [openViewOrderModal, setOpenViewOrderModal] = useState(false);
    const [orderIdToView, setOrderIdToView] = useState(null);

    const validOrderStatusOptions = ["NEW", "SEEN", "PROCESSING", "DONE"]

    const [activeTab, setActiveTab] = useState('New');   // 'New' or 'Done'

    // derive two sub-lists
    const newOrders = ordersList.filter(item => item.order_list_info.order_status !== 'DONE');
    const doneOrders = ordersList.filter(item => item.order_list_info.order_status === 'DONE');

    // pick which one to render
    const displayed = activeTab === 'New' ? newOrders : doneOrders;

    useEffect(() => {
        // setIsLoading(true);
        getMyOrders('QTBSCcs7md0GUx').then((res) => {
            // setIsLoading(false);
            const allOrders = res.orders;
            console.log(allOrders.map((order_list_info, idx) => ({order_list_info, idx})));
            setOrdersList(allOrders.map((order_list_info, idx) => ({order_list_info, idx})));
        })
    }, []);

    function updateOrder(index, orderId, orderStatus) {

        setOrdersList(prev =>
            prev.map(item =>
                item.idx === index
                    ? {
                        ...item,
                        order_list_info: {
                            ...item.order_list_info,
                            order_status: orderStatus
                        }
                    }
                    : item
            )
        );
        updateStockStatus(orderId, orderStatus);
    }


    function openCity(cityName) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(cityName).style.display = "block";
        // evt.currentTarget.className += " active";
    }

    function closeModal() {
        setOpenViewOrderModal(false);
    }

    return (
        <>
            <div className="tab">
                <button
                    className={`tablinks ${activeTab === 'New' ? 'active' : ''}`}
                    onClick={() => setActiveTab('New')}
                >
                    New
                </button>
                <button
                    className={`tablinks ${activeTab === 'Done' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Done')}
                >
                    Done
                </button>
            </div>

            <div className="table‐wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Phone Number</th>
                        <th>Order Id</th>
                        <th>Date</th>
                        <th>Order Status</th>
                    </tr>
                    </thead>
                    <tbody>

                    {/*{ordersList.map(item => (*/}
                    {/*    <tr key={item.order_list_info.order_id} onClick={() => {*/}
                    {/*        setOrderIdToView({*/}
                    {/*            orderId: item.order_list_info.order_id,*/}
                    {/*            orderDate: item.order_list_info.order_date*/}
                    {/*        });*/}
                    {/*        setOpenViewOrderModal(true);*/}
                    {/*    }}*/}
                    {/*    >*/}
                    {/*        <td>{item.order_list_info.user_name}</td>*/}
                    {/*        <td>{item.order_list_info.phone_number}</td>*/}
                    {/*        <td>{item.order_list_info.order_id}</td>*/}
                    {/*        <td>*/}
                    {/*            {new Date(item.order_list_info.order_date * 1000)*/}
                    {/*                .toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: '2-digit'})}*/}
                    {/*        </td>*/}

                    {/*        <td>*/}

                    {/*            <select*/}
                    {/*                onClick={e => e.stopPropagation()}*/}
                    {/*                value={item.order_list_info.order_status}*/}
                    {/*                onChange={e =>*/}
                    {/*                    updateOrder(item.idx, item.order_list_info.order_id, e.target.value)*/}
                    {/*                }*/}
                    {/*                className="order-status-dropdown"*/}
                    {/*            >*/}
                    {/*                <option value="" disabled>*/}
                    {/*                    Select status…*/}
                    {/*                </option>*/}
                    {/*                {validOrderStatusOptions.map(status => (*/}
                    {/*                    <option key={status} value={status}>*/}
                    {/*                        {status}*/}
                    {/*                    </option>*/}
                    {/*                ))}*/}
                    {/*            </select>*/}
                    {/*        </td>*/}

                    {/*    </tr>*/}
                    {/*))}*/}
                    {displayed.map(item => (
                        <tr
                            key={item.order_list_info.order_id}
                            onClick={() => {
                                setOrderIdToView({
                                    orderId: item.order_list_info.order_id,
                                    orderDate: item.order_list_info.order_date
                                });
                                setOpenViewOrderModal(true);
                            }}
                        >
                            <td>{item.order_list_info.user_name}</td>
                            <td>{item.order_list_info.phone_number}</td>
                            <td>{item.order_list_info.order_id}</td>
                            <td>
                                {new Date(item.order_list_info.order_date * 1000)
                                    .toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: '2-digit'})}
                            </td>
                            <td>
                                <select className="dropdown-select"
                                    onClick={e => e.stopPropagation()}
                                    value={item.order_list_info.order_status}
                                    onChange={e => updateOrder(item.idx, item.order_list_info.order_id, e.target.value)}
                                >
                                    {validOrderStatusOptions.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {openViewOrderModal &&
                <ParticularOrderDetailsModal orderDetails={orderIdToView} onCloseModal={closeModal}/>
            }


        </>
    )
}

export default AdminOrderListPage;