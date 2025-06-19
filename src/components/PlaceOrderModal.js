import "./PlaceOrderModal.css"
import React, {useEffect, useState} from "react";
import orderSuccess from "../assets/test-order.png";
import {addOrder} from "../externalCalls/ApiAction";

const PlaceOrderModal = ({companyDetails, selectedStocks, onCloseModal, onQuantityChange, onOrderComplete}) => {
    // useEffect(()=>{
    //     filtered = selectedStocks.filter(name =>
    //         name.toLowerCase()
    //     );
    //     }, [selectedStocks])
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    console.log(selectedStocks);

    function confirmOrder() {
        addOrder(companyDetails.userId, Object.values(selectedStocks));
        setOrderConfirmed(true);
    }

    return (
        <>
            <div id="myModal" className="modal">
                <div className={orderConfirmed ? "modal-content w-lg-50" : "modal-content"}>
                    <span className="close" onClick={onCloseModal}>&times;</span>

                    {!orderConfirmed &&
                        <>
                            <h2 style={{textAlign: 'center'}}>Your Order</h2>
                            <table className="table-view">
                                <thead>
                                <tr>
                                    <th>Medicine Name</th>
                                    <th>Number of Box</th>
                                    <th>Number of Strips</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.entries(selectedStocks).map(([key, value]) => (
                                    <tr key={key}>
                                        <td>{key}</td>
                                        <td>
                                            <div className="input-fields">
                                                {/*<span>{value["boxes"]}</span>*/}
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={value["box"] ? value["box"] : ''}
                                                    onChange={e =>
                                                        onQuantityChange(value["internal_idx"], key, 'box', e.target.value)
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="input-fields">
                                                {/*<span>{value["strips"]===undefined?0:value["strips"]}</span>*/}
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={value["strip"] ? value["strip"] : ''}
                                                    onChange={e =>
                                                        onQuantityChange(value["internal_idx"], key, 'strip', e.target.value)
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="place-order-modal-btn">
                                <button onClick={confirmOrder}>Place Order</button>
                            </div>
                        </>
                    }

                    {orderConfirmed &&
                        <div className="order-confirmed-container">
                            <p className="order-confirmed-primary-text">Your Order is confirmed</p>
                            <p className="order-confirmed-secondary-text">Thank you for ordering with us.</p>
                            <img src={orderSuccess}/>

                            <div className="place-order-modal-btn">
                                <button onClick={onOrderComplete}>Done</button>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default PlaceOrderModal;