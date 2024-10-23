import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import API from "../../Services/API";
import { getCurrentUser } from "../../redux/features/login/authAction";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            // Fetch the current user only if token exists
            const getUser = async () => {
                try {
                    const { data } = await API.get("/auth/current-user");
                    if (data?.success) {
                        dispatch(getCurrentUser()); // No need to pass data, it is handled in Redux
                    }
                } catch (error) {
                    localStorage.removeItem('token');
                }
            };
            getUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, token]);

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/" />;
    }

    // If token exists, allow access to protected route
    return children;
};

export default ProtectedRoute;
