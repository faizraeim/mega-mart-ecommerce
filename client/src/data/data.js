const logo = '/assets/MegaMartLogo.png'
const logoWithText = '/assets/MegaMartLogoText.png'
const logoText = '/assets/MegaMartText.png'
const fallbackImage = '/assets/fallback.png'
const shoppingIllustration = '/assets/shoppin_illustration.webp'

const appName = import.meta.env.VITE_APP_NAME || "MegaMart"

export const general = {
  logoIcon: logo,
  logoWithText: logoWithText,
  logoText: logoText,
  fallbackImage: fallbackImage,
  logoName: appName,

}
export const miniBar = {
  greeting: `Welcome to worldwide ${appName}!`,
  deliver: "Deliver to 423651",
  track: "Track your order",
  offer: "All offers"
};


export const navBar = {
  search: "Search essentials, groceries and more...",
  signin: "Sign Up/Sign In",
  cart: "Cart"
};

export const bestDeal = {
  grab: "Grab the best deal on ",
  viewAll: "View All"
}

export const footerData = {
  logo: appName,
  contactUs: "Contact Us",
  whatsapp: "Whats App",
  whatsappNumber: "+1 202-918-2132",
  call: "Call Us",
  phoneNumber: "+1 202-918-2132",
  downloadApp: "Download App",
  category: "Most Popular Categories",
  servicesTitle: "Customer Services",
  services: ["About Us", "Terms & Conditions", "FAQ", "Privacy Policy", "E-waste Policy", "Cancellation & Return Policy"]
}

export const signin = {
  title: "Buy online with MegaMart",
  subtitle: "MegaMart is a compelete online store having from basic needs to everything you can imagine of.",
  formTitle: "Sign in to your MegaMart account",
  email: "Email",
  password: "Password",
  forgot: "Forgot your password?",
  button: "Sign In",
  keepSignedIn: "Keep me signed in",
  createAccount: "Create new MegaMart account",
  termsAccept: "By continuing, you agree to the Terms of Service and Privacy Policy.",
  shoppingIllustration: shoppingIllustration,
};

export const signup = {
  title: "Join MegaMart today",
  subtitle: "Create an account to enjoy personalized shopping and exclusive deals.",
};


export const sidebarMenu = [
  { id: 1, name: "dashboard" },
  { id: 2, name: "products" },
  { id: 3, name: "orders" },
  { id: 4, name: "user" },
  { id: 5, name: "signout" }
]

export const productTableTitle = [
  "ID",
  "Thumbnail",
  "Title",
  "Category",
  "Brand",
  "Price",
  "Stock",
  "Rating",
  "Status",
  "Actions",
]

// "Description",
//   "Discounted Price",
//   "Tags",
//   "SKU",
//   "Weight",
//   "Dimensions",
//   "Warrenty Information",
//   "Shipping Information",
//   "Availability Status",
//   "Review",
//   "Return Policy",
//   "Minimum Order Quantity",
//   "Meta Data",
//   "Images",