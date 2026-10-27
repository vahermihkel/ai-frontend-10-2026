import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const inStock = product.stock > 0

  return (
    <Link to={`/products/${product.id}`} className={styles.card}>
      <img src={product.image} alt={product.name} width={480} height={480} loading="lazy" className={styles.image} />
      <div className={styles.body}>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <p className={inStock ? styles.inStock : styles.outOfStock}>
          {inStock ? 'In stock' : 'Out of stock'}
        </p>
      </div>
    </Link>
  )
}
