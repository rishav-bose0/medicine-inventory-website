import React, {useEffect, useState} from "react";
import {getMyOrders} from "../externalCalls/ApiAction";
import ParticularOrderDetailsModal from "./ParticularOrderDetailsModal";

const OrdersList = ({userId}) =>{

    const [isLoading, setIsLoading] = useState(false);
    const [ordersList, setOrdersList] = useState([]);
    const [openViewOrderModal, setOpenViewOrderModal] = useState(false);
    const [orderIdToView, setOrderIdToView] = useState(null);

    const isAdmin = userId === undefined;

    function closeModal(){
        setOpenViewOrderModal(false);
    }

    useEffect(() => {
        setIsLoading(true);
        getMyOrders(userId).then((res) => {
            setIsLoading(false);
            const allOrders = res.orders;
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
                        {/*<th>Number of Strips</th>*/}
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
                        }}>
                            {isAdmin && <td>{item.order_list_info.user_name}</td>}
                            {isAdmin && <td>{item.order_list_info.phone_number}</td>}
                            <td>{item.order_list_info.order_id}</td>
                            <td>
                                {new Date(item.order_list_info.order_date * 1000)
                                    .toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: '2-digit'})}
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



export default OrdersList;