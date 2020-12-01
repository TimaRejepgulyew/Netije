import DocumentVersionService from "~/infrastructure/services/documentVersionService";
export default ({ context, options, lastVersion, listeners, isNew }) => {
  console.log("preview", isNew);
  switch (options.extension) {
    case ".pdf":
      pdfViewer({ context, options, lastVersion, listeners });
      break;
    case ".docx":
    case ".txt":
      documentEditor({ context, options, lastVersion, listeners, isNew });
      break;
    case ".jpg":
    case ".jpeg":
    case ".png":
    case ".svg":
    case ".gif":
      imageViewer({ context, options, lastVersion, listeners });
      break;
    case ".lsx":
    case ".xlsx":
      spreadSheet({ context, options, lastVersion, listeners, isNew });
      break;
  }
};
const pdfViewer = ({ context, options, lastVersion, listeners }) => {
  context.$popup.pdfFileReader(
    context,
    {
      lastVersion: lastVersion,
      readOnly: options.readOnly,
      params: options.params
    },
    { showLoadingPanel: false, listeners }
  );
};
const documentEditor = ({
  context,
  options,
  lastVersion,
  listeners,
  isNew = false
}) => {
  const handler = lastVersion
    ? DocumentVersionService.importLastVersionDocumentEditor
    : DocumentVersionService.importVersionDocumentEditor;
  context.$popup.documentEditor(
    context,
    {
      readOnly: options.readOnly,
      params: options.params,
      handler: handler,
      isNew
    },
    { showLoadingPanel: !isNew, listeners }
  );
};
const imageViewer = ({ context, options, lastVersion, listeners }) => {
  const handler = lastVersion
    ? DocumentVersionService.importFileLastVersion
    : DocumentVersionService.importFileVersion;
  context.$popup.imageViewer(
    context,
    {
      readOnly: options.readOnly,
      params: options.params,
      handler: handler
    },
    { showLoadingPanel: true, listeners }
  );
};
const spreadSheet = ({
  context,
  options,
  lastVersion = false,
  listeners,
  isNew = false
}) => {
  const handler = lastVersion
    ? DocumentVersionService.importLastVersionSpreadSheet
    : DocumentVersionService.importVersionSpreadSheet;
  context.$popup.spreadSheet(
    context,
    {
      readOnly: options.readOnly,
      params: options.params,
      handler,
      isNew
    },
    { showLoadingPanel: !isNew, listeners }
  );
};
