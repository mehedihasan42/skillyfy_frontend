import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        Swal.fire("Please login to access this page");
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
