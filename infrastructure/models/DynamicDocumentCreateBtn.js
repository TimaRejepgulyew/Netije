import { createDocument } from "~/infrastructure/services/documentService.js";
import DynamicTypeControler from "~/components/document-module/dynamic-document/infrastructure/services/DynamicTypeControler.js";
import toRouter from "~/infrastructure/services/toRouterDetail.js";

async function create(context, params) {
  const { documentTypeGuid, documentId } = await createDocument(
    context,
    params
  );
  await DynamicTypeControler.generateStore(context, params.documentTypeId);
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

export class DynamicDocumentCreateBtn {
  elements = [];
  constructor(documentTypes) {
    documentTypes.forEach(documentType => {
      documentType.icon = "doc";
      documentType.text = documentType.name;
      documentType.create = async context => {
        const { documentTypeGuid, documentId } = await create(context, {
          documentTypeId: +documentType.id,
          documentTypeGuid: +documentType.documentTypeGuid
        });
        return { documentTypeGuid, documentId };
      };
      this.elements[documentType.id] = documentType;
    });
  }
  filtering(allowTypes) {
    const filterObj = {};
    for (let element in this.elements) {
      for (let allowType of allowTypes) {
        if (+element === allowType) {
          filterObj[element] = this.elements[element];
        }
      }
    }
    return filterObj;
  }
  getAll() {
    return this.elements;
  }
  getById(id) {
    return this.elements[id];
  }
}
