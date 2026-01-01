import { Link } from "react-router-dom"
import CapitalizeFirstLetter from '../utils/CapitalizeFirstLetter'
import { useServerData } from '../utils/ServerData'

function Categories() {
    const { data: serverData, loading, error } = useServerData()

    if (loading) return <div className="flex space-x-4 max-w-7xl mx-auto border-y border-border py-6">Loading...</div>
    if (error) return <div className="flex space-x-4 max-w-7xl mx-auto border-y border-border py-6">Error: {error}</div>

    return (
        <div className="flex space-x-4 max-w-7xl mx-auto border-y border-border py-6">
            {Array.from(new Set(serverData.map(product => product.category))).map((category, index) => (
                <Link key={index} to={`/category/${category}`}>
                    <div className="flex">
                        <p className="bg-primary/5 rounded-full px-5 py-2 hover:bg-primary hover:text-white">{CapitalizeFirstLetter(category)}</p>
                    </div>
                </Link>
             ))}
        </div>
    )
}

export default Categories