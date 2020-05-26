import DocumentType from "~/infrastructure/constants/documentType.js";
export default function(type) {
  let document = {
    id: null,
    name: null,
    subject: null,
    documentKind: null,
    businessUnitId: null,
    departmentId: null,
    note: null
  };
  switch (type) {
    case DocumentType.IncommingDocument:
      document = {
        ...document,
        counterpartySignatoryId: null,
        contactId: null,
        correspondent: {
          id: null,
          name: null
        },
        dated: null,
        inResponseToId: null,
        inNumber: null,
        addresseeId: null,
        deliveryMethodId: null
      };
      break;
    case DocumentType.OutgoingDocument:
      document = {
        ...document,
        ourSignatoryId: null,
        correspondent: {
          id: null,
          name: null
        },
        contactId: null,
        inResponseToId: null,
        deliveryMethodId: null,
        preparedById: null
      };
      break;
    case DocumentType.Order:
    case DocumentType.CompanyDirective:
      document = {
        ...document,
        ourSignatoryId: null,
        preparedById: null,
        assigneeId: null
      };
      break;
    case DocumentType.SimpleDocument:
      document = {
        ...document
      };
      break;
    case DocumentType.Addendum:
      document = {
        ...document,
        leadingDocumentId: null
      };
      break;
    case DocumentType.Memo:
      document = {
        ...document,
        ourSignatoryId: null,
        preparedById: null,
        addresseeId: null,
        assigneeId: null
      };
      break;
    case DocumentType.PowerOfAttorney:
      document = {
        ...document,
        validTill: null,
        issuedToId: null,
        preparedById: null,
        ourSignatoryId: null
      };
      break;
  }
  console.log(document);
  return document;
}
