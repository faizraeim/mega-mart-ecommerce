import { miniBar } from "../data/data"
import { CiDeliveryTruck, CiLocationOn, CiDiscount1 } from "react-icons/ci";

function MiniBar(){
return(
    <div className="bg-background">
        {/* welcome message on left */}
    <div className=" text-text text-sm flex items-center justify-between mx-auto max-w-7xl py-2">
        <div className="flex text-text">
            <p>{miniBar.greeting}</p>
        </div>
        {/* delivery details on right */}
        <div className="flex gap-4">
            <p className="flex text-text gap-2 border-r px-2 border-line "><span className="text-primary"><CiLocationOn size={20}/> </span>{miniBar.deliver}</p>
            <p className="flex gap-2 border-r px-2 border-line"><CiDeliveryTruck size={20} className="text-primary" />{miniBar.track}</p>
            <p className="flex gap-2"><CiDiscount1 size={20} className="text-primary" />{miniBar.offer}</p>
        </div>
    </div>
    </div>
)
}

export default MiniBar