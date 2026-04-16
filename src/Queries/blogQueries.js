import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../Config/keys'

async function fetchBlogs() { return [] }
async function fetchBlogById() { return null }

export function useBlogs(params = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.blogs.list(params),
    queryFn: () => fetchBlogs(params),
    keepPreviousData: true,
  })
}

export function useBlog(id) {
  return useQuery({
    queryKey: QUERY_KEYS.blogs.detail(id),
    queryFn: () => fetchBlogById(id),
    enabled: !!id,
  })
}
