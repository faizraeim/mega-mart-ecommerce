import { useState } from "react";
import { signin, general } from "../data/data";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/auth.mjs";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await auth.register(formData);
      navigate("/");
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
          <p className="font-bold mb-6">Create your MegaMart account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-sm mb-4">
              {error}
            </div>
          )}

          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="border border-line bg-gray-50 outline-none py-3 px-2 rounded-sm mb-2 w-full focus:border-primary"
            />
            <br />
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
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white font-semibold py-3 px-1 rounded-sm mb-2 mt-4 w-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </div>

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary">
              Sign in
            </Link>
          </p>
          <p className="text-sm mt-4">{signin.termsAccept}</p>
        </form>
      </div>
    </div>
  );
}
export default Signup;
