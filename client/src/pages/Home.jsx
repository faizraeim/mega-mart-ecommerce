import Categories from "../components/ProductCategoriesList";
import Deals from "../components/Deals";
// import MiniBar from "../components/MiniBar";
import NavBar from "../components/NavBar";
import ProductCategories from "../components/ProductCategoriesLimited";
import CTAStrip from "./CTAStrip";
import Footer from "./Footer";
import HeroBanner from "./HeroBanner";
import PromoBanner from "./PromoBanner";
import ServiceHighlights from "./ServiceHighlights";
import TrustStats from "./TrustStats";

function Home() {
    return (
        <>
            <NavBar />
            <HeroBanner />

            <div id="categories">
                <Categories />
            </div>

            <Deals />

            {/* Featured sections broken up to avoid repetition */}
            <div id="featured" className="space-y-16">
                <ProductCategories category="furniture" />

                <ServiceHighlights />
                <ProductCategories category="beauty" />
                <PromoBanner />
                <ProductCategories category="fragrances" />
                <TrustStats />

                <ProductCategories category="groceries" />
            </div>

            <CTAStrip />
            <Footer />
        </>
    )
}

export default Home