import dataApi from "~/static/dataApi";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
export default async function(context, document) {
  switch (document.documentTypeGuid) {
    case DocumentTypeGuid.DocumentTemplate:
      saveDocumentTemplate(context, document);
      break;
    default:
      saveDocument(context, document);
      break;
  }
}

export async function saveDocument(context, document) {
  const storePath = `documents/${document.id}/`;
  const documentJson = JSON.stringify(document);
  const response = await this.$axios.put(
    dataApi.documentModule.Documents + document.id,
    {
      documentJson,
      documentTypeGuid: document.documentTypeGuid
    }
  );

  const isNew = context.$store.getters[`${storePath}isNew`];
  if (isNew) {
    commit(`${storePath}SET_IS_NEW`, false);
  }
  commit(`${storePath}DATA_CHANGED`, false);
  return response;
}

export async function saveDocumentTemplate(context, document) {
  const storePath = `documents/${document.id}/`;
  const documentJson = JSON.stringify(document);
  const response = await this.$axios.put(
    dataApi.DocumentTemplate.GetDocumentById + document.id,
    {
      documentJson,
      documentTypeGuid: document.documentTypeGuid
    }
  );

  const isNew = context.$store.getters[`${storePath}isNew`];
  if (isNew) {
    commit(`${storePath}SET_IS_NEW`, false);
  }
  commit(`${storePath}DATA_CHANGED`, false);
  return response;
}
