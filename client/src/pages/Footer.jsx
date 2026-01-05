import { AiOutlineWhatsApp } from 'react-icons/ai'
import { PiPhoneCall } from "react-icons/pi";
import appstore from '../img/appstore.png'
import playstore from '../img/playstore.png'
import { useServerData } from "../utils/ServerData";
import CapitalizeFirstLetter from "../utils/CapitalizeFirstLetter";
import { useState } from "react";
import { Link } from "react-router";
import { footerData } from "../data/data";

function Footer() {
    const { data: serverData, error, loading } = useServerData()

    if (loading) return <div className="flex space-x-4 max-w-7xl mx-auto border-y border-border py-6">Loading...</div>
    if (error) return <div className="flex space-x-4 max-w-7xl mx-auto border-y border-border py-6">Error: {error}</div>


    return (
        <div className="bg-primary text-white mt-20">
            <div className="flex max-w-7xl mx-auto p-16  justify-start">
                <div className="w-1/4">
                    <div>
                        <h1 className="text-5xl font-bold mb-6">{footerData.logo}</h1>
                        <p className="text-lg font-semibold">{footerData.contactUs}</p>
                    </div>
                    <div className="mt-2">
                        <p className="flex gap-2"><AiOutlineWhatsApp size={20} />{footerData.whatsapp}</p>
                        <p className="ml-6">{footerData.whatsappNumber}</p>
                    </div>
                    <div className="mt-2" >
                        <p className="flex gap-2"><PiPhoneCall size={20} />{footerData.call}</p>
                        <p className="ml-6">{footerData.phoneNumber}</p>
                    </div>
                    <div className="mt-4 ">
                        <p className="font-bold">{footerData.downloadApp}</p>
                        <div className="flex mt-4 gap-2 w-3xs h-15 ">
                            <img src={appstore} alt="Download from App Store" />
                            <img src={playstore} alt="Download from Play Store" />
                        </div>
                    </div>
                </div>

                <div className="flex w-3/4 justify-center gap-16">
                    <div className="">
                        <p className="text-xl font-semibold border-b-2 mb-6 pb-2">{footerData.category}</p>
                        {Array.from(new Set(serverData.map(product => product.category))).map((category, index) => (
                            <Link key={index} to={`/category/${category}`}>
                                <ul className="flex list-disc">
                                    <li className="mb-4">{CapitalizeFirstLetter(category)}</li>
                                </ul>
                            </Link>
                        ))}
                    </div>
                    <div>
                        <p className="text-xl font-semibold border-b-2 mb-6 pb-2">{footerData.servicesTitle}</p>
                        <ul className="list-disc">
                            {footerData.services.map((service, index) => (
                                <li className='mb-4' key={index}>{service}</li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>
            <div className="text-center text-xl font-light border-t py-6 border-t-blue-400 w-7xl m-auto">
                <p>&copy; {new Date().getFullYear()} All rights reserved. Reliance Retail Ltd.</p>
            </div>
        </div>
    )
}

export default Footer