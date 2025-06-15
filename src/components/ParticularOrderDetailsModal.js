import React, {useEffect, useState} from "react";
import {getParticularOrderDetails} from "../externalCalls/ApiAction";
import "./ParticularOrderDetailsModal.css";
const ParticularOrderDetailsModal = ({orderDetails, onCloseModal}) => {

    const [orderedStockList, setOrderedStockList] = useState([]);

    useEffect(() => {
        getParticularOrderDetails(orderDetails.orderId).then((response) =>{
            console.log(response);
            const allOrders = response.order_details;
            console.log(allOrders.map((order_details, idx) => ({order_details, idx})));
            setOrderedStockList(allOrders.map((order_details, idx) => ({order_details, idx})));
            // setOrderedStockList(response);
        })
    }, []);

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={onCloseModal}>&times;</span>
                <h2 style={{textAlign: 'center'}}>Order on {new Date(orderDetails.orderDate * 1000)
                    .toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: '2-digit'})}
                </h2>

                {Object.keys(orderedStockList).length !== 0 &&
                    <>
                        <table>
                            <thead>
                            <tr>
                                <th>Medicine Name</th>
                                <th>Number of Box</th>
                                <th>Number of Strips</th>
                                <th>Stock Availability</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orderedStockList.map(item => (
                                <tr className={item.order_details.stock_availability === false? 'unavailable': ''} key={item.order_details.stock}>
                                    <td>{item.order_details.stock}</td>
                                    <td>
                                        <div className="input-fields">
                                            <span>{item.order_details.box}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-fields">
                                            <span>{item.order_details.strip}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {/*<div className="input-fields">*/}
                                            <span>{item.order_details.stock_availability === true? 'AVAILABLE': 'OUT OF STOCK'}</span>
                                        {/*</div>*/}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                }

            </div>
        </div>
    )
}

export default ParticularOrderDetailsModal;