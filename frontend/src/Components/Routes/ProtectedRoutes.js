import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import API from "../../Services/API";
import { getCurrentUser } from "../../redux/features/login/authAction";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();

    const getUser = async () => {
        try {
            const { data } = await API.get("/auth/current-user");
            if (data?.success) {
                dispatch(getCurrentUser(data));
            }
        } catch (error) {
            localStorage.clear('token')
        }
    };
    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, []);

    const token = localStorage.getItem("token");

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/" />;
    }

    // If token exists, allow access to protected route
    return children;
};

export default ProtectedRoute;
