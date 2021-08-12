export default class ThreadTextFilter {
    threadTextWorker = null
    constructor (ctx) {
        this.threadTextWorker = ctx.$worker.createWorker()
        if (this.threadTextWorker) {
        }
    }
    filter (data) {
        this.threadTextWorker.postMessage(data)
        return new Promise(
            resolve => {
                this.threadTextWorker.addEventListener('message', function ({
                    data
                }) {
                    resolve(data)
                })
            },
            reject => {
                this.threadTextWorker.addEventListener('error', function (
                    data
                ) {
                    console.error(data)
                    reject(data)
                })
            }
        )
    }
}
