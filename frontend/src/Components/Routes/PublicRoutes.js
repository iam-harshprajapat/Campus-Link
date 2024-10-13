import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    // Check if token exists in localStorage, then navigate to homepage if valid
    if (token) {
        return <Navigate to='/feed' />;
    }

    // If no token, display public content (e.g., login/register page)
    return children;
};

export default PublicRoute;
