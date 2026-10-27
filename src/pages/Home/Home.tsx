import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../../api/products'
import type { Product } from '../../types/product'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import styles from './Home.module.css'

export function Home() {
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

  const featured = products.slice(0, 3)

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1>Good gear, honestly priced.</h1>
        <p className={styles.subtitle}>Everyday essentials for home, desk, and travel.</p>
        <Link to="/products" className={styles.cta}>
          Shop all products
        </Link>
      </section>

      <section className={styles.featured}>
        <h2 className={styles.heading}>Featured</h2>
        {status === 'loading' && <p>Loading products...</p>}
        {status === 'error' && <p>Couldn't load products. Please try again later.</p>}
        {status === 'ready' && (
          <div className={styles.grid}>
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
