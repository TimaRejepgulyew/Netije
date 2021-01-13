import sharedDirectory from "~/lang/i18n-translation/tk/sharedDirectory.js";
import administration from "~/lang/i18n-translation/tk/administration.js";
import licensing from "~/lang/i18n-translation/tk/licensing.js";
import documentModule from "~/lang/i18n-translation/tk/documentModule.js";
import scanner from "~/lang/i18n-translation/tk/scanner.js";
import documentRegistration, {
  DocumentType
} from "~/lang/i18n-translation/tk/documentRegistration.js";
import taskModule, { TaskType } from "~/lang/i18n-translation/tk/taskModule.js";
import lifeCycleState from "~/lang/i18n-translation/tk/lifeCycleState.js";
import recipientType from "~/lang/i18n-translation/tk/recipientType.js";
import assignmentModule from "~/lang/i18n-translation/tk/assignment.js";
import menu from "~/lang/i18n-translation/tk/menu.js";
import headers from "~/lang/i18n-translation/tk/headers.js";
import documentSendAction from "~/lang/i18n-translation/tk/documentSendAction.js";
import attachmentAccessRight from "~/lang/i18n-translation/tk/attachmentAccessRight.js";
import companyStructure from "~/lang/i18n-translation/tk/companyStructure.js";
import parties from "~/lang/i18n-translation/tk/parties.js";
import paperWork from "~/lang/i18n-translation/tk/paperWork.js";
import docFlow from "~/lang/i18n-translation/tk/docFlow.js";
import buttons from "~/lang/i18n-translation/tk/buttons.js";
import malwareScanResults from "~/lang/i18n-translation/tk/malwareScanResults.js";
import documentTracking from "~/lang/i18n-translation/tk/documentTracking.js";
export default {
  documentTracking,
  malwareScanResults,
  scanner,
  paperWork,
  parties,
  companyStructure,
  attachmentAccessRight,
  sharedDirectory,
  administration,
  documentSendAction,
  licensing,
  status: {
    active: "Işjeň",
    closed: "Ýapyk"
  },
  task: taskModule,
  docFlow,
  lifeCycleState: lifeCycleState,
  AssignmentQuery: {
    all: "Hemme ýumuşlar we habarlar",
    onExicution: "Ýerine ýetirilýär",
    onReview: "Kabul edilýär",
    forRework: "Gaytadan işlemek",
    onDocumentReview: "Seredilýär",
    reviewResolution: "Gaýtadan işlenýär",
    onApproval: "Ylalyşylýar"
  },
  // TODO Перевести на текменский
  // validation: {
  //   caseFile: {
  //     endDateLessThanBegin: "Дата конца не может быть меньше даты начала"
  //   },
  //   valueMustNotContainsSpaces: "В значении не должны присутствовать пробелы"
  // },
  DocumentQuery: {
    contractsAndSupAgreements: "Şertnamalar we goşmaça ylalaşyk",
    universaltransferdocument: "Uniwersal geçiriş resminamasy",
    contractStatement: "Ýerine ýetirilen işleriň delilnamasy",
    all: "Ähli resminamalar",
    incomingDocument: "Gelýän resminamalar",
    outgoingDocument: "Çykyş resminamalary",
    accountingDocuments: "Maliýe resminamalary",
    contractualDocuments: "Şertnamalar",
    internalDocument: "Içerki resminamalar",
    supAgreement: "Goşmaça ylalaşyklar",
    incomingInvoice: "Töleg üçin gelýän hasaplar",
    сontractStatement: "Ýerine ýetirilen işleriň delilnamalary",
    incomingTaxInvoice: "Gelip gowşan hasap-inwoýslar",
    outgoingTaxInvoice: "Tölemek üçin berlen hasap-inwoýslar",
    universalTransferDocument: "Uniwersal geçiriş resminamalary",
    waybill: "Ýol ýanhatlary",
    contract: "Şertnamalar",
    addendum: "Resmianama goşundylar",
    memo: "Gulluk ýazgylary",
    order: "Buýruklar",
    powerOfAttorney: "Ynanç hatlary",
    outgoingLetter: "Çykyş hatlary",
    incomingLetter: "Gelýän hatlar",
    companyDirective: "Kärhananyň içindäki buýruklar",

    simpleDocument: "Ýönekeý resminamalar"
  },
  createItemDialog: {
    ...DocumentType,
    ...TaskType,
    select: "Saýlamak",
    create: "Döretmek",
    recordManagementGroup: "Iş dolandyryş resminamalary",
    taskGroup: "Ýumuşlar",
    accountingDocumentsGroup: "Maliýe resminamalary",
    contractualDocumentsGroup: "Şertnama resminamalary"
  },

  sex: {
    male: "erkek",
    female: "aýal"
  },
  panel: {
    downloadScannerApp: "Klienti ýükläp almak",
    profile: "Şahsy maglumatlary",
    logout: "çykmak"
  },
  counterPart: {
    Company: "Kompaniýa",
    Bank: "Bank",
    Person: "Fiziki şahs",
    Contact: "Habarlaşmak üçin"
  },
  history: {
    historyDate: "Senesi",
    userName: "Ulanyjy ady",
    hostName: "Kompýuteriň ady",
    userAgent: "Brauzeri",
    action: "Hereket",
    comment: "Bellikler",
    create: "Döretmek",
    read: "Gözden geçirmek",
    update: "Täzelemek",
    createVersion: "Wersiýany döretmek",
    delete: "Pozmak",
    manage: "Hukuklary dolandyrmak",
    registration: "Bellige almak",
    deregistration: "Bellige almakdan ýüz öwürmek",
    downloadVersion: "Wersiýany ýükläp almak",
    previewVersion: "Wersiýany öňünden gözden geçirmek",
    loginFailed: "Girmek başa barmady",
    logout: "Çykmak",
    version: "Wersiýa",
    removeVersion: "Versiany pozmak"
  },
  shared: {
    alert: {
      notification: "Duýduryş",
      serverError: "Serwer ýalňyşlygy",
      notHaveAccessRightToRead: "Sizde obýekde doly däl rugsat"
    },
    attach: "Goşuň",
    name: "Ady",
    nameRequired: "Adyny giriziň",
    nameAlreadyExists: "Şeýle ady öňden bar",
    nameShouldNotBeMoreThan: "At 60 belgiden uzyn bolmaly däldir",
    shortName: "Gysgaça ady",
    shortNameRequired: "Gysgaça adyny giriziň",
    recipient: "Hukuklary kabul ediji",
    fromWhom: "Kimden",
    accessRight: "Elýeterlik hukugy",
    notFound: "Tapylmady",
    deadLine: "Möhleti",
    read: "Gözden geçirildi",
    unread: "Gözden geçirilmedi",
    explanation: "Düşündiriş",
    account: "Hasap",
    conditions: "Şertleri",
    ourSide: "Biziň tarapymyz",
    select: "Saýlamaly",
    error: "Ýalňyşlyk",
    more: "Has giňişleýin",
    documents: "Resminamalar",
    search: "Gözlenýär",
    access: "Elýeterlik",
    from: "Kimden",
    whom: "Kime",
    areYouSure: "Ynamyňyz  barmy?",
    areYouSureDeleteTask: "Şu ýumuşy pozmaga ynamyňyz barmy",
    confirm: "Tassyklaň!",
    newRecord: "(Täze ýazgy)",
    documentFlow: "Resminamalar dolanyşygy",
    status: "Ýagdaýy",
    statusRequired: "Ýagdaýy saýlaň",
    code: "Kody",
    codeRequired: "Kody giriziň",
    codeAlreadyExists: "Şeýle kody öňden bar",
    description: "Bellik"
  },
  workFlow: {
    fields: {
      supervisor: "Gözegçi",
      coAssignees: "Hyzmatdaşlar",
      observers: "Synçylar"
    }
  },
  contractCategories: {
    title: "Şertnamalaryň toparlary",
    documentKinds: "Resminamalaryň görnüşleri"
  },
  document: documentModule,
  documentRegistration: documentRegistration,
  assignment: assignmentModule,
  menu: menu,
  buttons,
  notification: {
    labels: {
      info: "Maglumat",
      success: "Üstünlikli",
      alert: "Şowsyz",
      warning: "Duýduryş",
      async: "Ýüklenýär..."
    },
    messages: {
      info: "",
      success: "Amal üstünlikli ýerine ýetirildi",
      alert: "Amal ýerine ýetirilende ýalňyşlyk ýüze çykdy",
      warning: "",
      async: "Garaşmagyňyzy soraýarys...",
      asyncBlock: "Ýüklenýär..."
    }
  },
  recipientType,
  translations: {
    fields: {
      isDefault: "Berlenlere görä",
      deadLine: "Gutormaly wagty",
      legalName: "Hukuk ady",
      legalNameRequired: "Hukuk adyny giriziň",
      personalData: "Şahsy maglumatlar",
      fullName: "Doly ady, familiýasy",
      fullNameRequired: "Doly adyny, familiýasyny giriziň",
      firstName: "Ady",
      firstNameRequired: "Öz adyny giriziň",
      lastName: "Familiýasy",
      lastNameRequired: "Familiýasyny giriziň",
      middleName: "Atasynyň ady",
      middleNameRequired: "Atasynyň adyny giriziň",
      dateOfBirth: "Doglan senesi",
      dateOfBirthRequired: "Doglan senesini giriziň",
      sex: "jynsy",
      APN: "Wezipesi, iş orny we telefon belgisi (APN)",
      legalAddress: "Hukuk salgysy",
      postAddress: "Poçta salgysy",
      phones: "Telefon belgileri",
      userName: "Ulanyjynyň ady (Login)",
      userNameRequired: "Ulanyjynyň loginini giriziň",
      email: "email",
      emailRule: "email ýalňyş girizildi",
      emailAlreadyExists: "Şeýle email öňden bar",
      webSite: "Web-saýt",
      homepage: "Öý sahypasy",
      tin: "HSB (hususy salgyt belgisi)",
      tinRequired: "HSB girizmek talap edilýär",
      tinAlreadyExists: "Şeýle HSB öňden bar",
      tinRule: "HSB arasynda boşluklar bolmaly däldir",
      account: "Hasabyň belgisi",
      accountRequired: "Hasabyň belgisini giriziň",
      permissions: "Rugsatnamalar",
      nonresident: "Raýatlyga dahylly däl",
      status: "Ýagdaýy",
      note: "Bellikler",
      password: "Açarsöz",
      passwordRequired: "Açarsözi giriziň",
      passwordRule:
        "Pasport ýokarky registrde azyndan bir latyn harpyndan we aşaky registrde bir sandan we azyndan bir belgiden ybarat bolmalydyr",
      passwordChange: "Açarsözi üýtgetmeli",
      confirmPassword: "Açarsözi tassyklaň",
      confirmPasswordRequired: "Açarsöziň tassyklanmagyny giriziň",
      confirmPasswordRule: "Açarsöz düzgünini tassyklaň",
      preparesResolution: "Ýolbaşçylar üçin rezolýusiýany taýýarlaň",
      regionId: "Sebit",
      regionIdRequired: "Sebiti saýlaň",
      localityId: "Ilatly nokat",
      localityIdRequired: "lIlatly nokady saýlaň",
      maxLength: "Belgileriň aňryçäk uzynlygy görkezilenden köp bolmaly däldir",
      bankId: "Bank",
      bankIdRequired: "Banky saýlap alyň",
      managerId: "Ýolbaşçy",
      managerIdRequired: "Ýolbaşçyny saýlamygyňyzy soraýrys",
      ceo: "Ýolbaşçy",
      ceoRequired: "Ýolbaşçyny saýlamygyňyzy soraýrys",
      assistantId: "Kömekçi",
      assistantIdRequired: "Kömekçini saýlaň",
      businessUnitId: "Gurama",
      businessUnitIdRequired: "Guramany saýlap alyň",
      headOfficeId: "Ýokarda duran edara",
      jobTitleId: "Wezipesi",
      jobTitleIdRequired: "Wezipesini saýlaň",
      departmentId: "Bölüm",
      departmentIdRequired: "Bölümini saýlap alyň",
      index: "Indeksi",
      indexRequired: "Indeksi giriziň",
      indexRule: "Indeksde boşluklar bolmaly däldir",
      registration: "Bellige almak",
      number: "San",
      numberRequired: "Sany giriziň",
      numberingType: "Yzygiderli san bilen bellemeiň tipi",
      numberingTypeRequired: "Yzygiderli san goýmak görnüşini saýlaň",
      generateDocumentName: "Resminamanyň adyny awtomatik görnüşde döretmeli",
      documentTypeGuid: "Resminamanyň görnüşi",
      documentTypeGuidRequired: "Resminamanyň görnüşini saýlaň",
      registerType: "Bellige alyş kitabynyň görnüşi",
      registerTypeRequired: "Kitapçanyň görnüşini saýlaň",
      numbering: "San bilen belgilemek",
      moreSettings: "Goşmaça sazlamalar",
      moreAbout: "Has giňişleýin",
      availableActions: "Elýeter hereketler",
      numberingSection: "San goýmak bölümi",
      numberingSectionRequired: "San goýmak bölümini saýlaň",
      department: "Bölüm",
      businessUnit: "Guramamyz",
      noSection: "Bölümsiz",
      canRegisterIncoming: "Girýän resminamalary bellige alýar",
      canRegisterOutgoing: "Çykyş resminamalary bellige alýar",
      canRegisterInternal: "Içerki resminamalary bellige alýar",
      canRegisterContractual: "Şertnama resminamalaryny bellige alýar",
      members: "Gatnaşyjylar",
      registrationGroupId: "Bellige alyş topary",
      registrationGroupIdRequired: "Bellige alyş toparyny saýlaň",
      currentNumber: "Häzirki tertip belgisi",
      currentNumberRequired: "Häzirki tertip belgisini giriziň",
      regionAlreadyExists: "şeýle sebit öňden bar",
      localityAlreadyExists: "şeýle ilatly nokat öňden bar",
      me: "Men"
    },
    headers: headers
  },
  registrationSettings: {
    caption: "Sözbaşy",
    fields: {
      name: "Ady",
      priority: "Artykmaçlyk derejesi",
      documentRegister: "Bellige alyş kitapçasy",
      settingType: "Sazlama görnüşi",
      documentKinds: "Resminama görnüşleri",
      businessUnits: "Gurama",
      departments: "Bölümler"
    },
    settingType: {
      registration: "Bellige almak",
      numeration: "San bilen belgilemek",
      reservation: "Ätiýaçlyk saklamak"
    },
    groups: {
      criterias: "Ölçegler",
      documentRegister: "Bellige alyş kitapçasy"
    }
  }
};
