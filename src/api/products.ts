import type { Product } from '../types/product'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export type ProductInput = Omit<Product, 'id'>

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json()
    if (typeof body?.message === 'string' && body.message.length > 0) {
      return body.message
    }
  } catch {
    // response had no JSON body
  }
  return `Request failed (${response.status} ${response.statusText})`
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/api/products`)
  if (!response.ok) {
    throw new Error('Failed to load products')
  }
  return response.json()
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  const response = await fetch(`${API_URL}/api/products/${id}`)
  if (!response.ok) {
    throw new Error('Failed to load product')
  }
  const product = await response.json()
  return product ?? undefined
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const response = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response))
  }
  return response.json()
}

export async function updateProduct(id: string, input: ProductInput): Promise<Product> {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response))
  }
  return response.json()
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response))
  }
}
