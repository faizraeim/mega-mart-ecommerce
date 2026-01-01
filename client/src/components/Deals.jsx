import { useEffect, useState } from 'react'
import fallbackimage from '../img/fallback.png'
import CapitalizeFirstLetter from "../utils/CapitalizeFirstLetter"
import { useServerData } from "../utils/ServerData"

function Deals() {
	const { data: serverData, loading, error } = useServerData()
	const [currentIndex, setCurrentIndex] = useState(0)

	// loading and error handling
	if (loading) return <div className="flex max-w-7xl mx-auto gap-6 overflow-auto my-6">Loading...</div>
	if (error) return <div className="flex max-w-7xl mx-auto gap-6 overflow-auto my-6">Error: {error}</div>

	// filters for maping the current condition data
	const dealsProducts = serverData.filter(product => product.discountPercentage > 14)

	// navigation handlers
	const handlePrevious = () => {
		setCurrentIndex(prev => prev === 0 ? dealsProducts.length - 1 : prev - 1)
	}

	const handleNext = () => {
		setCurrentIndex(prev => prev === dealsProducts.length - 1 ? 0 : prev + 1)
	}

	// if no deal was there do not render
	if (dealsProducts.length === 0) {
		return <div className='text-center py-8'>Leading deals...</div>
	}

	const currentProduct = dealsProducts[currentIndex]

	return (
		<div className="max-w-7xl mx-auto my-6">
			<div className="relative bg-blue-950 text-white rounded-2xl px-20 py-8">
				{/* Previous Button */}
				<button
					onClick={handlePrevious}
					className="absolute -left-12 top-1/2 -translate-y-1/2 bg-bgthree border-8 border-white text-primary w-25 h-25 rounded-full hover:bg-gray-200 transition"
				>
					❮
				</button>

				<div className="flex items-center justify-between">
					<div>
						<p className="text-3xl font-bold">
							{`Best Deal Online on ${CapitalizeFirstLetter(currentProduct.category)}`}
						</p>
						<p className="text-5xl font-bold my-4">
							{currentProduct.title}
						</p>
						<p className="text-3xl">
							{`Up to ${Math.round(currentProduct.discountPercentage)}% OFF`}
						</p>
					</div>
					<div>
						<img
							src={currentProduct.thumbnail || fallbackimage}
							alt={currentProduct.title}
							className="w-60 h-60 object-contain"
						/>
					</div>
				</div>

				{/* Next Button */}
				<button
					onClick={handleNext}
					className="absolute -right-12 top-1/2 -translate-y-1/2 bg-bgthree border-8 border-white text-primary w-25 h-25 rounded-full hover:bg-blue-100 transition"
				>
					❯
				</button>


				{/* Dot Indicators */}
				<div className="flex justify-start gap-2 mt-6">
					{dealsProducts.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={`w-3 h-2 rounded-full transition ${index === currentIndex ? 'bg-white w-6' : 'bg-gray-500'
								}`}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Deals