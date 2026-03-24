import NavBar from "../components/NavBar"
import Footer from "./Footer"
import { Link } from "react-router-dom"

function NotFound(){
    return(
        <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-primary font-semibold uppercase tracking-wide mb-2">Oops!</p>
            <h1 className="text-4xl font-bold text-heading mb-3">
              Page not found
            </h1>
            <p className="text-text mb-6 max-w-md mx-auto">The page you’re looking for doesn’t exist or has been moved. Try browsing categories or head back home.</p>
            <Link
              to="/"
              className="inline-block bg-primary text-white px-5 py-3 rounded-full font-semibold hover:bg-primary/90"
            >
              Return to Home
            </Link>
            <div className="mt-4">
              <Link to="/category/beauty" className="text-primary hover:underline mx-2">Beauty</Link>
              <Link to="/category/furniture" className="text-primary hover:underline mx-2">Furniture</Link>
              <Link to="/category/groceries" className="text-primary hover:underline mx-2">Groceries</Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
}
export default NotFound