import { useEffect, useState } from 'react'
import { fetchProducts } from '../../api/products'
import type { Product } from '../../types/product'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import styles from './Products.module.css'

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading')

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>All Products</h1>
      {status === 'loading' && <p>Loading products...</p>}
      {status === 'error' && <p>Couldn't load products. Please try again later.</p>}
      {status === 'ready' && (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
