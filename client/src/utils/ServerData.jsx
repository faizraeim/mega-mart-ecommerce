import { useState, useEffect } from "react"

const API_BASE = import.meta.env.VITE_API_URL || "/api"

export function useServerData() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

     useEffect( () => {
        const controller = new AbortController()
        setLoading(true)
        fetch(`${API_BASE}/products`, { signal: controller.signal })
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
                if (error.name === "AbortError") return
                console.error("Error fetching products:", error)
                setError(error.message)
                setData([])
            })
            .finally(() => {
                setLoading(false)
            })
        return () => controller.abort()
    }, [])

    return { data, loading, error }
}

export function useProduct(id) {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect( () => {
        if (!id) return
        const controller = new AbortController()
        setLoading(true)
        fetch(`${API_BASE}/product/${id}`, { signal: controller.signal })
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
                if (error.name === "AbortError") return
                console.error("Error fetching product:", error)
                setError(error.message)
                setProduct(null)
            })
            .finally(() => {
                setLoading(false)
            })
        return () => controller.abort()
    }, [id])

    return { product, loading, error }
}