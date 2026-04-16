export const QUERY_KEYS = {
  products: {
    all: ['products'],
    list: (params) => ['products', 'list', params],
    detail: (id) => ['products', 'detail', id],
    popular: ['products', 'popular'],
    dailyBestSells: ['products', 'dailyBestSells'],
    deals: ['products', 'deals'],
    topSelling: ['products', 'topSelling'],
    trending: ['products', 'trending'],
    recentlyAdded: ['products', 'recentlyAdded'],
    topRated: ['products', 'topRated'],
  },
  categories: {
    all: ['categories'],
  },
  blogs: {
    all: ['blogs'],
    list: (params) => ['blogs', 'list', params],
    detail: (id) => ['blogs', 'detail', id],
  },
}
