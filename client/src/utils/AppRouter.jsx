import { Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import CategoryProducts from '../components/CategoryProducts';
import ProductDetail from '../components/ProductDetail';
import { useServerData } from './ServerData';

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
        </Routes>
    );
}

export default AppRouter