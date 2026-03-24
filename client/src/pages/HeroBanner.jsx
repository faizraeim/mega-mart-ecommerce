import MiniBar from "../components/MiniBar"
function HeroBanner(){
    return(
        //  Hero Banner
         <section className="bg-primary/10 text-heading">
         <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
             <div className="space-y-4">
                 <p className="text-primary font-semibold uppercase tracking-wide">New Season</p>
                 <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                     Discover deals across every category
                 </h1>
                 <p className="text-text text-sm md:text-base">
                     Handpicked products, fast delivery, and prices that stay fair. Browse top categories or jump straight to today’s best offers.
                 </p>
                 <div className="flex flex-wrap gap-3">
                     <a href="#featured" className="bg-primary text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-primary/90">Shop featured</a>
                     <a href="#categories" className="bg-white text-primary border border-primary px-5 py-3 rounded-full text-sm font-semibold hover:bg-primary/5">Browse categories</a>
                 </div>
                 <div className="flex gap-6 text-sm text-text pt-2">
                     <div><span className="font-bold text-heading">2k+</span> brands</div>
                     <div><span className="font-bold text-heading">50k+</span> products</div>
                     <div><span className="font-bold text-heading">4.8★</span> customer rating</div>
                 </div>
             </div>
             <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                 <MiniBar />
                 <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-text">
                     <div className="bg-background rounded-xl p-4">
                         <p className="font-semibold text-heading">Fast delivery</p>
                         <p>Track orders in real time across categories.</p>
                     </div>
                     <div className="bg-background rounded-xl p-4">
                         <p className="font-semibold text-heading">Secure payments</p>
                         <p>Protected checkout with trusted gateways.</p>
                     </div>
                     <div className="bg-background rounded-xl p-4">
                         <p className="font-semibold text-heading">Easy returns</p>
                         <p>Hassle-free returns on eligible items.</p>
                     </div>
                     <div className="bg-background rounded-xl p-4">
                         <p className="font-semibold text-heading">Top support</p>
                         <p>Chat and email support whenever you need.</p>
                     </div>
                 </div>
             </div>
         </div>
     </section>
    )
}

export default HeroBanner