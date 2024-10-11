import React, { useEffect, useLayoutEffect, useState } from "react";
import RegisterVendor from "./Pages/RegisterVendor";
import DashboardPage from "./Pages/Dashborad/Dashboard";
import VendorMenu from "./Pages/Dashborad/VendorMenu";
import { Route, Router, Routes, Outlet, useLocation } from "react-router-dom";
import VendorOrder from "./Pages/Dashborad/VendorOrder";
import Navbar from "./components/Navbar";
import DashboardNavbar from "./components/VendorDashboard/Dashboard/DashboardNavbar";
import DashboardSidbar from "./components/VendorDashboard/Dashboard/DashboardSidbar";
import VendorDetailPage from "./Pages/Vendor/VendorPage";
import MenuCreate from "./Pages/Dashborad/MenuCreate";
import MenuEdit from "./Pages/Dashborad/MenuEdit";
import LoginPage from "./Pages/Auth/Login";
import ProtectedRoute from "./context/ProtectedRoute";
import axios from "axios";
import { AuthProvider } from "./context/AuthProvider";
import AdminLoginPage from "./Pages/Auth/AdminLogin";
import AdminDashboradSidebar from "./components/AdminDashboard/AdminDashboradSidebar";
import AdminProtectedRoute from "./context/AdminProtectedRoute";
import Unauthorized from "./Pages/Unauthorized";

import { IStaticMethods } from "preline/preline";
import Payment from "./Pages/Admin/Payment";
import UserMgtPage from "./Pages/Admin/UserMgt";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CategoryList from "./Pages/Admin/Category/CategoryList";
import ResetPassword from "./Pages/Auth/ResetPassword";
import MenuCreateForm from "./Pages/Dashborad/CreateMenu";
import AdminMenuCategory from "./Pages/Admin/Category/AdminMenuCategory";
import MenuCategoryCreateForm from "./components/AdminDashboard/MenuCategoryCreateForm";
import InterestsCheckbox from "./Pages/Dashborad/CreateMenu";

const AdminDashboardLayout = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Re-initialize Preline when the route changes
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, [location]); // Re-run the effect when the route changes

  return (
    <div>
      {/* <!-- ========== HEADER ========== --> */}
      <DashboardNavbar />

      <AdminDashboradSidebar />
      {/* <DashboardSidbar /> */}

      {/* <!-- ========== MAIN CONTENT ========== --> */}
      <div className="w-full lg:ps-64">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {" "}
          <Outlet />
        </div>
      </div>
      {/* <!-- ========== MAIN CONTENT END ========== --> */}
    </div>
  );
};

const DashboardLayout = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Re-initialize Preline when the route changes
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, [location]); // Re-run the effect when the route changes

  return (
    <div>
      {/* <!-- ========== HEADER ========== --> */}
      <DashboardNavbar />
      {/* <!-- ========== END HEADER ========== --> */}

      <DashboardSidbar />
      {/* <!-- ========== MAIN CONTENT ========== --> */}
      <div className="w-full lg:ps-64">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {" "}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const PageLayout = () => {
  return (
    <div>
      {/* <!-- ========== HEADER ========== --> */}
      <Navbar />
      {/* <!-- ========== MAIN CONTENT ========== --> */}
      <Outlet />
    </div>
  );
};

const App = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Re-initialize Preline when the route changes
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, [location]); // Re-run the effect when the route changes

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/auth/forget-password" element={<ForgetPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/get-start" element={<RegisterVendor />} />
          <Route path="admin" element={<AdminLoginPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="menu" element={<VendorMenu />} />
          <Route path="menu/:id" element={<VendorMenu />} />
          <Route path="menu/create" element={<MenuCreate />} />
          <Route path="menu/create/sample" element={<InterestsCheckbox />} />
          <Route path="menu/edit/:id" element={<MenuEdit />} />
          <Route path="menu/delete/:id" element={<VendorMenu />} />
          <Route path="orders" element={<VendorOrder />} />
          <Route path="vendor/:id" element={<VendorDetailPage />} />
          <Route path="rooms" element={<AdminMenuCategory />} />
        </Route>

        <Route
          path="admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboardLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index path="dashboard" element={<AdminDashboard />} />
          <Route path="vendor/:id" element={<VendorDetailPage />} />
          <Route path="payment" element={<Payment />} />
          <Route path="users" element={<UserMgtPage />} />
          <Route path="users/:id" element={<Payment />} />
          <Route path="vendors" element={<DashboardPage />} />
          <Route path="vendors/:id" element={<VendorDetailPage />} />
          <Route path="category/business" element={<CategoryList />} />
          <Route path="category/menu" element={<AdminMenuCategory />} />
          <Route
            path="category/menu/create"
            element={<MenuCategoryCreateForm />}
          />
        </Route>
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </AuthProvider>
  );
};

export default App;

// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";

// export default function App() {
//   return (
//     <header>
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//     </header>
//   );
// }
