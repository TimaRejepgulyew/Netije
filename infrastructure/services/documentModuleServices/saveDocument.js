import dataApi from "~/static/dataApi";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
export default async function(context, store) {
  switch (store.state.document.documentTypeGuid) {
    case DocumentTypeGuid.DocumentTemplate:
      return await saveDocumentTemplate(context, store);
    default:
      return await saveDocument(context, store);
  }
}

export async function saveDocument(context, { commit, state, dispatch }) {
  const documentJson = JSON.stringify(state.document);
  const { data } = await context.$axios.put(
    dataApi.documentModule.SaveDocument + state.document.id,
    {
      documentJson,
      documentTypeGuid: state.document.documentTypeGuid
    }
  );

  const isNew = state.isNew;
  if (isNew) {
    commit(`SET_IS_NEW`, false);
  }
  commit(`DATA_CHANGED`, false);
  commit(`SET_DOCUMENT`, data);
  return data;
}

export async function saveDocumentTemplate(
  context,
  { commit, state, dispatch }
) {
  const documentJson = JSON.stringify(state.document);
  const { data } = await context.$axios.put(
    `${dataApi.documentTemplate.Documents}/${state.document.id}`,
    state.document
  );

  const isNew = state.isNew;
  if (isNew) {
    commit(`SET_IS_NEW`, false);
  }
  commit(`DATA_CHANGED`, false);
  commit(`SET_DOCUMENT`, data);
  return data;
}
