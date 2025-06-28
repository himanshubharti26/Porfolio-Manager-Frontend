import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import StockList from "../pages/stock/StockList";
import PrivateRoute from "../components/PrivateRoute";
import { Provider } from "react-redux";
import store from "../redux/store";


const AppRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/stocks"
                    element={
                        <PrivateRoute>
                            <StockList />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
    );
};

export default AppRoutes;