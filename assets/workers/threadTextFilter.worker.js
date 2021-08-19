class FilterThreadText {
    constructor () {
        this.memory = {}
    }
    filter (threadText, filter = 1) {
        console.log(threadText)
        return this.mine(threadText, this.memory)
    }
    mine (items, memory, level = 0) {
        items.forEach((element, index) => {
            if (!this.hasMine(element, index, level, memory)) {
                delete items[index]
                return
            }
            this.mine(element, memory, level + 1)
        })
        this.memory = {}
        return items
    }
    hasMine (data, id, level, memory) {
        if (memory[`${id}/${level}` === undefined]) {
            memory[`${id}/${level}`] =
                data.item.mine ||
                (data.childrens &&
                    data.childrens.some((el, index) => {
                        return this.hasMine(el, index, level + 1, memory)
                    }))
        }
        return memory[`${id}/${level}`]
    }
}
self.addEventListener('message', function ({ data }) {
    console.log(data.threadText)
    const filterThreadText = new FilterThreadText()
    const texts = filterThreadText.filter(data.threadText)
    console.log(texts)
    self.postMessage(texts)
})
