import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";

import Home from "./pages/home/Home.jsx";

import Products from "./pages/shop/Products";
import ProductDetails from "./pages/shop/ProductDetails";
import CategoryProducts from "./pages/shop/CategoryProducts";
import Cart from "./pages/shop/Cart";
import Wishlist from "./pages/shop/Wishlist";
import MyOrders from "./pages/shop/MyOrders";

import Profile from "./pages/profile/Profile";

import Admin from "./pages/admin/Admin";
import AdminProducts from "./pages/admin/products/AdminProducts";
import CreateProduct from "./pages/admin/products/CreateProduct";
import EditProduct from "./pages/admin/products/EditProduct";
import AdminCategories from "./pages/admin/categories/AdminCategories";
import AdminOrders from "./pages/admin/orders/AdminOrders";

import ErrorPage from "./pages/ErrorPage";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";

function Layout() {
  const location = useLocation();

  const authPages = ["/login", "/register", "/verify"];

  const hideLayout = authPages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
      {!hideLayout && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />

          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />

          <Route
            path="/products/:id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="/category/:id"
            element={
              <PrivateRoute>
                <CategoryProducts />
              </PrivateRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <PrivateRoute>
                <Wishlist />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-orders"
            element={
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/create-product"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <CreateProduct />
                </AdminRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/products/edit/:id"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <EditProduct />
                </AdminRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminCategories />
                </AdminRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;