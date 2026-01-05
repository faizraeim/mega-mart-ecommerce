import { bestDeal } from "../data/data"
import CapitalizeFirstLetter from "../utils/CapitalizeFirstLetter"
import { useServerData } from "../utils/ServerData"
import fallbackImage from "../img/fallback.png"
import { SlArrowRight } from "react-icons/sl"
import { Link } from "react-router-dom"


function ProductCategories({category}) {
    // server data comming for backend handled in custom hook
    const { data: serverData, loading, error } = useServerData()
    // error and loading handling
    if (loading) return <div className="flex space-x-4 max-w-7xl mx-auto border-y border-border py-6">Loading...</div>
    if (error) return <div className="flex space-x-4 max-w-7xl mx-auto border-y border-border py-6">Error: {error}</div>

    const bestProducts = serverData.filter(product => product.category === category)

    return (
        <div className="max-w-7xl mx-auto mt-20">
            <div className=" flex justify-between  border-b border-border">
                <p className="text-3xl font-bold text-text border-b-4 pb-4 border-primary" >{bestDeal.grab} <span className="text-primary">{CapitalizeFirstLetter(bestProducts[0].category)}</span></p>
                <Link to={`/category/${bestProducts[0].category}`} className="flex gap-2 items-center ">{bestDeal.viewAll}<span className="text-primary text-sm "> <SlArrowRight /> </span> </Link>
            </div>
            <div className="grid grid-cols-5 gap-4 bg-white ">
                {bestProducts.slice(0,5).map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                    <div className="bg-white border-2 border-border hover:border-primary hover:drop-shadow-2xl active:border-primary rounded-2xl mt-12 pb-4 cursor-pointer">
                        <div className="relative">
                            <img
                                src={product.images.length > 1 ? product.images[0] : product.images}
                                alt={product.title}
                                onError={(e) => {
                                    e.currentTarget.src = fallbackImage;
                                }}
                                className="bg-background rounded-t-2xl object-cover w-2xl h-2xl "
                            />
                            <p className="bg-primary w-14 h-15 font-semibold text-white flex text-center p-2 absolute top-0 right-0 rounded-tr-2xl rounded-bl-2xl  ">{Math.floor(product.discountPercentage)}% OFF</p>
                        </div>
                        <div className="px-4 ">
                            <p className="py-2 font-semibold">{product.title}</p>
                            <div className="flex space-x-4">

                                <p className="font-bold">${Math.floor(product.price)}</p>
                                <p className="line-through  ">${Math.floor((product.price) * (product.discountPercentage) / 100 + (product.price))}</p>
                            </div>
                            <p className=" text-green-600 font-semibold mt-2 border-t border-border pt-2">Save - ${Math.ceil((product.price) * (product.discountPercentage) / 100)}</p>
                        </div>
                    </div>
                    </Link>

                ))}
            </div>
        </div>
    )
}

export default ProductCategories