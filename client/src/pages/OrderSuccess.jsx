import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../pages/Footer";
import { FiCheckCircle } from "react-icons/fi";

function OrderSuccess() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-heading mb-4">Order Placed Successfully!</h1>
          <p className="text-text mb-8">
            Thank you for your purchase. Your order has been received and is being processed. You will receive a confirmation email shortly.
          </p>
          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition"
            >
              Continue Shopping
            </Link>
            <Link
              to="/cart"
              className="block w-full border border-primary text-primary font-semibold py-3 rounded-lg hover:bg-primary/5 transition"
            >
              View Cart
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default OrderSuccess;
