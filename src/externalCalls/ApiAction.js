import {use} from "react";

// const baseUrl = "http://127.0.0.1:5005";
const baseUrl = "https://api.rishovmedical.co.in";


export async function addOrder(user_id, orders) {
    const data = {
        user_id: user_id,
        orders: orders,
    }

    const response = await fetch(baseUrl + "/add_orders", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        return null
    }

    if (response.status !== 200) {
        return null
    }

    return response.json();
}

export async function getMyOrders(userId) {
    let url = `${baseUrl}/fetch_orders_list` + (userId !== undefined ? `?user_id=${userId}` : '');
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
    });

    if (!response.ok) {
        return null
    }

    if (response.status !== 200) {
        return null
    }

    // console.log(response.data.orders)
    return response.json();
}

export async function getParticularOrderDetails(order_id) {
    let url = `${baseUrl}/fetch_orders_details?order_id=${order_id}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
    });

    if (!response.ok) {
        return null
    }

    if (response.status !== 200) {
        return null
    }

    // console.log(response.order_details)
    return response.json();
}

// fetch('http://127.0.0.1:5005/get_all_stocks')
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         setStockList(data.stock_list || []);
//     })
//     .catch(console.error);


export async function getStockList() {

    console.log("Calling API");
    let url = `${baseUrl}/get_all_stocks`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
    });

    if (!response.ok) {
        return null
    }

    if (response.status !== 200) {
        return null
    }

    let res_json = response.json();
    console.log(res_json);
    return res_json;
}

// 'company_name': companyName,
//             'phone_number': phoneNumber

export async function login(companyName, phoneNumber){
    const data = {
        company_name: companyName,
        phone_number: phoneNumber,
    }

    const response = await fetch(baseUrl + "/create_user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        return null
    }

    if (response.status !== 200) {
        return null
    }

    return response.json();
}

export async function updateStockDetail(file, userId){

    const { uri, name, mimeType } = file;
    const formData = new FormData();

    formData.append('file', {
        uri,
        name,
        type: mimeType || 'application/octet-stream',
    });
    formData.append('adminId', userId);

    const response = await fetch(baseUrl + "/update_stock_details", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        body: formData,
    });

    if (!response.ok) {
        return null
    }

    if (response.status !== 200) {
        return null
    }

    return response.json();
}