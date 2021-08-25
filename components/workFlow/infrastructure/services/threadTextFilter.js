export default class ThreadTextFilter {
    threadTextWorker = null
    constructor (ctx) {
        this.threadTextWorker = ctx.$worker.createWorker()
        if (this.threadTextWorker) {
        }
    }
    filter (data) {
        const threadText = JSON.parse(JSON.stringify([...data.threadText]))
        this.threadTextWorker.postMessage({ threadText, filter: data.filter })
        return new Promise(
            resolve => {
                this.threadTextWorker.addEventListener('message', function ({
                    data
                }) {
                    resolve(data)
                })
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
