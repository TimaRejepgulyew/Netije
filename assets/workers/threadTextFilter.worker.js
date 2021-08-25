import FilterText from '~/components/workflow/infrastructure/constants/filterText/index'
export class FilterThreadText {
    constructor () {}
    filter (threadText, filter = FilterText.Mine) {
        if (filter === FilterText.All) {
            return threadText
        }
        return this.find(threadText, filter)
    }
    hasFilter (items, filter, index, level = 0) {
        switch (filter) {
            case FilterText.Mine:
                return this.hasMine(items, index, level)
            case FilterText.InProcess:
                return this.inProcess(items, index, level)
            case FilterText.Expired:
                return this.isExpired(items, index, level)
            case FilterText.HasBody:
                return this.hasBody(items, index, level)
        }
    }
    find (items, filter, level = 0) {
        const arr = []
        items.forEach((element, index) => {
            if (this.hasFilter(element, filter, index, level)) {
                if (element.children.length) {
                    element.children = this.find(
                        element.children,
                        filter,
                        level + 1
                    )
                }
                arr.push(element)
            }
        })
        return arr
    }
    hasMine (data, id, level) {
        const res =
            data.item.mine ||
            data.children.some((el, index) => {
                return this.hasMine(el, index, level + 1)
            })
        return res
    }
    hasBody (data, id, level) {
        const res =
            data.item.hasBody ||
            data.children.some((el, index) => {
                return this.hasBody(el, index, level + 1)
            })
        return res
    }
    inProcess (data, id, level) {
        const res =
            data.item.inProcess ||
            data.children.some((el, index) => {
                return this.inProcess(el, index, level + 1)
            })
        return res
    }
    isExpired (data, id, level) {
        const res =
            data.item.isExpired ||
            data.children.some((el, index) => {
                return this.isExpired(el, index, level + 1)
            })
        return res
    }
}
self.addEventListener('message', function ({ data }) {
    const filterThreadText = new FilterThreadText()
    console.log(data)
    const texts = filterThreadText.filter(data.threadText, data.filter)
    self.postMessage(texts)
})
