import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/navigation";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import Home from "./components/Home";
import { Login } from "./components/Login";
import { PriceDetails } from "./components/PriceDetails";
import { AuthProvider } from "./components/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { UsersDashboard } from "./components/ManageUsers/UsersDashboard";
import { ItemssDashboard } from "./components/ManageItems/ItemsDashBoard";
import { LeadsDashboard } from "./components/ManageLeads/LeadsDashboard";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/price-details"
            element={
              <ProtectedRoute>
                <PriceDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users-dashboard"
            element={
              <ProtectedRoute>
                <UsersDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items-dashboard"
            element={
              <ProtectedRoute>
                <ItemssDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads-dashboard"
            element={
              <ProtectedRoute>
                <LeadsDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
