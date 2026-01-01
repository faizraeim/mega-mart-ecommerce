import { useState, useEffect } from "react"

/**
 * Custom hook to fetch products from the server
 * @returns {Object} { data, loading, error }
 */
export function useServerData() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetch("/api/products")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                // Handle both object with products property and direct array
                const productsArray = Array.isArray(data) ? data : (data.products || [])
                setData(productsArray)
                setError(null)
            })
            .catch(error => {
                console.error("Error fetching products:", error)
                setError(error.message)
                setData([])
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return { data, loading, error }
}