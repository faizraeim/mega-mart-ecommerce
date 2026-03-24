import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Categories from "../components/ProductCategoriesList";
import Deals from "../components/Deals";
import NavBar from "../components/NavBar";
import ProductCategories from "../components/ProductCategoriesLimited";
import CTAStrip from "./CTAStrip";
import Footer from "./Footer";
import HeroBanner from "./HeroBanner";
import PromoBanner from "./PromoBanner";
import ServiceHighlights from "./ServiceHighlights";
import TrustStats from "./TrustStats";
import { useServerData } from "../utils/ServerData";
import { general } from "../data/data";

function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { data: products, loading } = useServerData();

  const filteredProducts = useMemo(() => {
    if (!searchQuery || !products) return null;
    const query = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [products, searchQuery]);

  const ProductCard = ({ product }) => {
    const originalPrice = Math.floor(product.price + (product.price * product.discountPercentage) / 100);
    const savings = Math.ceil((product.price * product.discountPercentage) / 100);
    
    return (
      <Link to={`/product/${product.id || product._id}`}>
        <div className="bg-white border border-border hover:border-primary hover:shadow-lg rounded-2xl overflow-hidden transition cursor-pointer h-full flex flex-col">
          <div className="relative bg-background">
            <img
              src={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : product.thumbnail}
              alt={product.title}
              onError={(e) => { e.currentTarget.src = general.fallbackImage; }}
              className="w-full h-48 object-contain p-4"
            />
            {product.discountPercentage > 0 && (
              <p className="bg-primary text-white text-xs font-semibold px-3 py-1 absolute top-2 right-2 rounded-full">
                {Math.floor(product.discountPercentage)}% OFF
              </p>
            )}
          </div>
          <div className="px-4 py-3 space-y-2 flex-1">
            <p className="text-xs text-light capitalize">{product.category}</p>
            <p className="text-sm font-semibold text-heading line-clamp-2">{product.title}</p>
            <div className="flex items-baseline gap-2">
              <p className="font-bold text-heading text-lg">${Math.floor(product.price)}</p>
              {product.discountPercentage > 0 && (
                <p className="text-xs text-light line-through">${originalPrice}</p>
              )}
            </div>
            <p className="text-green-600 text-sm font-semibold">Save ${savings}</p>
            <div className="flex justify-between items-center text-xs text-light">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">⭐ {product.rating}</span>
              <span className="bg-background px-3 py-1 rounded-full border border-border">Stock: {product.stock}</span>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="w-full bg-primary text-white text-sm font-semibold py-2 rounded-full text-center hover:bg-primary/90">
              View details
            </div>
          </div>
        </div>
      </Link>
    );
  };

  if (searchQuery && filteredProducts !== null) {
    return (
      <>
        <NavBar />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold text-heading mb-2">
            Search Results for "{searchQuery}"
          </h1>
          <p className="text-text mb-6">{filteredProducts.length} products found</p>

          {loading ? (
            <p className="text-center py-12 text-text">Loading...</p>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text mb-4">No products found matching your search.</p>
              <a href="/" className="text-primary hover:underline">
                Clear search
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id || product._id} product={product} />
              ))}
            </div>
          )}
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <HeroBanner />

      <div id="categories">
        <Categories />
      </div>

      <Deals />

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
  );
}

export default Home;
