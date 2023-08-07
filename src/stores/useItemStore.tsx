import { defineStore } from 'pinia'
import { http } from '../shared/Http'

type State = {
  items: Item[]
  hasMore: boolean
  page: number
}
type Actions = {
  _fetch: (firstPage: boolean, startDate?: string, endDate?: string) => void
  fetchItems: (startDate?: string, endDate?: string) => void
  fetchNextPage: (startDate?: string, endDate?: string) => void
}
export const useItemStore = (id: string | (string | undefined)[]) =>
  defineStore<string, State, {}, Actions>(typeof id === 'string' ? id : id.join('-'), {
    state: () => ({
      items: [],
      hasMore: false,
      page: 0
    }),
    actions: {
      async _fetch(firstPage, startDate, endDate) {
        if (!startDate || !endDate) {
          return
        }
        const response = await http.get<Resources<Item>>(
          '/items',
          {
            happened_after: `${startDate} 00:00:00`,
            happened_before: `${endDate} 23:59:59`,
            page: firstPage ? 1 : this.page + 1
          },
          {
            _mock: 'itemIndex',
            _autoLoading: true
          }
        )
        const { resources, page, per, count } = response.data
        if (firstPage) {
          this.items = resources
        } else {
          this.items.push(...resources)
        }
        this.hasMore = (Number(page) - 1) * per + resources.length < count
        this.page += 1
      },
      async fetchNextPage(startDate, endDate) {
        this._fetch(false, startDate, endDate)
      },
      async fetchItems(startDate, endDate) {
        this._fetch(true, startDate, endDate)
      }
    }
  })()
