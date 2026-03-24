import { useEffect, useState } from "react";
import { general } from "../data/data";
import CapitalizeFirstLetter from "../utils/CapitalizeFirstLetter";
import { useServerData } from "../utils/ServerData";

function Deals() {
  const { data: serverData, loading, error } = useServerData();
  const [currentIndex, setCurrentIndex] = useState(0);

  // loading and error handling
  if (loading)
    return (
      <div className="flex max-w-7xl mx-auto gap-6 overflow-auto my-6">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex max-w-7xl mx-auto gap-6 overflow-auto my-6">
        Error: {error}
      </div>
    );

  // filters for maping the current condition data
  const dealsProducts = serverData.filter(
    (product) => product.discountPercentage > 14,
  );

  // navigation handlers
  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? dealsProducts.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === dealsProducts.length - 1 ? 0 : prev + 1,
    );
  };

  // if no deal was there do not render
  if (dealsProducts.length === 0) {
    return <div className="text-center py-8">Leading deals...</div>;
  }

  const currentProduct = dealsProducts[currentIndex];

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-primary text-sm font-semibold uppercase tracking-wide">
            Today’s spotlight
          </p>
          <h2 className="text-3xl font-bold text-heading">
            Best deals across categories
          </h2>
          <p className="text-text text-sm">
            Handpicked offers with big discounts and fast delivery.
          </p>
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={handlePrevious}
            className="w-10 h-10 rounded-full border border-border text-heading hover:bg-primary hover:text-white transition"
            aria-label="Previous deal"
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-border text-heading hover:bg-primary hover:text-white transition"
            aria-label="Next deal"
          >
            ❯
          </button>
        </div>
      </div>
      <div className="relative bg-blue-950 text-white rounded-3xl px-6 md:px-16 lg:px-24 py-10 shadow-lg overflow-hidden">
        {/* Previous Button (mobile/overlay) */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-primary w-10 h-10 rounded-full border border-white hover:bg-white transition"
          aria-label="Previous deal"
        >
          ❮
        </button>

        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-4 ">
            <p className="text-3xl font-bold">
              {`Best Deal Online on ${CapitalizeFirstLetter(currentProduct.category)}`}
            </p>
            <p className="text-6xl font-bold">
              {currentProduct.title.toUpperCase()}
            </p>
            <p className="text-3xl flex gap-3 items-center">
              <span>{`Up to ${Math.round(currentProduct.discountPercentage)}% OFF`}</span>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full border border-white/30">{`Stock: ${currentProduct.stock}`}</span>
            </p>
          </div>
          <div>
            <img
              src={currentProduct.thumbnail || general.fallbackImage}
              alt={currentProduct.title}
              className="w-64 h-64 object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* Next Button (mobile/overlay) */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-primary w-10 h-10 rounded-full border border-white hover:bg-white transition"
          aria-label="Next deal"
        >
          ❯
        </button>

        {/* Dot Indicators */}
        <div className="flex justify-start gap-2 mt-8">
          {dealsProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition ${
                index === currentIndex ? "bg-white w-6" : "bg-white/40 w-2"
              }`}
              aria-label={`Go to deal ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Deals;
