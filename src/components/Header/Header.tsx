import { NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from './Header.module.css'

export function Header() {
  const { itemCount } = useCart()

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        Aurora Shop
      </NavLink>
      <nav className={styles.nav}>
        <NavLink to="/products" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
          Products
        </NavLink>
        <NavLink to="/admin" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
          Admin
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          aria-label={`Cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
        >
          Cart{itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
        </NavLink>
      </nav>
    </header>
  )
}
