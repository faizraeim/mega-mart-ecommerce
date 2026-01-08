import { useState, useEffect } from "react"

// Fetch all products
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

// Fetch single product by id
export function useProduct(id) {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) return
        setLoading(true)
        fetch(`/api/products/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                setProduct(data)
                setError(null)
            })
            .catch(error => {
                console.error("Error fetching product:", error)
                setError(error.message)
                setProduct(null)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    return { product, loading, error }
}