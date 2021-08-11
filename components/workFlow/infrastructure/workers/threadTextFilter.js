self.onmessage = ("filter", ({ threadText, filter }) => {
    console.log(filter, threadText);
    self.postMessage(threadText)
})