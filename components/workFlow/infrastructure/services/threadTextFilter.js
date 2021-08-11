export default class ThreadTextFilter {
    threadTextWorker = 'Test'
    constructor() {
        this.threadTextWorker = new Worker("./workers/threadTextFilter.js")
        if (this.threadTextWorker) {
            console.log(this.threadTextWorker, 'worker');
        }
    }

    filter({ threadText, filter }) {
        this.threadTextWorker.postMessage({ threadText, filter })
        return new Promise(
            (resolve) => {
                this.threadTextWorker.onmessage = ("filtered", (threadText) => {
                    resolve(threadText)
                    console.log(threadText);
                })
            },
            (reject) => {
                this.threadTextWorker.onerror = ("error", (threadText) => {
                    reject(threadText)
                    console.log(threadText);
                })
            })
    }
}