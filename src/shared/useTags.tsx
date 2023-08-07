import { AxiosResponse } from 'axios'
import { onMounted, ref } from 'vue'

type Fetcher = (page: number) => Promise<AxiosResponse<Resources<Tag>>>
export const useTags = (fetcher: Fetcher) => {
  const page = ref(0)
  const hasMore = ref(false)
  const tags = ref<Tag[]>([])
  const fetchTags = async () => {
    const response = await fetcher(page.value)
    const { resources, page: pageNum, per, count } = response.data
    tags.value.push(...resources)
    hasMore.value = (Number(pageNum) - 1) * per + resources.length < count
    page.value += 1
  }
  onMounted(fetchTags)
  return { page, hasMore, tags, fetchTags }
}
