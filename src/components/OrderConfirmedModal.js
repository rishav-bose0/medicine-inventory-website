import orderSuccess from "../assets/test-order.png"
import React from "react";
const OrderConfirmedModal = () => {
    return (
        <div id="myModal" className="modal">
            <div className="modal-content-order-confirmed">
                <span className="close">&times;</span>
                <p>Your Order is confirmed</p>
                <p>Thank you for ordering with us.</p>
                <img src={orderSuccess}/>
            </div>
        </div>
    )
}

export default OrderConfirmedModal;