import { Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import CategoryProducts from '../components/CategoryProducts';
import ProductDetail from '../components/ProductDetail';
import { useServerData } from './ServerData';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSuccess';
import Dashboard from '../pages/dashboard/Dashboard';
import DashboardProducts from '../pages/dashboard/tabs/DashboardProducts'
import DashboardOrders from '../pages/dashboard/tabs/DashboardOrders'
import DashboardUser from '../pages/dashboard/tabs/DashboardUser'
import ProtectedRoute from './ProtectedRoute'

function AppRouter() {
    const { data: serverData, loading, error } = useServerData()
    const categories = Array.from(new Set(serverData.map(product => product.category)))

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
            {categories.map((category) => (
                <Route
                    key={category}
                    path={`/category/${category}`}
                    element={<CategoryProducts category={category} />}
                />
            ))}
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/order-success' element={<OrderSuccess />} />
            <Route path='/dashboard' element={
                <ProtectedRoute adminOnly>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/dashboard/products" element={
                <ProtectedRoute adminOnly>
                    <DashboardProducts />
                </ProtectedRoute>
            } />
            <Route path="/dashboard/orders" element={
                <ProtectedRoute adminOnly>
                    <DashboardOrders />
                </ProtectedRoute>
            } />
            <Route path="/dashboard/user" element={
                <ProtectedRoute adminOnly>
                    <DashboardUser />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default AppRouter