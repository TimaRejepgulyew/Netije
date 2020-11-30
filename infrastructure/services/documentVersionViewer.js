import DocumentVersionService from "~/infrastructure/services/documentVersionService";
export default ({ context, options, lastVersion, listeners }) => {
  console.log("preview", options);
  switch (options.extension) {
    case ".pdf":
      pdfViewer({ context, options, lastVersion, listeners });
      break;
    case ".docx":
    case ".txt":
      documentEditor({ context, options, lastVersion, listeners });
      break;
    case ".jpg":
    case ".jpeg":
    case ".png":
    case ".svg":
    case ".gif":
      imageViewer({ context, options, lastVersion, listeners });
      break;
    case ".lsx":
      lsxDocumentEditor({ context, options, lastVersion, listeners });
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
const documentEditor = ({ context, options, lastVersion, listeners }) => {
  const handler = lastVersion
    ? DocumentVersionService.exportLastVersionDocumentEditor
    : DocumentVersionService.exportVersionDocumentEditor;
  context.$popup.documentEditor(
    context,
    {
      readOnly: options.readOnly,
      params: options.params,
      handler: handler
    },
    { showLoadingPanel: true, listeners }
  );
};
const imageViewer = ({ context, options, lastVersion, listeners }) => {
  const handler = lastVersion
    ? DocumentVersionService.exportFileLastVersion
    : DocumentVersionService.exportFileVersion;
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
const lsxDocumentEditor = ({ context, options, lastVersion }) => {
  //   const handler = lastVersion
  //     ? DocumentVersionService.downloadLastVersion
  //     : DocumentVersionService.downloadVersion;
  //   context.$popup.documentEditor(
  //     context,
  //     {
  //       readOnly: options.readOnly,
  //       params: options.params,
  //       handler: handler
  //     },
  //     { showLoadingPanel: true }
  //   );
};
