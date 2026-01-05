import Categories from "../components/Categories";
import Deals from "../components/Deals";
import MiniBar from "../components/MiniBar";
import NavBar from "../components/NavBar";
import ProductCategories from "../components/ProductCategories";
import Footer from "./Footer";

function Home() {
    return (
        <>
            <NavBar />
            <Categories />
            <Deals />
            <ProductCategories category="furniture" />
            <ProductCategories category="beauty" />
            <ProductCategories category="fragrances" />
            <ProductCategories category="groceries" />
            <Footer />
        </>
    )
}

export default Home