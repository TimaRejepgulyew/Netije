export default class ThreadTextFilter {
    threadTextWorker = null
    constructor (ctx) {
        this.threadTextWorker = ctx.$worker.createWorker()
        if (this.threadTextWorker) {
        }
    }
    filter (data) {
        const threadText = JSON.parse(JSON.stringify([...data.threadText]))
        console.log(threadText)
        // this.threadTextWorker.postMessage(data)
        return new Promise(
            resolve => {
                const Filter = new FilterThreadText()
                const texts = Filter.filter(threadText)
                resolve(texts)
                // this.threadTextWorker.addEventListener('message', function ({
                //     data
                // }) {
                //     resolve(data)
                // })
            },
            reject => {
                // this.threadTextWorker.addEventListener('error', function (
                //     data
                // ) {
                //     console.error(data)
                //     reject(data)
                // })
            }
        )
    }
}

class FilterThreadText {
    constructor () {
        this.memory = {}
    }
    filter (threadText, filter = 1) {
        return this.mine(threadText, this.memory)
    }
    mine (items, memory, level = 0) {
        items.forEach((element, index) => {
            if (!this.hasMine(element, index, level, memory)) {
                items.splice(index, 1)
                return
            }
            if (element.children.length)
                this.mine(element.children, memory, level + 1)
        })
        this.memory = {}
        return items
    }
    hasMine (data, id, level, memory) {
        if (memory[`${id}/${level}`] === undefined) {
            const res =
                data.item.mine ||
                (!!data.children.length &&
                    data.children.some((el, index) => {
                        const data1 = this.hasMine(el, index, level + 1, memory)
                        console.log(index, level)
                        return data1
                    }))
            return res
            // (!!data.children.length &&
            //     data.children.some((el, index) => {
            //         const data1 = this.hasMine(el, index, level + 1, memory)
            //         console.log(index, level)
            //         return data1
            //     })) ||
            // data.item.mine

            // console.log(res, `${id}id ${level}level`)
            memory[`${id}/${level}`] = res
        }
        // return memory[`${id}/${level}`]
    }
}
