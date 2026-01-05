import { useParams, Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "../pages/Footer";
import { useServerData } from "../utils/ServerData";
import CapitalizeFirstLetter from "../utils/CapitalizeFirstLetter";
import fallbackImage from "../img/fallback.png";
import { useState } from "react";

function ProductDetail() {
  const { id } = useParams();
  const { data: serverData, loading, error } = useServerData();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // loading & error states
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center text-text">
          Loading product details...
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center text-red-500">
          Error: {error}
        </div>
        <Footer />
      </div>
    );
  }

  // Find the product by ID
  const product = serverData.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-heading mb-4">
              Product Not Found
            </h1>
            <Link
              to="/"
              className="text-primary hover:underline"
            >
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get product images
  const productImages = Array.isArray(product.images)
    ? product.images
    : product.thumbnail
    ? [product.thumbnail]
    : [fallbackImage];

  const originalPrice =
    product.price + (product.price * product.discountPercentage) / 100;
  const savings = (product.price * product.discountPercentage) / 100;

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="max-w-7xl mx-auto py-10 px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-light mb-6">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          {" / "}
          <Link
            to={`/category/${product.category}`}
            className="hover:text-primary"
          >
            {CapitalizeFirstLetter(product.category)}
          </Link>
          {" / "}
          <span className="text-text">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white border border-border rounded-2xl overflow-hidden">
              <img
                src={productImages[selectedImageIndex] || fallbackImage}
                alt={product.title}
                onError={(e) => {
                  e.currentTarget.src = fallbackImage;
                }}
                className="w-full h-96 object-contain p-4"
              />
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`shrink-0 border-2 rounded-lg overflow-hidden ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-border"
                    }`}
                  >
                    <img
                      src={image || fallbackImage}
                      alt={`${product.title} view ${index + 1}`}
                      onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                      }}
                      className="w-20 h-20 object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Brand */}
            <div>
              <p className="text-sm text-light mb-2">
                {product.brand || "Brand"}
              </p>
              <h1 className="text-4xl font-bold text-heading mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold text-text">
                    {product.rating}
                  </span>
                </div>
                <span className="text-light">•</span>
                <span
                  className={`font-semibold ${
                    product.availabilityStatus === "In Stock"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {product.availabilityStatus}
                </span>
                <span className="text-light">•</span>
                <span className="text-text">
                  {product.stock} in stock
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="border-t border-b border-border py-6 space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-heading">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-xl text-light line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                      {Math.round(product.discountPercentage)}% OFF
                    </span>
                  </>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <p className="text-green-600 font-semibold">
                  You save ${savings.toFixed(2)}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-heading mb-3">
                Description
              </h2>
              <p className="text-text leading-relaxed">{product.description}</p>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-border rounded-lg p-4">
                <p className="text-sm text-light mb-1">SKU</p>
                <p className="font-semibold text-text">{product.sku}</p>
              </div>
              <div className="bg-white border border-border rounded-lg p-4">
                <p className="text-sm text-light mb-1">Weight</p>
                <p className="font-semibold text-text">{product.weight}g</p>
              </div>
              <div className="bg-white border border-border rounded-lg p-4">
                <p className="text-sm text-light mb-1">Dimensions</p>
                <p className="font-semibold text-text">
                  {product.dimensions.width} × {product.dimensions.height} ×{" "}
                  {product.dimensions.depth} cm
                </p>
              </div>
              <div className="bg-white border border-border rounded-lg p-4">
                <p className="text-sm text-light mb-1">Minimum Order</p>
                <p className="font-semibold text-text">
                  {product.minimumOrderQuantity} units
                </p>
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-heading mb-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-primary text-white font-semibold py-3 px-6 rounded-full hover:bg-primary/90 transition">
                Add to Cart
              </button>
              <button className="flex-1 border-2 border-primary text-primary font-semibold py-3 px-6 rounded-full hover:bg-primary/5 transition">
                Buy Now
              </button>
            </div>

            {/* Shipping & Warranty Info */}
            <div className="bg-white border border-border rounded-lg p-4 space-y-3">
              <div>
                <p className="text-sm font-semibold text-heading mb-1">
                  Shipping Information
                </p>
                <p className="text-sm text-text">
                  {product.shippingInformation}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-heading mb-1">
                  Warranty
                </p>
                <p className="text-sm text-text">
                  {product.warrantyInformation}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-heading mb-1">
                  Return Policy
                </p>
                <p className="text-sm text-text">{product.returnPolicy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold text-heading mb-6">
              Customer Reviews ({product.reviews.length})
            </h2>
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white border border-border rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-heading">
                        {review.reviewerName}
                      </p>
                      <p className="text-sm text-light">{review.reviewerEmail}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < review.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-light">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-text">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetail;

