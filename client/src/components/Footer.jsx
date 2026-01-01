import { footer } from "../data/data"
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { PiPhoneCall } from "react-icons/pi";

function Footer() {
    return (
        <div className="bg-primary text-white">
            <div className="max-w-7xl mx-auto py-12">
                <div>
                    <h1 className="text-5xl font-bold mb-6">{footer.logo}</h1>
                    <p className="text-lg font-semibold">{footer.contactUs}</p>
                </div>
                <div className="">
                    <p className="flex gap-2"><AiOutlineWhatsApp />{footer.whatsapp}</p>
                    <p>{footer.whatsappNumber}</p>
                </div>
                <div>
                    <p><PiPhoneCall />{footer.call}</p>
                    <p>{footer.phoneNumber}</p>
                </div>
                <div>
                    <p>{footer.downloadApp}</p>
                </div>
            </div>
        </div>
    )
}

export default Footer