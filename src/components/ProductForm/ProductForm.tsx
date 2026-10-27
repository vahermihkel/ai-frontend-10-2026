import { useState, type FormEvent } from 'react'
import type { ProductInput } from '../../api/products'
import type { Product } from '../../types/product'
import styles from './ProductForm.module.css'

interface ProductFormProps {
  initialProduct?: Product
  submitLabel: string
  onSubmit: (input: ProductInput) => Promise<void>
  onCancel: () => void
}

export function ProductForm({ initialProduct, submitLabel, onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState(initialProduct?.name ?? '')
  const [description, setDescription] = useState(initialProduct?.description ?? '')
  const [price, setPrice] = useState(initialProduct ? String(initialProduct.price) : '')
  const [image, setImage] = useState(initialProduct?.image ?? '')
  const [stock, setStock] = useState(initialProduct ? String(initialProduct.stock) : '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        image: image.trim(),
        stock: Number(stock),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="product-name" className={styles.label}>
          Name
        </label>
        <input
          id="product-name"
          name="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="product-description" className={styles.label}>
          Description
        </label>
        <textarea
          id="product-description"
          name="description"
          required
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={styles.textarea}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="product-price" className={styles.label}>
            Price ($)
          </label>
          <input
            id="product-price"
            name="price"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            required
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="product-stock" className={styles.label}>
            Stock
          </label>
          <input
            id="product-stock"
            name="stock"
            type="number"
            inputMode="numeric"
            min="0"
            step="1"
            required
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="product-image" className={styles.label}>
          Image URL
        </label>
        <input
          id="product-image"
          name="image"
          type="url"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          className={styles.input}
        />
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.actions}>
        <button type="submit" className={styles.submitButton} disabled={submitting}>
          {submitting ? 'Saving...' : submitLabel}
        </button>
        <button type="button" className={styles.cancelButton} onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  )
}
