export async function createDocument(context, params) {
  await context.$store.dispatch("currentDocument/initNewDocument", params);
}
export async function createTask(context, params) {
  await context.$store.dispatch("currentTask/initTask", params);
}
