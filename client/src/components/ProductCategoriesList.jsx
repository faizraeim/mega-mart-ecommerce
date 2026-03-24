import { Link } from "react-router-dom";
import CapitalizeFirstLetter from "../utils/CapitalizeFirstLetter";
import { useServerData } from "../utils/ServerData";

function Categories() {
  // server data comming for backend handled in custom hook
  const { data: serverData, loading, error } = useServerData();
  // error and loading handling

  const categories = Array.from(
    new Set(serverData.map((product) => product.category)),
  );

  return (
    <>
      {loading && (
        <div className="flex space-x-4 max-w-7xl mx-auto border-y border-border py-6">
          Loading...
        </div>
      )}
      {error && (
        <div className="flex space-x-4 max-w-7xl mx-auto border-y border-border py-6">
          Error: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-4 border-b border-border">
          <div className="flex items-center justify-between  mb-4">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-wide">
                Browse categories
              </p>
              <p className="text-heading text-xl font-bold">
                Find what you need faster
              </p>
            </div>
            <span className="text-xs text-light">
              Showing {categories.length} categories
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2" role="list">
            {categories.map((category, index) => (
              <Link key={index} to={`/category/${category}`} role="listitem">
                <div className="flex">
                  <p className="bg-primary/5 border border-border rounded-full px-5 py-2 text-sm text-heading hover:bg-primary hover:text-white transition">
                    {CapitalizeFirstLetter(category)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Categories;
