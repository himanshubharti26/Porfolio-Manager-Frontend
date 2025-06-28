import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import StockList from "../pages/stock/StockList";
import PrivateRoute from "../components/PrivateRoute";


const AppRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Navigate to="/stocks" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/stocks"
                    element={
                        <PrivateRoute>
                            <StockList />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/stocks" replace />} />
            </Routes>
    );
};

export default AppRoutes;