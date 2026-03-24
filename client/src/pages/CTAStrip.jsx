function CTAStrip() {
    return (

        // Trust / CTA strip 
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-heading text-white rounded-2xl px-8 py-10 grid md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                    <p className="text-primary font-semibold uppercase tracking-wide">Stay in the loop</p>
                    <h2 className="text-3xl font-bold">Get early access to drops and deals</h2>
                    <p className="text-sm text-white/80">Subscribe for curated picks, category highlights, and exclusive coupons.</p>
                </div>
                <form className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="flex-1 px-4 py-3 rounded-full text-heading"
                    />
                    <button type="submit" className="bg-primary px-6 py-3 rounded-full font-semibold hover:bg-primary/90">
                        Notify me
                    </button>
                </form>
            </div>
        </section>
    )
}
export default CTAStrip