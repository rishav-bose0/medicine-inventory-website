import React, {useEffect, useState} from "react";
import {getMyOrders, updateStockStatus} from "../externalCalls/ApiAction";
import ParticularOrderDetailsModal from "./ParticularOrderDetailsModal";
import "../pages/OrderList.css";

const OrdersList = ({user}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [ordersList, setOrdersList] = useState([]);
    const [openViewOrderModal, setOpenViewOrderModal] = useState(false);
    const [orderIdToView, setOrderIdToView] = useState(null);

    const validOrderStatusOptions = ["NEW", "SEEN", "PROCESSING", "DONE"]

    const isAdmin = user.is_admin;

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


    function closeModal() {
        setOpenViewOrderModal(false);
    }

    useEffect(() => {
        setIsLoading(true);
        getMyOrders(user.id).then((res) => {
            setIsLoading(false);
            const allOrders = res.orders;
            console.log(allOrders.map((order_list_info, idx) => ({order_list_info, idx})));
            setOrdersList(allOrders.map((order_list_info, idx) => ({order_list_info, idx})));
        })
    }, []);

    return (
        <>
            <div className="table‐wrapper">
                <table>
                    <thead>
                    <tr>
                        {isAdmin &&
                            <th>Company Name</th>
                        }
                        {isAdmin &&
                            <th>Phone Number</th>
                        }
                        <th>Order Id</th>
                        <th>Date</th>
                        <th>Order Status</th>
                    </tr>
                    </thead>
                    <tbody>

                    {ordersList.map(item => (
                        <tr key={item.order_list_info.order_id} onClick={() => {
                            setOrderIdToView({
                                orderId: item.order_list_info.order_id,
                                orderDate: item.order_list_info.order_date
                            });
                            setOpenViewOrderModal(true);
                        }}
                        >
                            {isAdmin && <td>{item.order_list_info.user_name}</td>}
                            {isAdmin && <td>{item.order_list_info.phone_number}</td>}
                            <td>{item.order_list_info.order_id}</td>
                            <td>
                                {new Date(item.order_list_info.order_date * 1000)
                                    .toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: '2-digit'})}
                            </td>
                            {
                                !isAdmin &&
                                <td>{item.order_list_info.order_status}</td>
                            }
                            {
                                isAdmin &&
                                <td>

                                    <select
                                        value={item.order_list_info.order_status}
                                        onChange={e =>
                                            updateOrder(item.idx, item.order_list_info.order_id, e.target.value)
                                        }
                                        className="order-status-dropdown"
                                    >
                                        <option value="" disabled>
                                            Select status…
                                        </option>
                                        {validOrderStatusOptions.map(status => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            }
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


export default OrdersList;