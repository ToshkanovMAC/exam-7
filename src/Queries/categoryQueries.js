import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../API/api'
import { QUERY_KEYS } from '../Config/keys'

export function useCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.categories.all,
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
  })
}
