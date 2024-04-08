import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/admin/Dashboard";
import ProductsList from "./pages/admin/ProductsList";
import UsersList from "./pages/admin/UsersList";
import CouponsList from "./pages/admin/CouponsList";
import AdminPannel from "./pages/admin/AdminPannel";
import SingleProduct from "./pages/SingleProduct";
import OrdersList from "./pages/admin/OrdersList";
import CreateProduct from "./components/CreateProduct";
import VerifyOtp from "./pages/VerifyOtp";

function App() {
  return (
    <div className="dark">
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp/:id" element={<VerifyOtp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPannel />}>
            <Route index element={<Dashboard />} />
            <Route path="productslist" element={<ProductsList />} />
            <Route path="userslist" element={<UsersList />} />
            <Route path="couponslist" element={<CouponsList />} />
            <Route path="orderslist" element={<OrdersList />} />
          </Route>
          <Route path="productslist/new" element={<CreateProduct />} />
          <Route path="*" element={<div>Page not found!</div>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
