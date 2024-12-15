import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./components/App.tsx";
import Bike from "./components/Bike.tsx";
import Admin from "./components/admin/Admin.tsx";
import AdminBikes from "./components/admin/AdminBikes.tsx";
import AdminBrands from "./components/admin/AdminBrands.tsx";
import AdminCenters from "./components/admin/AdminCenters.tsx";
import AdminModels from "./components/admin/AdminModels.tsx";
import AdminOrders from "./components/admin/AdminOrders.tsx";
// -
import AdminEditBike from "./components/admin/edit/AdminEditBike.tsx";
import AdminEditBrand from "./components/admin/edit/AdminEditBrand.tsx";
import AdminEditCenter from "./components/admin/edit/AdminEditCenter.tsx";
import AdminEditModel from "./components/admin/edit/AdminEditModel.tsx";
import AdminEditOrder from "./components/admin/edit/AdminEditOrder.tsx";
// -
import AdminCreateBike from "./components/admin/create/AdminCreateBike.tsx";
import AdminCreateBrand from "./components/admin/create/AdminCreateBrand.tsx";
import AdminCreateCenter from "./components/admin/create/AdminCreateCenter.tsx";
import AdminCreateModel from "./components/admin/create/AdminCreateModel.tsx";
import AdminCreateOrder from "./components/admin/create/AdminCreateOrder.tsx";
// -
import Login from "./components/auth/Login.tsx";
import Register from "./components/auth/Register.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* - */}
          <Route path="/bike-view/:id" element={<Bike />} />
          <Route path="/admin" element={<Admin />} />
          {/* - */}
          <Route path="/admin/bikes" element={<AdminBikes />} />
          <Route path="/admin/brands" element={<AdminBrands />} />
          <Route path="/admin/centers" element={<AdminCenters />} />
          <Route path="/admin/models" element={<AdminModels />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          {/* - */}
          <Route path="/admin/update/bike/:id" element={<AdminEditBike />} />
          <Route path="/admin/update/brand/:id" element={<AdminEditBrand />} />
          <Route
            path="/admin/update/center/:id"
            element={<AdminEditCenter />}
          />
          <Route path="/admin/update/model/:id" element={<AdminEditModel />} />
          <Route path="/admin/update/order/:id" element={<AdminEditOrder />} />
          {/* - */}
          <Route path="/admin/create/bike" element={<AdminCreateBike />} />
          <Route path="/admin/create/brand" element={<AdminCreateBrand />} />
          <Route path="/admin/create/center" element={<AdminCreateCenter />} />
          <Route path="/admin/create/model" element={<AdminCreateModel />} />
          <Route path="/admin/create/order" element={<AdminCreateOrder />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}
