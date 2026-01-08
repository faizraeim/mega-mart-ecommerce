import { AiOutlineWhatsApp } from 'react-icons/ai'
import { PiPhoneCall } from "react-icons/pi";
import appstore from '/assets/appstore.png'
import playstore from '/assets/playstore.png'
import { useServerData } from "../utils/ServerData";
import CapitalizeFirstLetter from "../utils/CapitalizeFirstLetter";
import { useState } from "react";
import { Link } from "react-router-dom";
import { footerData } from "../data/data";

function Footer() {
    const { data: serverData, error, loading } = useServerData()

    if (loading) return <div className="flex space-x-4 max-w-7xl mx-auto border-y border-border py-6">Loading...</div>
    if (error) return <div className="flex space-x-4 max-w-7xl mx-auto border-y border-border py-6">Error: {error}</div>


    const categories = Array.from(new Set(serverData.map(product => product.category)))

    return (
        <div className="bg-primary text-white mt-20">
            <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">{footerData.logo}</h1>
                    <p className="text-lg font-semibold">{footerData.contactUs}</p>
                    <div className="space-y-2 text-sm">
                        <p className="flex gap-2 items-center"><AiOutlineWhatsApp size={18} />{footerData.whatsapp}</p>
                        <p className="ml-6 text-white/80">{footerData.whatsappNumber}</p>
                        <p className="flex gap-2 items-center"><PiPhoneCall size={18} />{footerData.call}</p>
                        <p className="ml-6 text-white/80">{footerData.phoneNumber}</p>
                    </div>
                    <div className="pt-2">
                        <p className="font-bold">{footerData.downloadApp}</p>
                        <div className="flex mt-3 gap-2 w-40">
                            <img src={appstore} alt="Download from App Store" className="h-10 object-contain" />
                            <img src={playstore} alt="Download from Play Store" className="h-10 object-contain" />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-xl font-semibold border-b border-white/20 pb-2">{footerData.category}</p>
                    <div className="grid grid-cols-1 gap-2 text-white/90">
                        {categories.map((category, index) => (
                            <Link key={index} to={`/category/${category}`} className="hover:underline">
                                {CapitalizeFirstLetter(category)}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-xl font-semibold border-b border-white/20 pb-2">{footerData.servicesTitle}</p>
                    <ul className="space-y-2 text-white/90">
                        {footerData.services.map((service, index) => (
                            <li key={index}>{service}</li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-3">
                    <p className="text-xl font-semibold border-b border-white/20 pb-2">Stay in touch</p>
                    <p className="text-white/80 text-sm">Get updates on new drops, deals, and category highlights.</p>
                    <form className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="px-3 py-2 rounded-md text-white border-white/50 border"
                        />
                        <button type="submit" className="bg-background text-primary font-semibold py-2 rounded-md hover:bg-primary hover:text-white hover:border">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div className="text-center text-sm font-light border-t border-white/10 py-6 px-4">
                <p>&copy; {new Date().getFullYear()} All rights reserved. Reliance Retail Ltd.</p>
            </div>
        </div>
    )
}

export default Footer