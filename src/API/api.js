import axios from 'axios'

const BASE_URL = import.meta.env.VITE_SUPABASE_URL

export function buildSupabaseUrl(table, options = {}) {
  const {
    filters = {},
    select = '*',
    order,
    limit,
    offset,
    textSearch,
    rangeGte,
    rangeLte,
  } = options

  const params = []

  params.push(`select=${select}`)

  Object.entries(filters).forEach(([column, value]) => {
    if (value === null || value === undefined) return
    if (typeof value === 'boolean') {
      params.push(`${column}=eq.${value}`)
    } else if (typeof value === 'number') {
      params.push(`${column}=eq.${value}`)
    } else {
      params.push(`${column}=eq.${encodeURIComponent(value)}`)
    }
  })

  if (rangeGte) params.push(`${rangeGte.column}=gte.${rangeGte.value}`)
  if (rangeLte) params.push(`${rangeLte.column}=lte.${rangeLte.value}`)

  if (textSearch) {
    params.push(`${textSearch.column}=ilike.*${encodeURIComponent(textSearch.query)}*`)
  }

  if (order)             params.push(`order=${order}`)
  if (limit !== undefined)  params.push(`limit=${limit}`)
  if (offset !== undefined) params.push(`offset=${offset}`)

  return `${BASE_URL}/rest/v1/${table}?${params.join('&')}`
}

const axiosClient = axios.create({
  headers: {
    apikey: import.meta.env.VITE_SUPABASE_KEY,
    Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'count=exact',
  },
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error?.response?.data || error.message)
    return Promise.reject(error)
  }
)

export async function fetchCategories() {
  const url = buildSupabaseUrl('categories', {
    select: 'id,name,slug',
    order: 'id.asc',
  })
  const response = await axiosClient.get(url)
  return response.data
}

const CARD_FIELDS =
  'id,name,slug,price,old_price,image_url,brand,weight,stock,rating,review_count,is_featured,is_new,is_sale,categories(name,slug)'

export async function fetchProducts({
  categoryId,
  order = 'id.asc',
  limit = 12,
  offset = 0,
  textSearch,
  rangeGte,
  rangeLte,
} = {}) {
  const filters = {}
  if (categoryId) filters.category_id = categoryId

  const url = buildSupabaseUrl('products', {
    select: CARD_FIELDS,
    filters,
    rangeGte,
    rangeLte,
    textSearch,
    order,
    limit,
    offset,
  })
  const response = await axiosClient.get(url)
  const contentRange = response.headers['content-range']
  const total = contentRange ? parseInt(contentRange.split('/')[1]) : 0
  return { data: response.data, total }
}

export async function fetchProductById(id) {
  const url = buildSupabaseUrl('products', {
    select: '*,categories(name,slug)',
    filters: { id },
    limit: 1,
  })
  const response = await axiosClient.get(url)
  return response.data[0] ?? null
}

export async function fetchPopularProducts(limit = 10) {
  const url = buildSupabaseUrl('products', {
    select: CARD_FIELDS,
    filters: { is_featured: true },
    order: 'rating.desc',
    limit,
  })
  const response = await axiosClient.get(url)
  return response.data
}

export async function fetchDailyBestSells(limit = 8) {
  const url = buildSupabaseUrl('products', {
    select: CARD_FIELDS,
    filters: { is_sale: true },
    order: 'rating.desc',
    limit,
  })
  const response = await axiosClient.get(url)
  return response.data
}

export async function fetchDeals(limit = 4) {
  const url = buildSupabaseUrl('products', {
    select: CARD_FIELDS,
    filters: { is_sale: true },
    order: 'review_count.desc',
    limit,
  })
  const response = await axiosClient.get(url)
  return response.data
}

export async function fetchTopSelling(limit = 3) {
  const url = buildSupabaseUrl('products', {
    select: CARD_FIELDS,
    filters: { is_featured: true },
    order: 'review_count.desc',
    limit,
  })
  const response = await axiosClient.get(url)
  return response.data
}

export async function fetchTrending(limit = 3) {
  const url = buildSupabaseUrl('products', {
    select: CARD_FIELDS,
    filters: { is_new: true },
    order: 'rating.desc',
    limit,
  })
  const response = await axiosClient.get(url)
  return response.data
}

export async function fetchRecentlyAdded(limit = 3) {
  const url = buildSupabaseUrl('products', {
    select: CARD_FIELDS,
    order: 'created_at.desc',
    limit,
  })
  const response = await axiosClient.get(url)
  return response.data
}

export async function fetchTopRated(limit = 3) {
  const url = buildSupabaseUrl('products', {
    select: CARD_FIELDS,
    order: 'rating.desc',
    limit,
  })
  const response = await axiosClient.get(url)
  return response.data
}

export async function createProduct(productData) {
  const url = `${BASE_URL}/rest/v1/products`
  const response = await axiosClient.post(url, productData, {
    headers: {
      'Prefer': 'return=representation'
    }
  })
  return response.data[0]
}

export async function deleteProduct(id) {
  const url = `${BASE_URL}/rest/v1/products?id=eq.${id}`
  console.log('Deleting product at:', url)
  const response = await axiosClient.delete(url, {
    headers: {
      'Prefer': 'return=representation'
    }
  })
  return response.data
}
