import sharedDirectory from "~/lang/i18n-translation/tk/sharedDirectory.js"
import administration from "~/lang/i18n-translation/tk/administration.js"
import documentModule from "~/lang/i18n-translation/tk/documentModule.js";
import documentRegistration, {
  DocumentType
} from "~/lang/i18n-translation/tk/documentRegistration.js";
import taskModule, { TaskType } from "~/lang/i18n-translation/tk/taskModule.js";
import lifeCycleState from "~/lang/i18n-translation/tk/lifeCycleState.js";
import recipientType from "~/lang/i18n-translation/tk/recipientType.js"
import assignmentModule from "~/lang/i18n-translation/tk/assignment.js"
import menu from "~/lang/i18n-translation/tk/menu.js"
import headers from "~/lang/i18n-translation/tk/headers.js"
import documentSendAction from "~/lang/i18n-translation/tk/documentSendAction.js"
import attachmentAccessRight from "~/lang/i18n-translation/tk/attachmentAccessRight.js"
import companyStructure from "~/lang/i18n-translation/tk/companyStructure.js"
import parties from "~/lang/i18n-translation/tk/parties.js"
import paperWork from "~/lang/i18n-translation/tk/paperWork.js"
import docFlow from "~/lang/i18n-translation/tk/docFlow.js"
import buttons from "~/lang/i18n-translation/tk/buttons.js"
export default {
  paperWork,
  parties,
  companyStructure,
  attachmentAccessRight,
  sharedDirectory,
  administration,
  documentSendAction,
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
    onAcquaintance: "Tanyşylýar",
    onDocumentReview: "Seredilýär",
    reviewResolution: "Gaýtadan işlenýär"
  },
  // TODO Перевести на текменский 
  // validation: {
  //   caseFile: {
  //     endDateLessThanBegin: "Дата конца не может быть меньше даты начала"
  //   },
  //   valueMustNotContainsSpaces: "В значении не должны присутствовать пробелы"
  // },
  DocumentQuery: {
    "all": "Ähli resminamalar",
    "accountingDocuments": "Maliýe resminamalary",
    "contractualDocuments": "Şertnamalar",
    "internalDocument": "Içerki resminamalar",
    "supAgreement": "Goşmaça ylalaşyklar",
    "incomingInvoice": "Töleg üçin gelýän hasaplar",
    "сontractStatement": "Ýerine ýetirilen işleriň delilnamalary",
    "incomingTaxInvoice": "Gelip gowşan hasap-inwoýslar",
    "outgoingTaxInvoice": "Tölemek üçin berlen hasap-inwoýslar",
    "universalTransferDocument": "Uniwersal geçiriş resminamalary",
    "waybill": "Ýol ýanhatlary",
    "contract": "Şertnamalar",
    "addendum": "Resmianama goşundylar",
    "memo": "Gulluk ýazgylary",
    "order": "Buýruklar",
    "powerOfAttorney": "Ynanç hatlary",
    "outgoingLetter": "Çykyş hatlary",
    "incomingLetter": "Gelýän hatlar",
    "companyDirective": "Kärhananyň içindäki buýruklar",
    "simpleDocument": "Ýönekeý resminamalar"
  },
  createItemDialog: {
    ...DocumentType,
    ...TaskType,
    "recordManagementGroup": "Iş dolandyryş resminamalary",
    "taskGroup": "Ýumuşlar",
    "accountingDocumentsGroup": "Maliýe resminamalary",
    "contractualDocumentsGroup": "Şertnama resminamalary"
  },

  sex: {
    "male": "erkek",
    "female": "aýal"
  },
  panel: {
    "profile": "Şahsy maglumatlary",
    "logout": "çykmak"
  },
  counterPart: {
    "Company": "Kompaniýa",
    "Bank": "Bank",
    "Person": "Fiziki şahs",
    "Contact": "Habarlaşmak üçin"
  },
  history: {
    "historyDate": "Senesi",
    "userName": "Ulanyjy ady",
    "hostName": "Kompýuteriň ady",
    "userAgent": "Brauzeri",
    "action": "Hereket",
    "comment": "Bellikler",
    "create": "Döretmek",
    "read": "Gözden geçirmek",
    "update": "Täzelemek",
    "createVersion": "Wersiýany döretmek",
    "delete": "Pozmak",
    "manage": "Hukuklary dolandyrmak",
    "registration": "Bellige almak",
    "deregistration": "Bellige almakdan ýüz öwürmek",
    "downloadVersion": "Wersiýany ýükläp almak",
    "previewVersion": "Wersiýany öňünden gözden geçirmek",
    "loginFailed": "Girmek başa barmady",
    "logout": "Çykmak",
    "version": "Wersiýa"
  },
  shared: {
    "name": "Ady",
    "nameRequired": "Adyny giriziň",
    "nameShouldNotBeMoreThan": "At 60 belgiden uzyn bolmaly däldir",
    "shortName": "Gysgaça ady",
    "shortNameRequired": "Gysgaça adyny giriziň",
    "recipient": "Hukuklary kabul ediji",
    "fromWhom": "От кого",
    "accessRight": "Elýeterlik hukugy",
    "notFound": "Tapylmady",
    "deadLine": "Möhleti",
    "read": "Gözden geçirildi",
    "unread": "Gözden geçirilmedi",
    "explanation": "Düşündiriş",
    "account": "Hasap",
    "conditions": "Şertleri",
    "ourSide": "Biziň tarapymyz",
    "select": "Saýlamaly",
    "error": "Ýalňyşlyk",
    "more": "Has giňişleýin",
    "documents": "Resminamalar",
    "search": "Gözlenýär",
    "access": "Elýeterlik",
    "from": "Kimden",
    "whom": "Kime",
    "areYouSure": "Ynamyňyz  barmy?",
    "areYouSureDeleteTask": "Şu ýumuşy pozmaga ynamyňyz barmy",
    "confirm": "Tassyklamak",
    "newRecord": "(Täze ýazgy)",
    "documentFlow": "Resminamalar dolanyşygy",
    "status": "Ýagdaýy",
    "code": "Kody",
    "codeRequired": "Kody giriziň"
  },
  workFlow: {
    "fields": {
      "supervisor": "Gözegçi",
      "coAssignees": "Hyzmatdaşlar",
      "observers": "Synçylar"
    }
  },
  contractCategories: {
    "title": "Şertnamalaryň toparlary",
    "documentKinds": "resminamalaryň görnüşleri"
  },
  document: documentModule,
  documentRegistration: documentRegistration,
  assignment: assignmentModule,
  menu: menu,
  buttons,
  "notification": {
    "labels": {
      "info": "maglumat",
      "success": "Üstünlikli",
      "alert": "Howsala signaly",
      "warning": "Duýduryş",
      "async": "Ýüklenýär..."
    },
    "messages": {
      "info": "",
      "success": "Amal üstünlikli ýerine ýetirildi",
      "alert": "Amal ýerine ýetirilende ýalňyşlyk ýüze çykdy",
      "warning": "",
      "async": "Garaşmagyňyzy soraýarys...",
      "asyncBlock": "Ýüklenýär..."
    }
  },
  recipientType,
  translations: {
    fields: {
      "deadline": "gutormaly wagty",
      "legalName": "Hukuk ady",
      "legalNameRequired": "Hukuk adyny giriziň",
      "personalData": "Şahsy maglumatlar",
      "fullName": "Doly ady, familiýasy",
      "fullNameRequired": "Doly adyny, familiýasyny giriziň",
      "firstName": "Ady",
      "firstNameRequired": "Öz adyny giriziň",
      "lastName": "Familiýasy",
      "lastNameRequired": "Familiýasyny giriziň",
      "middleName": "Atasynyň ady",
      "middleNameRequired": "Atasynyň adyny giriziň",
      "dateOfBirth": "Doglan senesi",
      "dateOfBirthRequired": "Doglan senesini giriziň",
      "sex": "jynsy",
      "APN": "Wezipesi, iş orny we telefon belgisi (APN)",
      "legalAddress": "Hukuk salgysy",
      "postAddress": "Poçta salgysy",
      "phones": "Telefon belgileri",
      "userName": "Ulanyjynyň ady (Login)",
      "userNameRequired": "Ulanyjynyň loginini giriziň",
      "email": "email",
      "emailRule": "email ýalňyş girizildi",
      "emailAlreadyExists": "Şeýle email öňden bar",
      "webSite": "Web-saýt",
      "homepage": "Öý sahypasy",
      "tin": "HSB (hususy salgyt belgisi)",
      "tinRequired": "HSB girizmek talap edilýär",
      "tinAlreadyExists": "Şeýle HSB öňden bar",
      "tinRule": "HSB arasynda boşluklar bolmaly däldir",
      "account": "Hasabyň belgisi",
      "accountRequired": "Hasabyň belgisini giriziň",
      "permissions": "Rugsatnamalar",
      "nonresident": "Raýatlyga dahylly däl",
      "status": "Ýagdaýy",
      "note": "Bellikler",
      "password": "Açarsöz",
      "passwordRequired": "Açarsözi giriziň",
      "passwordRule": "Pasport ýokarky registrde azyndan bir latyn harpyndan we aşaky registrde bir sandan we azyndan bir belgiden ybarat bolmalydyr",
      "passwordChange": "Açarsözi üýtgetmeli",
      "confirmPassword": "Açarsözi tassyklaň",
      "confirmPasswordRequired": "Açarsöziň tassyklanmagyny giriziň",
      "confirmPasswordRule": "Açarsöz düzgünini tassyklaň",
      "preparesResolution": "Ýolbaşçylar üçin rezolýusiýany taýýarlaň",
      "regionId": "Sebit",
      regionIdRequired: "Выберите регион",
      localityId: "Населенный пункт",
      localityIdRequired: "Выберите населенный пункт",
      maxLength: "Максимальное количество символов должно быть не больше",
      bankId: "Банк",
      bankIdRequired: "Выберите банк",
      managerId: "Руководитель",
      managerIdRequired: "Выберите руководителя",
      ceo: "Руководитель",
      ceoRequired: "Выберите руководителя",
      assistantId: "Ассистент",
      assistantIdRequired: "выберите ассистента",
      businessUnitId: "Организация",
      businessUnitIdRequired: "Выберите организацию",
      headOfficeId: "Головное подразделение",
      jobTitleId: "Должность",
      jobTitleIdRequired: "Выберите должность",
      departmentId: "Подразделение",
      departmentIdRequired: "Выберите подразделение",
      index: "Индекс",
      indexRequired: "Введите индекс",
      indexRule: "Индекс должен быть без пробелов",
      registration: "Зарегистрироваться",
      number: "Номер",
      numberRequired: "Введите номер",
      numberingType: "Тип нумерации",
      numberingTypeRequired: "Выберите тип нумерации",
      generateDocumentName: "Формировать имя документа автоматически",
      documentTypeGuid: "Тип документа",
      documentTypeGuidRequired: "Выберите тип документа",
      registerType: "Тип журнала",
      registerTypeRequired: "Выберите тип журнала",
      registration: "Регистрация",
      "numbering": "San bilen belgilemek",
      "moreSettings": "Goşmaça sazlamalar",
      "moreAbout": "Has giňişleýin",
      "availableActions": "Elýeter hereketler",
      "numberingSection": "San goýmak bölümi",
      "numberingSectionRequired": "San goýmak bölümini saýlaň",
      "department": "Bölüm",
      "businessUnit": "Guramamyz",
      "noSection": "Bölümsiz",
      "canRegisterIncoming": "Girýän resminamalary bellige alýar",
      "canRegisterOutgoing": "Çykyş resminamalary bellige alýar",
      "canRegisterInternal": "Içerki resminamalary bellige alýar",
      "canRegisterContractual": "Şertnama resminamalaryny bellige alýar",
      "members": "Gatnaşyjylar",
      "registrationGroupId": "Bellige alyş topary",
      "registrationGroupIdRequired": "Bellige alyş toparyny saýlaň",
      "currentNumber": "Häzirki tertip belgisi",
      "currentNumberRequired": "Häzirki tertip belgisini giriziň",
      "regionAlreadyExists": "şeýle sebit öňden bar",
      "localityAlreadyExists": "şeýle ilatly nokat öňden bar",
      "me": "Men"
    },
    headers: headers,
  },
  registrationSettings: {
    caption: "Настройка регистрации",
    fields: {
      name: "Имя",
      priority: "Приоритет",
      documentRegister: "Журнал",
      settingType: "Тип настройки",
      documentKinds: "Виды документов",
      businessUnits: "Наши организации",
      departments: "Подразделения"
    },
    settingType: {
      registration: "Регистрация",
      numeration: "Нумерация",
      reservation: "Резервирование"
    },
    groups: {
      criterias: "Критерии",
      documentRegister: "Журнал"
    }
  }
};
