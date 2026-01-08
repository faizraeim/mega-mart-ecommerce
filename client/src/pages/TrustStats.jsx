function TrustStats(){
    return(
        //  Trust stats
          <section className="max-w-7xl mx-auto px-4">
          <div className="bg-white border border-border rounded-2xl p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-heading">
              {[
                  { value: "2k+", label: "Brands onboard" },
                  { value: "50k+", label: "Products curated" },
                  { value: "4.8★", label: "Average rating" },
                  { value: "99%", label: "On-time deliveries" },
              ].map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-text text-sm">{stat.label}</p>
                  </div>
              ))}
          </div>
      </section>
    )
}

export default TrustStats