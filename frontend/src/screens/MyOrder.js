import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch('https://medicareserver-git-main-akashs-projects-c96b2f8a.vercel.app/api/myorderData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            const data = await response.json();
            console.log('Received data:', data, 'Type:', typeof data);

            if (data.orderData && Array.isArray(data.orderData.order_data)) {
                const flattenedData = data.orderData.order_data.flat();
                setOrderData(flattenedData);
            } else {
                console.error('Received data does not contain an array of orders:', data);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching order data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : orderData.length > 0 ? (
                        orderData.map((item, index) => (
                            <div key={index}>
                                {item.Order_date ? (
                                    <div className='m-auto mt-5'>
                                        {item.Order_date}
                                        <hr />
                                    </div>
                                ) : (
                                    <div className='col-12 col-md-6 col-lg-3' key={index}>
                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                            {/* Your image rendering logic */}
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                    <span className='m-1'>{item.qty}</span>
                                                    <span className='m-1'>{item.size}</span>
                                                    <span className='m-1'>{item.Order_date}</span>
                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                        ₹{item.price || 'N/A'}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
