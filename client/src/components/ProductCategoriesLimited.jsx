import { bestDeal, general } from "../data/data"
import CapitalizeFirstLetter from "../utils/CapitalizeFirstLetter"
import { useServerData } from "../utils/ServerData"
import { SlArrowRight } from "react-icons/sl"
import { Link } from "react-router-dom"


function ProductCategories({ category }) {
    // server data coming from backend handled in custom hook
    const { data: serverData, loading, error } = useServerData()
    // error and loading handling
    if (loading) return <div className="flex space-x-4 max-w-7xl mx-auto border-y border-border py-6">Loading...</div>
    if (error) return <div className="flex space-x-4 max-w-7xl mx-auto border-y border-border py-6">Error: {error}</div>

    const bestProducts = serverData.filter(product => product.category === category)
    const hasProducts = bestProducts.length > 0

    return (
        <div className="max-w-7xl mx-auto mt-16 space-y-6">
            <div className="flex justify-between items-end border-b border-border pb-4">
                <div>
                    <p className="text-primary font-semibold text-sm uppercase tracking-wide">Top picks</p>
                    <p className="text-3xl font-bold text-text flex items-center gap-2">
                        {bestDeal.grab}{" "}
                        <span className="text-primary">
                            {hasProducts ? CapitalizeFirstLetter(bestProducts[0].category) : CapitalizeFirstLetter(category)}
                        </span>
                    </p>
                    <p className="text-light text-sm">Handpicked best-sellers with great discounts.</p>
                </div>
                {hasProducts && (
                    <Link to={`/category/${bestProducts[0].category}`} className="flex gap-2 items-center text-primary font-semibold hover:underline">
                        {bestDeal.viewAll}
                        <span className="text-sm"><SlArrowRight /></span>
                    </Link>
                )}
            </div>
            {!hasProducts && (
                <div className="bg-background border border-border rounded-2xl p-6 text-text">
                    No products found in this category yet.
                </div>
            )}
            {hasProducts && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {bestProducts.slice(0, 4).map((product) => {
                        const originalPrice = Math.floor(product.price + (product.price * product.discountPercentage) / 100)
                        const savings = Math.ceil((product.price * product.discountPercentage) / 100)
                        return (
                            <Link key={product.id} to={`/product/${product.id}`}>
                                <div className="bg-white border border-border hover:border-primary hover:shadow-lg rounded-2xl overflow-hidden transition cursor-pointer h-full flex flex-col">
                                    <div className="relative bg-background">
                                        <img
                                            src={product.images.length > 1 ? product.images[0] : product.images}
                                            alt={product.title}
                                            onError={(e) => {
                                                e.currentTarget.src = general.fallbackImage;
                                            }}
                                            className="w-full h-48 object-contain p-4"
                                        />
                                        {product.discountPercentage > 0 && (
                                            <p className="bg-primary text-white text-xs font-semibold px-3 py-1 absolute top-2 right-2 rounded-full">
                                                {Math.floor(product.discountPercentage)}% OFF
                                            </p>
                                        )}
                                    </div>
                                    <div className="px-4 py-3 space-y-2 flex-1">
                                        <p className="text-xs text-light">{CapitalizeFirstLetter(product.category)}</p>
                                        <p className="text-sm font-semibold text-heading line-clamp-2">{product.title}</p>
                                        <div className="flex items-baseline gap-2">
                                            <p className="font-bold text-heading text-lg">${Math.floor(product.price)}</p>
                                            <p className="text-xs text-light line-through">${originalPrice}</p>
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
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default ProductCategories