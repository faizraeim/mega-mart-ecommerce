import { useState } from "react";
import { signin, general } from "../data/data";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/auth.mjs";

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const data = await auth.login(formData.email, formData.password);
      if (data.user.role === "admin") {
        navigate("/dashboard/products");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-baseline justify-center max-w-7xl mx-auto max-h-screen py-30 gap-24">
      <div className="w-xl">
        <Link to="/">
          <img src={general.logoWithText} alt="MegaMart logo" className="w-48" />
        </Link>
        <h1 className="text-4xl font-bold mt-4 mb-3">{signin.title}</h1>
        <p>{signin.subtitle}</p>
        <img src={signin.shoppingIllustration} alt="" className="w-lg items-center" />
      </div>

      <div className="rounded-md border border-line bg-white p-8 w-sm">
        <form onSubmit={handleSubmit}>
          <p className="font-bold mb-6">{signin.formTitle}</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-sm mb-4">
              {error}
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder={signin.email}
              value={formData.email}
              onChange={handleChange}
              className="border border-line bg-gray-50 outline-none py-3 px-2 rounded-sm mb-2 w-full focus:border-primary"
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder={signin.password}
              value={formData.password}
              onChange={handleChange}
              className="border border-line bg-gray-50 outline-none py-3 px-2 rounded-sm w-full focus:border-primary"
            />
            <Link>
              <p className="text-primary my-4 text-sm">{signin.forgot}</p>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white font-semibold py-3 px-1 rounded-sm mb-2 w-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : signin.button}
            </button>
          </div>

          <div className="flex gap-2 mb-5">
            <input type="checkbox" id="keepSignedIn" className="text-primary" />
            <label htmlFor="keepSignedIn" className="text-sm">
              {signin.keepSignedIn}
            </label>
          </div>
          <Link to="/signup">
            <p className="text-sm text-primary mb-4">{signin.createAccount}</p>
          </Link>
          <p className="text-sm">{signin.termsAccept}</p>
          <p className="text-sm mt-6 text-gray-400 text-center">
            DEMO ( admin@megamart.com / admin123 )
          </p>
        </form>
      </div>
    </div>
  );
}
export default Signin;
