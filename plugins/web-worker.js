import threadTextFilterWorker from '~/assets/workers/threadTextFilter.worker.js'

export default (context, inject) => {
    inject('worker', {
        createWorker () {
            return new threadTextFilterWorker()
        }
    })
}
