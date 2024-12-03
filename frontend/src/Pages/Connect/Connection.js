import React, { useEffect, useState } from 'react'
import './Connection.css'
import API from '../../Services/API'
import { RxCross2 } from "react-icons/rx"
import { toast } from 'react-toastify';

const Connection = () => {
    const [requests, setRequests] = useState([]);
    const [userProfiles, setUserProfiles] = useState({});  // Cache for user profiles to avoid duplicate API calls

    const fetchPendingRequests = async () => {
        try {
            const response = await API.get('/connections/requests');
            const requestData = response.data.requests;
            const updatedRequests = await Promise.all(
                requestData.map(async (req) => {
                    if (!userProfiles[req.sender._id]) {
                        const userResponse = await API.post('/auth/current-user-post', { userId: req.sender._id });
                        const userData = userResponse.data.user;
                        setUserProfiles(prev => ({ ...prev, [req.sender._id]: userData }));
                        return { ...req, senderProfile: userData.profilePicture };
                    }
                    return { ...req, senderProfile: userProfiles[req.sender._id]?.profilePicture };
                })
            );
            setRequests(updatedRequests);
        } catch (error) {
            console.log('Error fetching requests:', error);
        }
    };
    useEffect(() => {
        fetchPendingRequests();
    }, []);

    if (!requests || requests.length === 0) {
        return <h3 className='no-pending'>No any pending requests here...</h3>
    }

    const handleReject = async (requestId) => {
        try {
            await API.post(`/connections/reject/${requestId}`);
            // Remove the rejected request from the requests state immediately
            toast.success('Connection rejected')
            setRequests((prevRequests) => prevRequests.filter((req) => req._id !== requestId));
        } catch (error) {
            console.log('Error rejecting request:', error);
        }
    }

    const handleAccept = async (requestId) => {
        try {
            await API.post(`/connections/accept/${requestId}`);
            // You can choose to update the state for accepted requests if needed
            toast.success('Connection accepted');
            setRequests((prevRequests) => prevRequests.filter((req) => req._id !== requestId));

        } catch (error) {
            console.log('Error accepting request:', error);
        }
    }

    return (
        <>
            <div className="connections-container">
                {requests.map((req) => (
                    <div className="pending-request-card" key={req._id}>
                        <RxCross2 className='cancel-req' onClick={() => handleReject(req._id)} />
                        <div
                            className="req-pro"
                            style={{ backgroundImage: `url(${req.senderProfile || ''})` }}
                        ></div>
                        <p>{req.sender.name}</p>
                        <button className='c-accept' onClick={() => handleAccept(req._id)}>Connect</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Connection;
