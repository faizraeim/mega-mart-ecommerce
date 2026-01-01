import { useState, useEffect } from "react"

function APIs(){
    const [serverData, setServerData] = useState([])

    useEffect(() => {
        fetch("/api/products")
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