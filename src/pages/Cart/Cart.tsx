import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from './Cart.module.css'

export function Cart() {
  const { items, subtotal, setQuantity, removeItem } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <h1>Your cart is empty</h1>
        <Link to="/products">Browse products</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1>Your Cart</h1>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.product.id} className={styles.item}>
            <img
              src={item.product.image}
              alt={item.product.name}
              width={80}
              height={80}
              className={styles.thumb}
            />
            <div className={styles.details}>
              <Link to={`/products/${item.product.id}`} className={styles.name}>
                {item.product.name}
              </Link>
              <p className={styles.unitPrice}>${item.product.price.toFixed(2)} each</p>
            </div>
            <label className={styles.quantityField}>
              <span className={styles.srOnly}>Quantity for {item.product.name}</span>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={item.product.stock}
                value={item.quantity}
                onChange={(event) =>
                  setQuantity(item.product.id, Math.min(Number(event.target.value) || 1, item.product.stock))
                }
                className={styles.quantityInput}
              />
            </label>
            <p className={styles.lineTotal}>${(item.product.price * item.quantity).toFixed(2)}</p>
            <button
              type="button"
              onClick={() => removeItem(item.product.id)}
              className={styles.removeButton}
              aria-label={`Remove ${item.product.name} from cart`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.summary}>
        <p className={styles.subtotal}>
          Subtotal: <strong>${subtotal.toFixed(2)}</strong>
        </p>
        <p className={styles.note}>Final total, including tax and shipping, is confirmed at checkout.</p>
        <button type="button" className={styles.checkoutButton} onClick={() => navigate('/checkout')}>
          Proceed to checkout
        </button>
      </div>
    </div>
  )
}
