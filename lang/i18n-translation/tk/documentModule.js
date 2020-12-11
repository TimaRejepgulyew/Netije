export const DocumentType = {
  IncomingLetter: "Girýän hat",
  OutgoingLetter: "Çykyş haty",
  CompanyDirective: "Kärhana içindäki görkezmeler",
  SimpleDocument: "Ýönekeý resminama",
  Addendum: "Resminama goşundy",
  PowerOfAttorney: "Ynanç haty",
  Order: "Buýruk",
  Memo: "Gulluk ýazgysy",
  InternalDocument: "Içerki resminamalar",
  SupAgreement: "Goşmaça ylalaşyk",
  IncomingInvoice: "Töleg üçin gelen hasap",
  ContractStatement: "Ýerine ýetirilen işleriň delilnamasy",
  IncomingTaxInvoice: "Gelip gowşan hasap-inwoýs",
  OutgoingTaxInvoice: "Tölemek üçin berlen hasap-onwoýs",
  UniversalTransferDocument: "Uniwersal geçiriş resminamasy",
  Waybill: "Ýol ýanhaty",
  Contract: "Şertnama"
};
export default {
  remove: "Pozmak",
  preview: "Öňünden gözden geçirmek",
  download: "Ýükläp almak",
  saved: "Resminama ýatda saklandy",
  lifeCycle: "Ýaşaýyş aýlawy",
  state: "Ýagdaýy",
  registrationState: "Bellige almak",
  internalApprovalState: "Özara ylalaşmak ýagdaýy",
  externalApprovalState: "Beýleki tarap bilen ylalaşmagyň ýagdaýy",
  executionState: "Ýerine ýetirilişi",
  controlExecutionState: "Ýerine ýetirilişine gözegçilik",
  type: DocumentType,
  confirmMessage: {
    sureDeleteVersion: "Aýyrlan wersiyany yzyna gaýtaryp bolmaýar"
  },
  tabs: {
    main: "Esasy häsiýetleri",
    relations: "Gatnaşyklary",
    history: "Taryhy",
    tasks: "Tabşyryklary"
  },
  groups: {
    captions: {
      main: "ESASY",
      numberAndDate: "BELGISI WE SENESI",
      storing: "SAKLAMAK",
      lifeCycle: "ÝAŞAÝYŞ AÝLAWY",
      versions: "Wersiýalar"
    }
  },
  fields: {
    lifeCycle: "Ýaşaýyş aýlawy",
    state: "Ýagdaýy",
    registrationState: "Bellige almak",
    internalApprovalState: "Özara ylalaşmak ýagdaýy",
    externalApprovalState: "Beýleki tarap bilen ylalaşmagyň ýagdaýy",
    executionState: "Ýerine ýetirilişi",
    controlExecutionState: "Ýerine ýetirilişine gözegçilik",
    note: "Bellikler",
    invalidExeption: "Ýol berilmeýän giňeltme",
    isStandardSupAgreement: "Birkysmy goşmaça ylalaşyk",
    isAdjustment: "Düzedişler",
    correctedId: "Düzedilýär",
    isAutomaticRenewal: "Awtomatik täzelenme",
    currencyId: "Walýutasy",
    accountNumber: "Hasabyň belgisi",
    accountDate: "Hasabyň senesi",
    totalAmount: "Jemi möçberi",
    contract: "Şertnama",
    areYouSureCancelDocument:
      "Resminamadan çykmak we ony pozmak isleýärsiňizmi?",
    dated: "Senesi",
    name: "Ady",
    inResponseToId: "Jogap hökmünde berilýär",
    index: "Indeksi",
    ourSignatoryId: "Gol çeken",
    signatory: "Gol çeken",
    counterPart: "Kontragent",
    counterpartySignatoryId: "Gol çeken",
    caseFileId: "Iş bukjasy",
    placedToCaseFileDate: "Iş bukjasynyň ýerleşdirilen senesi",
    contactId: "Habarlaşmak üçin",
    preparedById: "Kim taýýarlady",
    assigneeId: "Ýerine ýetiriji",
    created: "Döredildi",
    modified: "Üýtgedildi",
    authorId: "Awtory",
    registrationDate: "Bellige alnan senesi",
    registrationNumber: "Bellige alyş belgisi",
    documentNumber: "Resminamanyň belgisi",
    correspondentId: "Kontragent",
    subject: "Mazmuny",
    documentKindId: "Resminama görnüşi",
    documentRegisterId: "Bellige alyş kitapçasy",
    registrationState: "Bellige almak",
    deliveryMethodId: "Eltmegiň usuly",
    addresseeId: "Adresat",
    businessUnitId: "Gurama",
    departmentId: "Bölüm",
    leadingDocumentId: "Esasy resminama",
    documentTypeGuid: "Resminamanyň görnüşi",
    regNumberDocument: "Giriş belligi",
    validFrom: "Başlap hereket edýär",
    validTill: "Çenli hereket edýär",
    issuedToId: "Kime berildi",
    daysToFinishWorks: "Tamamlanýan wagtyna çenli galan günler",
    documentGroupId: "Resminama topary",
    isStandard: "Birkysmy görnüşde",
    ourSide: "Biziň tarapymyz",
    responsibleEmployeeId: "Jogapkär işgär",
    conditions: "Şertleri",
    whom: "Kime"
  },
  validation: {
    stateRequired: "Ýagdaýy giriziň",
    addresseeIdRequired: "Barmaly salgyny saýlaň",
    issuedToIdRequired: "Kime berildi saýlap alyň",
    ourSignatoryRequired: "Gol çekeni saýlap alyň",
    validTillRequired: "Çenli hereket edýär giriziň",
    nameRequired: "Adyny giriziň",
    preparedRequired: "Kim taýýarlady saýlap alyň",
    subjectRequired: "Mazmuny giriziň",
    documentKindIdRequired: "Resminama görnüşini giriziň",
    departmentIdRequired: "Bölümini saýlap alyň",
    businessUnitIdRequired: "Guramany saýlap alyň",
    counterPartRequired: "Kontragenti saýlap alyň",
    documentGroupIdRequired: "Resminama toparyny saýlap alyň",
    leadingDocumentIdRequired: "Esasy resminamany saýlap alyň"
  },
  headers: {
    pdfFileReader: "Resminamany Pdf formatyň okyjysy",
    documentEditor: "Resminamanyň Word formatyň redaktory",
    documentTemplate: "Resminamanyň nusgasy",
    imageViewer: "Suratlaryň okyjysy",
    xlsxEditor: "Resminamanyň Excel formatyň redaktory"
  },
  confirm: {
    sureSendToElectronExchangeService:
      "Siz hakykatdanam resminamamy alyş-çalyş ulgamyna ugratjaksyňyz"
  }
};
