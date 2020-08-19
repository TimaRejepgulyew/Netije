export async function createDocument(context, params) {
  await context.$store.dispatch("currentDocument/initNewDocument", params);
}

