import { ref } from 'vue'

const loading = ref(false)

export function useLoading (val) {
  loading.value = val
  return [
    loading,
    val => loading.value = val
  ]
}
