export default function() {
  return {
    async createDocument(context, params) {
      await context.$store.dispatch("currentDocument/initDocument", params);
    },
    async createTask(context, params) {
      await context.$store.dispatch("currenttask/initTask", params);
    }
  };
}
