import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../../middleware/ProtectedRoute"
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Error from "../pages/Error";
import DataFetcher from "../pages/Slots";
import Auth from "../pages/Auth";

export  const Router = createBrowserRouter([

    {
        path: "/",
        element: <Home />
    },
    {
        path: "/slot",
        element: <ProtectedRoute>
            <DataFetcher />
        </ProtectedRoute>

    },
    {
        path: "/profile",
        element: <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    },
    {
        path: "/auth",
        element: <Auth />
    },
    {
        path: "*",
        element: <Error />
    },

]);