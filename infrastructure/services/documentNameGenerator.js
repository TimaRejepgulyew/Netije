import DocumentType from "~/infrastructure/constants/documentType.js";
export default function(context, document) {
  let subject = "";
  if (document.subject) {
    subject = document.subject;
  }
  let documentKind = "";
  if (document.documentKind.shortName) {
    documentKind = document.documentKind.shortName;
  }
  let correspondent = "";
  if (document.documentType == DocumentType.OutgoingDocument) {
    if (document.correspondent) {
      correspondent = `${context.$i18n.t("translations.fields.from")} ${
        document.correspondent.name
      }`;
    }
    return `${documentKind} ${subject} ${correspondent}`;
  } else if (document.documentType == DocumentType.IncommingDocument) {
    if (document.correspondent.name) {
      correspondent = `${context.$i18n.t("translations.fields.from")} ${
        document.correspondent.name
      }`;
    }
    return `${documentKind} ${correspondent} ${subject}`;
  } else {
    return `${documentKind}  ${subject}`;
  }
}
