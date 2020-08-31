import DocumentType from "~/infrastructure/models/DocumentType.js";
import { createDocument } from "~/infrastructure/services/documentService.js";
import toRouter from "~/infrastructure/services/toRouterDetail.js";
async function create(context, params) {
  const { documentTypeGuid, documentId } = await createDocument(
    context,
    params
  );
  const route = `/document-module/detail/${documentTypeGuid}/${documentId}`;
  let replaceOldRoute = false;
  if (context.$route.name.includes("document-module-detail-type-id")) {
    replaceOldRoute =
      context.$store.getters[`tasks/${context.$route.params.id}/isNew`];
  } else {
    replaceOldRoute = false;
  }
  toRouter(context, { route, replaceOldRoute });
  return { documentTypeGuid, documentId };
}
export default class DocumentCreateButton extends DocumentType {
  init() {
    for (let element in this.elements) {
      this.elements[element].create = async context => {
        const { documentTypeGuid, documentId } = await create(context, {
          documentType: +element
        });
        return { documentTypeGuid, documentId };
      };
    }
    return this;
  }
}
