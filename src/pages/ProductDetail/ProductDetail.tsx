import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchProductById } from '../../api/products'
import type { Product } from '../../types/product'
import { useCart } from '../../context/CartContext'
import styles from './ProductDetail.module.css'

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading')

  useEffect(() => {
    if (!productId) {
      setStatus('ready')
      return
    }
    setStatus('loading')
    fetchProductById(productId)
      .then((data) => {
        setProduct(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [productId])

  if (status === 'loading') {
    return (
      <div className={styles.page}>
        <p>Loading product...</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className={styles.page}>
        <p>Couldn't load this product. Please try again later.</p>
        <Link to="/products">Back to all products</Link>
      </div>
    )
  }

  if (!product) {
    return (
      <div className={styles.page}>
        <p>We couldn't find that product.</p>
        <Link to="/products">Back to all products</Link>
      </div>
    )
  }

  const inStock = product.stock > 0

  function handleAddToCart() {
    addItem(product!, quantity)
    setAdded(true)
  }

  return (
    <div className={styles.page}>
      <button type="button" onClick={() => navigate(-1)} className={styles.back}>
        &larr; Back
      </button>
      <div className={styles.layout}>
        <img src={product.image} alt={product.name} width={480} height={480} className={styles.image} />
        <div className={styles.info}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={inStock ? styles.inStock : styles.outOfStock}>
            {inStock ? `In stock (${product.stock} available)` : 'Out of stock'}
          </p>

          {inStock && (
            <div className={styles.purchaseRow}>
              <label htmlFor="quantity" className={styles.quantityLabel}>
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                inputMode="numeric"
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(event) => {
                  const next = Number(event.target.value)
                  setQuantity(Math.min(Math.max(1, next || 1), product.stock))
                }}
                className={styles.quantityInput}
              />
              <button type="button" onClick={handleAddToCart} className={styles.addButton}>
                Add to cart
              </button>
            </div>
          )}

          {added && (
            <p role="status" className={styles.confirmation}>
              Added to cart. <Link to="/cart">View cart</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
