import sharedDirectory from "~/lang/i18n-translation/ru/sharedDirectory.js";
import administration from "~/lang/i18n-translation/ru/administration.js";
import licensing from "~/lang/i18n-translation/ru/licensing.js";
import documentModule from "~/lang/i18n-translation/ru/documentModule.js";
import documentRegistration, {
  DocumentType
} from "~/lang/i18n-translation/ru/documentRegistration.js";
import taskModule, { TaskType } from "~/lang/i18n-translation/ru/taskModule.js";
import lifeCycleState from "~/lang/i18n-translation/ru/lifeCycleState.js";
import buttons from "~/lang/i18n-translation/ru/buttons.js";
import recipientType from "~/lang/i18n-translation/ru/recipientType.js";
import assignmentModule from "~/lang/i18n-translation/ru/assignment.js";
import menu from "~/lang/i18n-translation/ru/menu.js";
import headers from "~/lang/i18n-translation/ru/headers.js";
import documentSendAction from "~/lang/i18n-translation/ru/documentSendAction.js";
import attachmentAccessRight from "~/lang/i18n-translation/ru/attachmentAccessRight.js";
import companyStructure from "~/lang/i18n-translation/ru/companyStructure.js";
import parties from "~/lang/i18n-translation/ru/parties.js";
import paperWork from "~/lang/i18n-translation/ru/paperWork.js";
import docFlow from "~/lang/i18n-translation/ru/docFlow.js";
import scanner from "~/lang/i18n-translation/ru/scanner.js";
import malwareScanResults from "~/lang/i18n-translation/ru/malwareScanResults.js";
import onlineUsers from "~/lang/i18n-translation/ru/onlineUsers.js";
import exchange from "~/lang/i18n-translation/ru/exchange.js";
export default {
  exchange,
  malwareScanResults,
  onlineUsers,
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
    active: "Активный",
    closed: "Закрытый"
  },
  task: taskModule,
  docFlow,
  lifeCycleState: lifeCycleState,
  AssignmentQuery: {
    all: "Все задания и уведомления",
    onExicution: "На исполнение",
    onReview: "На приемку",
    forRework: "На доработку",
    onDocumentReview: "На расмотрениe",
    reviewResolution: "На обработку",
    onApproval: "На согласование"
  },
  validation: {
    caseFile: {
      endDateLessThanBegin: "Дата конца не может быть меньше даты начала"
    },
    valueMustNotContainsSpaces: "В значении не должны присутствовать пробелы"
  },
  DocumentQuery: {
    all: "Все документы",
    incomingDocument: "Входящие документы",
    outgoingDocument: "Исходящие документы",
    accountingDocuments: "Финансовые документы",
    contractualDocuments: "Договоры",
    contractStatement: "Акт выполненных работ",
    contractsAndSupAgreements: "Договоры и дополнительные соглашения",
    internalDocument: "Внутрение документы",
    supAgreement: "Дополнительные соглашения",
    incomingInvoice: "Входящие счета на оплату",
    сontractStatement: "Акты выполненных работ",
    incomingTaxInvoice: "Счет-фактуры полученные",
    outgoingTaxInvoice: "Счет-фактуры выставленные",
    universalTransferDocument: "Универсальные передаточный документы",
    waybill: "Накладные",
    contract: "Договоры",
    addendum: "Приложения к документу",
    memo: "Служебные записки",
    order: "Приказы",
    powerOfAttorney: "Доверенности",
    outgoingLetter: "Исходящие письма",
    incomingLetter: "Входящие письма",
    companyDirective: "Распоряжения",
    simpleDocument: "Простые документы",
    universaltransferdocument: "Универсальный передаточный документ"
  },
  createItemDialog: {
    ...DocumentType,
    ...TaskType,
    select: "Выбрать",
    create: "Создать",
    recordManagementGroup: "Делопроизводственные документы",
    taskGroup: "Задачи",
    accountingDocumentsGroup: "Финансовые документы",
    contractualDocumentsGroup: "Договорные документы"
  },

  sex: {
    male: "Мужской",
    female: "Женский"
  },
  panel: {
    profile: "Профиль",
    logout: "выйти",
    downloadScannerApp: "Скачать веб клиент"
  },
  counterPart: {
    Company: "Компания",
    Bank: "Банк",
    Person: "Физическое лицо",
    Contact: "Контактное лицо"
  },
  history: {
    historyDate: "Дата",
    userName: "Пользователь",
    hostName: "Имя комьютера",
    userAgent: "Браузер",
    action: "Действие",
    comment: "Комментарий",
    create: "Создание",
    read: "Просмотр",
    update: "Изменение",
    createVersion: "Создание версии",
    delete: "Удаление",
    manage: "Настройка прав",
    registration: "Регистрация",
    deregistration: "Отмена регистрации",
    downloadVersion: "Скачивание версии",
    previewVersion: "Предпросмотр версии",
    loginFailed: "Неудачный вход",
    logout: "Выход",
    version: "Версии",
    removeVersion: "Удалене версии"
  },
  shared: {
    alert: {
      notification: "Предупреждение",
      serverError: "Ошибка сервера",
      notHaveAccessRightToRead: "У вас не достаточно прав на данный обьект"
    },
    attach: "Вложите",
    name: "Наименование",
    nameRequired: "Введите наименование",
    nameAlreadyExists: "Такое имя уже существует",
    nameShouldNotBeMoreThan: "Не должно быть больше 60 символов",
    shortName: "Короткое наименование",
    shortNameRequired: "Введите короткое наименование",
    recipient: "Субъект прав",
    fromWhom: "От кого",
    accessRight: "Право доступа",
    notFound: "Не найдено",
    deadLine: "Срок",
    read: "Прочитано",
    unread: "Не прочитано",
    explanation: "Пояснение",
    account: "Счет",
    conditions: "Условия",
    ourSide: "Наша сторона",
    select: "Выбрать...",
    error: "Произошла ошибка",
    more: "Подробнее",
    documents: "Документы",
    search: "Поиск...",
    access: "Доступ",
    from: "От",
    whom: "Кому",
    areYouSure: "Вы уверены?",
    areYouSureDeleteTask: "Вы уверены что хотите удалить эту задачу?",
    confirm: "Подтверждение",
    newRecord: "(Новая запись)",
    documentFlow: "Документопоток",
    status: "Состояние",
    statusRequired: "Введите статус",
    code: "Код",
    codeRequired: "Введите код",
    codeAlreadyExists: "Такой код уже существует",
    description: "Описание"
  },
  workFlow: {
    fields: {
      supervisor: "Контролер",
      coAssignees: "Соисполнители",
      observers: "Наблюдатели"
    }
  },
  contractCategories: {
    title: "Категории договоров",
    documentKinds: "Виды документов"
  },
  document: documentModule,
  documentRegistration: documentRegistration,
  assignment: assignmentModule,
  menu: menu,
  buttons,
  notification: {
    labels: {
      info: "Информация",
      success: "Успешно",
      alert: "Ошибка",
      warning: "Предупреждение",
      async: "Загрузка"
    },
    messages: {
      info: "",
      success: "Операция успешно выполнена",
      alert: "При выполнении операции произошла ошибка",
      warning: "",
      async: "Пожалуйста, подождите...",
      asyncBlock: "Загрузка"
    }
  },
  recipientType,
  translations: {
    fields: {
      deadLine: "Срок",
      legalName: "Юридическое наименование",
      legalNameRequired: "Введите юридическое наименование",
      personalData: "Персональные данные",
      fullName: "ФИО",
      fullNameRequired: "ФИО не должно быть пустым",
      firstName: "Имя",
      firstNameRequired: "Введите имя",
      lastName: "Фамилия",
      lastNameRequired: "Введите фамилию",
      middleName: "Отчество",
      middleNameRequired: "Введите отчество",
      dateOfBirth: "Дата рождения",
      dateOfBirthRequired: "Выберите дату рождения",
      sex: "Пол",
      APN: "Должность, место работы и номер телефона",
      legalAddress: "Юридический адрес",
      postAddress: "Почтовый адрес",
      phones: "Телефон",
      userName: "Логин пользователя",
      userNameRequired: "Введите логин пользователя",
      email: "Email",
      emailRule: "Email введен не верно",
      emailAlreadyExists: "Сотрудник с таким email уже существует",
      webSite: "Веб-сайт",
      homepage: "Домашняя страница",
      tin: "ИНН",
      tinRequired: "Введите ИНН",
      tinAlreadyExists: "Такой ИНН уже существует",
      tinRule: "Инн должен быть без пробелов",
      account: "Номер счетa",
      accountRequired: "Введите номер счета",
      permissions: "Разрешения",
      nonresident: "Нерезидент",
      status: "Статус",
      note: "Примечание",
      password: "Пароль",
      passwordRequired: "Введите пароль",
      passwordRule:
        "Пароль должен состоять из хотя бы одной латинской  буквы в верхнем регистре и в нижнем регистре  одной цифры и хотя бы одного символа",
      passwordChange: "Изменить пароль:",
      confirmPassword: "Подтвердите пароль",
      confirmPasswordRequired: "Введите подтверждения пароля",
      confirmPasswordRule: "Пароль и Подтвердить пароль не подходят",
      preparesResolution: "Готовит резолюцию для руководителя",
      regionId: "Регион",
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
      numbering: "Нумерация",
      moreSettings: "Дополнительные настройки",
      moreAbout: "Подробнее",
      availableActions: "Действие по отправке",
      numberingSection: "Разрез нумерации",
      numberingSectionRequired: "Выберите разрез нумерации",
      department: "Подразделение",
      businessUnit: "Наша организация",
      noSection: "Без разреза",
      canRegisterIncoming: "Регистрирует входящие документы",
      canRegisterOutgoing: "Регистрирует исходящие документы",
      canRegisterInternal: "Регистрирует внутренние документы",
      canRegisterContractual: "Регистрирует договорные документы",
      members: "Участники",
      registrationGroupId: "Группа регистрации",
      registrationGroupIdRequired: "Выберите группу регистрации",
      currentNumber: "Текущий номер",
      currentNumberRequired: "Введите текущий номер",
      regionAlreadyExists: "Такой регион уже существует",
      localityAlreadyExists: "Такой населенный пункт уже существует",
      me: "Я"
    },
    headers: headers
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
