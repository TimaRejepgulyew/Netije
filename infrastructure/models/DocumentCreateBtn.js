import DocumentType from "~/infrastructure/models/DocumentType.js";
import { createDocument } from "~/infrastructure/services/documentService.js";
import toRouter from "~/infrastructure/services/toRouterDetail.js";
async function create(context, params) {
  const { documentTypeGuid, documentId } = await createDocument(
    context,
    params
  );
  const route = `/document-module/detail/${documentTypeGuid}/${documentId}`;
  const replaceOldRoute =
    context.$store.getters[`documents/${documentId}/isNew`];
  toRouter(context, { route, replaceOldRoute });
}
export default class DocumentCreateButton extends DocumentType {
  init() {
    for (let element in this.elements) {
      console.log(element);
      this.elements[element].create = context =>
        create(context,{ documentType: +element });
    }
    return this;
  }
}
