import { useEffect, useState } from 'react'
import { createProduct, deleteProduct, fetchProducts, updateProduct, type ProductInput } from '../../api/products'
import type { Product } from '../../types/product'
import { ProductForm } from '../../components/ProductForm/ProductForm'
import styles from './Admin.module.css'

type FormMode = { kind: 'closed' } | { kind: 'create' } | { kind: 'edit'; product: Product }

export function Admin() {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading')
  const [formMode, setFormMode] = useState<FormMode>({ kind: 'closed' })
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  async function handleCreate(input: ProductInput) {
    const created = await createProduct(input)
    setProducts((current) => [...current, created])
    setFormMode({ kind: 'closed' })
  }

  async function handleUpdate(id: string, input: ProductInput) {
    const updated = await updateProduct(id, input)
    setProducts((current) => current.map((product) => (product.id === id ? updated : product)))
    setFormMode({ kind: 'closed' })
  }

  async function handleDelete(id: string) {
    setDeleteError(null)
    setDeletingId(id)
    try {
      await deleteProduct(id)
      setProducts((current) => current.filter((product) => product.id !== id))
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete product.')
    } finally {
      setDeletingId(null)
      setConfirmDeleteId(null)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Manage Products</h1>
        {formMode.kind === 'closed' && (
          <button className={styles.addButton} onClick={() => setFormMode({ kind: 'create' })}>
            Add product
          </button>
        )}
      </div>

      {formMode.kind === 'create' && (
        <ProductForm
          submitLabel="Create product"
          onSubmit={handleCreate}
          onCancel={() => setFormMode({ kind: 'closed' })}
        />
      )}

      {formMode.kind === 'edit' && (
        <ProductForm
          initialProduct={formMode.product}
          submitLabel="Save changes"
          onSubmit={(input) => handleUpdate(formMode.product.id, input)}
          onCancel={() => setFormMode({ kind: 'closed' })}
        />
      )}

      {status === 'loading' && <p>Loading products...</p>}
      {status === 'error' && <p>Couldn't load products. Please try again later.</p>}

      {deleteError && (
        <p className={styles.deleteError} role="alert">
          {deleteError}
        </p>
      )}

      {status === 'ready' && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td className={styles.actionsCell}>
                    <button
                      className={styles.editButton}
                      onClick={() => setFormMode({ kind: 'edit', product })}
                    >
                      Edit
                    </button>
                    {confirmDeleteId === product.id ? (
                      <>
                        <button
                          className={styles.confirmDeleteButton}
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                        >
                          {deletingId === product.id ? 'Deleting...' : 'Confirm delete'}
                        </button>
                        <button className={styles.cancelButton} onClick={() => setConfirmDeleteId(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button className={styles.deleteButton} onClick={() => setConfirmDeleteId(product.id)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className={styles.empty}>
                    No products yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
