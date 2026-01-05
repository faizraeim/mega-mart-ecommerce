import NavBar from "./NavBar";
import Footer from "../pages/Footer";
import { useServerData } from "../utils/ServerData";
import CapitalizeFirstLetter from "../utils/CapitalizeFirstLetter";
import fallbackImage from "../img/fallback.png";
import { Link } from "react-router-dom";

function CategoryProducts({ category }) {
  // server data coming from backend handled in custom hook
  const { data: serverData, loading, error } = useServerData();

  // loading & error states
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center text-text">
          Loading products...
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

  // all products for this category
  const categoryProducts = serverData.filter(
    (product) => product.category === category
  );

  return (
    <div className="min-h-screen ">
      <NavBar />

      <main className="max-w-7xl mx-auto py-10 px-4 space-y-6">
        {/* Header / summary */}
        <header className="border-b border-border pb-4 flex flex-col gap-2">
          <p className="text-sm text-light">
            Home / Category /{" "}
            <span className="text-text">
              {CapitalizeFirstLetter(category)}
            </span>
          </p>
          <h1 className="text-3xl font-bold text-heading">
            {CapitalizeFirstLetter(category)} Products
          </h1>
          <p className="text-text text-sm">
            Showing{" "}
            <span className="font-semibold">
              {categoryProducts.length}
            </span>{" "}
            products in this category.
          </p>
        </header>

        {/* Products grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="block"
            >
              <article className="bg-white border border-border rounded-2xl overflow-hidden hover:border-primary hover:shadow-lg transition cursor-pointer">
              <div className="relative bg-background">
                <img
                  src={
                    Array.isArray(product.images) && product.images.length > 0
                      ? product.images[0]
                      : product.thumbnail || fallbackImage
                  }
                  alt={product.title}
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                  className="w-full h-48 object-contain p-4"
                />
                {product.discountPercentage > 0 && (
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {Math.round(product.discountPercentage)}% OFF
                  </span>
                )}
              </div>

              <div className="px-4 py-3 space-y-2">
                <h2 className="text-sm font-semibold text-heading line-clamp-2">
                  {product.title}
                </h2>
                <p className="text-xs text-text line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-heading">
                    ${Math.floor(product.price)}
                  </span>
                  <span className="text-xs text-light line-through">
                    $
                    {Math.floor(
                      product.price +
                        (product.price * product.discountPercentage) / 100
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-green-600 font-semibold">
                    Save $
                    {Math.ceil(
                      (product.price * product.discountPercentage) / 100
                    )}
                  </span>
                  <span className="text-light">
                    ⭐ {product.rating} • Stock: {product.stock}
                  </span>
                </div>

                <div className="mt-3 w-full bg-primary text-white text-sm font-medium py-2 rounded-full hover:bg-primary/90 text-center">
                  View details
                </div>
              </div>
            </article>
            </Link>
          ))}

          {categoryProducts.length === 0 && (
            <p className="col-span-full text-center text-text">
              No products found in this category.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CategoryProducts;