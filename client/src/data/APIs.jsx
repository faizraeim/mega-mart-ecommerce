import { useState, useEffect } from "react"

const API_BASE = import.meta.env.VITE_API_URL || "/api"

function APIs(){
    const [serverData, setServerData] = useState([])

    useEffect(() => {
        fetch(`${API_BASE}/products`)
            .then(response => response.json())
            .then(data => {
                // Handle both object with products property and direct array
                const productsArray = Array.isArray(data) ? data : (data.products || [])
                setServerData(productsArray)
            })
            .catch(error => console.error("Error fetching products:", error))
    }, [])

}

export default APIs