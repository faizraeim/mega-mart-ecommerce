import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../pages/Footer";
import { useCart } from "../utils/CartContext";
import CapitalizeFirstLetter from "../utils/CapitalizeFirstLetter";
import { FiTrash2 } from "react-icons/fi";

function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-heading mb-4">Your cart is empty</h2>
            <p className="text-text mb-6">Add some products to get started!</p>
            <Link
              to="/"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />

      <main className="flex-1 max-w-7xl mx-auto w-full py-8 px-4">
        <h1 className="text-3xl font-bold text-heading mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-white border border-border rounded-2xl p-4 flex gap-4"
              >
                <Link to={`/product/${item.id || item._id}`}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.id || item._id}`}
                    className="font-semibold text-heading hover:text-primary truncate block"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-text">{CapitalizeFirstLetter(item.category)}</p>
                  <p className="text-sm text-text">{item.brand}</p>
                  <p className="text-lg font-bold text-heading mt-2">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item._id || item.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                  >
                    <FiTrash2 size={18} />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-border rounded-2xl p-6 sticky top-4">
              <h2 className="text-xl font-bold text-heading mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-text">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-lg text-heading">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/"
                className="block text-center mt-4 text-primary hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
