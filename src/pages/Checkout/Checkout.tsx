import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from './Checkout.module.css'

export function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const [placed, setPlaced] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  if (items.length === 0 && !placed) {
    return <Navigate to="/cart" replace />
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    // Demo-only: no backend order/payment processing is wired up yet.
    // A real checkout must re-validate stock and totals server-side before charging.
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <div className={styles.page}>
        <h1>Thanks, {name.split(' ')[0] || 'there'}!</h1>
        <p>Your order has been placed. A confirmation would normally be emailed to {email}.</p>
        <Link to="/products">Continue shopping</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1>Checkout</h1>
      <div className={styles.layout}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="name" className={styles.label}>
            Full name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={styles.input}
          />

          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
          />

          <label htmlFor="address" className={styles.label}>
            Shipping address
          </label>
          <input
            id="address"
            name="address"
            autoComplete="street-address"
            required
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className={styles.input}
          />

          <p className={styles.disclaimer}>
            This is a demo checkout — no real payment is processed and no card details are collected.
          </p>

          <button type="submit" className={styles.submitButton}>
            Place order (${subtotal.toFixed(2)})
          </button>
        </form>

        <aside className={styles.summary}>
          <h2 className={styles.summaryHeading}>Order summary</h2>
          <ul className={styles.summaryList}>
            {items.map((item) => (
              <li key={item.product.id} className={styles.summaryItem}>
                <span>
                  {item.product.name} &times; {item.quantity}
                </span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className={styles.summaryTotal}>
            Subtotal: <strong>${subtotal.toFixed(2)}</strong>
          </p>
        </aside>
      </div>
    </div>
  )
}
