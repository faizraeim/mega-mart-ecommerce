function ServiceHighlights(){
    return(
        //  Service highlights strip
         <section className="max-w-7xl mx-auto px-4">
         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {[
                 { title: "Free delivery", desc: "On select categories above $50" },
                 { title: "24/7 support", desc: "Chat and mail help anytime" },
                 { title: "Secure checkout", desc: "Protected payments and wallets" },
                 { title: "Easy returns", desc: "Hassle-free on eligible items" },
             ].map((item, idx) => (
                 <div key={idx} className="bg-white border border-border rounded-2xl p-4 shadow-sm">
                     <p className="font-semibold text-heading">{item.title}</p>
                     <p className="text-sm text-text mt-1">{item.desc}</p>
                 </div>
             ))}
         </div>
     </section>
    )
}

export default ServiceHighlights