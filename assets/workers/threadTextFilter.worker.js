// class FilterThreadText {
//     memory = {}
//     constructor ({ filter, threadText }) {}
//     // filter (threadText, filter) {
//     //     console.log(threadText)
//     // }
//     mine (items, memory, level = 0) {
//         items.forEach((element, index) => {
//             if (!this.hasMine(element, index, level, memory)) {
//                 delete items[index]
//                 return
//             }
//             this.mine(element, memory, level + 1)
//         })
//         this.memory = {}
//     }
//     hasMine ({ item, childrens }, id, level, memory) {
//         if (!memory[`${id}/${level}`]) {
//             memory[`${id}/${level}`] =
//                 item.mine ||
//                 (childrens.length > 0 &&
//                     childrens.some((el, index) => {
//                         return this.hasMine(el, index, level + 1, memory)
//                     }))
//         }
//         return memory[`${id}/${level}`]
//     }
// }
self.addEventListener('message', function ({ data }) {
    self.postMessage(data)
})
