function PromoBanner(){
    return(
        // Promo banner 
        <section className="max-w-7xl mx-auto px-4">
        <div className="bg-linear-to-r from-primary to-heading text-white rounded-2xl px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
            <div>
                <p className="text-sm uppercase font-semibold tracking-wide text-white/80">Limited time</p>
                <h3 className="text-3xl font-bold">Extra 10% off selected categories</h3>
                <p className="text-white/80 text-sm mt-2">Apply MEGA10 at checkout. Valid on beauty, furniture, and groceries.</p>
            </div>
            <a href="#categories" className="bg-white text-primary font-semibold px-5 py-3 rounded-full hover:bg-background transition">
                Explore categories
            </a>
        </div>
    </section>
    )
}

export default PromoBanner