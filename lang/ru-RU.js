export default {
  status: {
    active: "Активный",
    closed: "Закрытый"
  },
  docFlow: {
    headerTitle: "Документооборот",
    headerDescription:
      "Модуль предназначен для настройки документооборота компании.",
    personalSetting: {
      title: "Персональные настройки",
      mySetting: "Мои настройки",
      mySettingDescr: "Личные настройки отдельных параметров работы системы."
    },
    documentSetting: {
      title: "Настройки документов",
      docKind: "Виды документов",
      docKindDescr:
        "Классификация документов, определяющая документопоток, тип нумерации документа.",
      categories: "Категории договоров",
      categoriesDescr:
        "Дополнительная классификация договоров в рамках видов документов."
    },
    regSetting: {
      title: "Регистрация и нумерация",
      registration: "Журналы регистрации",
      registrationDescr:
        "Перечень журналов, используемых для учета, нумерации и регистрации документов.",
      regGroup: "Группы регистрации",
      regGroupDescr:
        "Группы сотрудников, которыми производится регистрация, учет и хранение документов в определенных журналах регистрации.",
      registrationSettings: "Настройки регистрации",
      registrationSettingsDescr: "Правила автоматического подбора журнала регистрации в соответствии с реквизитами документа.",
      deliveriMethods: "Способ доставки документов",
      deliveriMethodsDescr: "Настройте способ доставки документов"
    },
    caseFileSetting: {
      title: "Номенклатура дел",
      caseFile: "Номенклатура дел",
      caseFileDescr:
        "Систематизированный перечень дел. В дела помещаются документы, относящиеся к одному вопросу или участку деятельности.",
      fileRetention: "Сроки хранения дел",
      fileRetentionDescr: "Перечень регламентированных сроков хранения дел."
    },
    associatedAppSetting: {
      title: "Настройки приложений-обработчиков",
      fileType: "Типы файлов",
      fileTypeDescr:
        "Типы файлов предназначены для группировки приложений-обработчиков.",
      associatedApp: "Приложения-обработчики",
      associatedAppDescr:
        "Справочник определяет расширения файлов, которые можно использовать в документах."
    }
  },
  lifeCycleState: {
    onControl: "На контроле",
    withoutControl: "Не на контроле",
    sending: "Оправка на исполнение",
    withoutExecute: "Не требует исполнения",
    onExecution: "На исполнении",
    executed: "Исполнен",
    draft: "Черновик",
    active: "Действующий",
    obsolete: "Недействующий",
    old: "Устаревший",
    terminated: "Расторгнут",
    closed: "Исполнен",
    сanceled: "Аннулирован",
    new: "Новый",
    acceptedForPayment: "Принят к оплате",
    paymentDenied: "Отказано в оплате",
    onApproval: "На согласовании",
    onRework: "На доработке",
    pendingSign: "На подписании",
    signed: "Подписан",
    unsigned: "Не подписан",
    aborted: "Прекращено",
    pendingReview: "На рассмотрении",
    reviewed: "Рассмотрен"
  },
  AssignmentQuery: {
    all: "Все задания и уведомления",
    onExicution: "На исполнение",
    onReview: "На приемку",
    onAcquaintance: "На ознакомление"
  },
  DocumentQuery: {
    accountingDocuments: "Финансовые документы",
    contractualDocuments: "Договоры",
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
    simpleDocument: "Простые документы"
  },
  createItemDialog: {
    recordManagementGroup: "Делопроизводственные документы",
    taskGroup: "Задачи",
    accountingDocumentsGroup: "Финансовые документы",
    contractualDocumentsGroup: "Договорные документы",
    supAgreement: "Дополнительное соглашение",
    incomingInvoice: "Входящий счет на оплату",
    contractStatement: "Акт выполненных работ",
    incomingTaxInvoice: "Счет-фактура полученный",
    outgoingTaxInvoice: "Счет-фактура выставленный",
    universalTransferDocument: "Универсальный передаточный документ",
    waybill: "Накладная",
    contract: "Договор",
    addendum: "Приложение к документу",
    memo: "Служебная записка",
    order: "Приказ",
    powerOfAttorney: "Доверенность",
    outgoingLetter: "Исходящее письмо",
    incomingLetter: "Входящее письмо",
    companyDirective: "Распоряжение",
    simpleDocument: "Простой документ",
    simpleTask: "Задача",
    actionItemExecutionTask: "Задача на исполнение поручения",
    acquaintanceTask: "Задача на ознакомление с документом"
  },
  sex: {
    male: "Мужской",
    female: "Женский"
  },
  panel: {
    profile: "Профиль",
    logout: "выйти"
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
    login: "Вход",
    loginFailed: "Неудачный вход",
    logout: "Выход",
    version: "Версии"
  },
  shared: {
    account: "Счет",
    conditions: "Условия",
    ourSide: "Наша сторона",
    toMainPage: "На главную",
    select: "Выбрать...",
    error: "Произошла ошибка",
    errorOccured:
      "Произошла ошибка при выполнении операции. Обратитесь к администратору системы",
    back: "Назад",
    more: "Подробнее",
    documents: "Документы",
    search: "Поиск...",
    access: "Доступ",
    from: "От",
    whom: "Кому",
    areYouSure: "Вы уверены?",
    confirm: "Подтверждение",
    required: "Заполните это поле",
    newRecord: "(Новая запись)",
    documentFlow: "Документопоток",
    status: "Состояние"
  },
  workFlow: {
    isElectronicAcquaintance: "Ознакомление в электронном виде",
    excludedPerformers: "Кроме",
    needsReview: "На контроле",
    actionItemExecution: "Задача на исполнение поручения",
    acquaintance: "Задача на ознакомление",
    reviewManager: "Задача на рассмотрение руководителем",
    freeApproval: "Свободное согласование",
    approval: "Согласование по регламенту"
  },
  contractCategories: {
    title: "Категории договоров",
    documentKinds: "Виды документов"
  },
  document: {
    remove: "Удалить",
    preview: "Предпросмотр",
    download: "Загрузка",
    saved: "Документ сохранен",
    lifeCycle: "Жизненый цикл",
    state: "Состояние",
    registrationState: "Регистрация",
    internalApprovalState: "Согласование",
    externalApprovalState: "Согл. с контрагентом",
    executionState: "Исполнение",
    controlExecutionState: "Контроль исполнения",
    tabs: {
      main: "Свойства",
      relations: "Связи",
      history: "История"
    },
    groups: {
      captions: {
        main: "ОСНОВНОЕ",
        numberAndDate: "ДАТА И НОМЕР",
        storing: "ХРАНЕНИЕ",
        lifeCycle: "ЖИЗНЕННЫЙ ЦИКЛ"
      }
    },
    fields: {
      accountNumber: "Номер счета",
      accountDate: "Дата счета",
      totalAmount: "Сумма",
      contract: "Договор",
      areYouSureCancelDocument:
        "Вы уверенны что хотите выйти? Не сохраненные данные будут утеряны",
      dated: "Дата от",
      name: "Имя",
      inResponseToId: "В ответ на",
      index: "Индекс",
      ourSignatoryId: "Подписал",
      counterpartySignatoryId: "Подписал",
      caseFileId: "Дело",
      placedToCaseFileDate: "Дата помещения",
      contactId: "Контакт",
      preparedById: "Подготовил",
      assigneeId: "Исполнитель",
      created: "Создан",
      modified: "Изменено",
      authorId: "Автор",
      registrationDate: "Дата документа",
      registrationNumber: "Рег. №",
      documentNumber: "Номер документа",
      correspondentId: "Контрагент",
      subject: "Содержание",
      documentKindId: "Вид документа",
      documentRegisterId: "Журнал регистрации",
      registrationState: "Регистрация",
      deliveryMethodId: "Способ доставки",
      addresseeId: "Адрессат",
      businessUnitId: "Огранизация",
      departmentId: "Отдел",
      leadingDocumentId: "Ведущий документ",
      documentTypeGuid: "Тип документа",
      regNumberDocument: "Вх. Рег. номер",
      validFrom: "Действителен c",
      validTill: "Действителен по",
      issuedToId: "Кому выдана"
    }
  },
  validation: {
    caseFile: {
      endDateLessThanBegin: "Дата конца не может быть меньше даты начала"
    },
    valueMustNotContainsSpaces: "В значении не должны присутствовать пробелы"
  },
  registrationPopup: {
    preliminaryRegistrationNumberMessage:
      "*Точный регистрационный № будет назначен после регистрации",
    preliminaryRegistrationNumber: "Предварительный регистрационный №",
    isCustomNumber: "Назначить номер самому",
    documentRegister: "Журнал регистрации",
    regNumberDocument: "Регистрационный №",
    registrationDate: "Дата регистрации",
    validation: {
      regNumberDocumentRequired: "Введите регистрационный № документа",
      documentRegisterRequired: "Выберите журнал регистрации",
      registrationDateRequired: "Введите дату регистрации документа"
    }
  },
  assignment: {
    placeholderSimple: "Введите комментарий",
    placeholderActionItemExicution: "Введите отчет",
    prefixes: {
      actionItemSupervisorAssignment: "Примите работы: ",
      actionItemExecutionAssignment: "Исполните: ",
      actionItemExecutionNotification: "Приняты работы: ",
      acquaintanceAssignment: "Ознакомьтесь: ",
      acquaintanceNotification: "Ознакомление с документом: ",
      acquaintanceFinishAssignment: "Завершите работы по ознакомлению: ",
      actionItemObserversNotification: "Начаты работы: "
    }
  },
  menu: {
    recordManagementGroup: "Делопроизводство",
    accountingDocuments: "Финансовые документы",
    contractualDocuments: "Договоры",
    contractCategories: "Категории договоров",
    supAgreement: "Дополнительное соглашение",
    "financial-archive": "Финансовый архив",
    accountingDocuments: "Финансовые документы",
    сontractsAndSupAgreements: "Договоры и доп.соглашения",
    contracts: "Договоры",
    personalSettings: "Персональные настройки",
    history: "История",
    group: "Группы",
    all: "Все",
    allDocument: "Все документы",
    internalDocuments: "Внутрение документы",
    incommingDocuments: "Входящие документы",
    outgoingDocuments: "Исходящие документы",
    filesType: "Типы файлов",
    currencies: "Валюты",
    "human-settlement": "Населенные пункты",
    "shared-directory": "Общие справочники",
    "document-circulation": "Документооборот",
    "company-structure": "Компания",
    contractors: "Контрагенты",
    paperwork: "Делопроизводство",
    docFlow: "Документооборот",
    inbox: "Входящие",
    administration: "Администрирование",
    roles: "Роли",
    subsitution: "Замена сотрудника",
    counterPart: "Контрагенты",
    company: "Компания",
    companies: "Организации",
    banks: "Банки",
    person: "Физические лица",
    jobTitle: "Должности",
    assignments: "Задания",
    task: "Задачи",
    simpleTask: "Простые задачи",
    businessUnit: "Наши организации",
    businessUnitRequired:
      "Поле наименование организации не должно быть пустым__TM",
    businessUnitAlreadyExists: "Такая организация уже существует__TM",
    department: "Подразделения",
    departmentRequired: "Поле наименование отдела не должно быть пустым__TM",
    departmentAlreadyExists: "Такой отдел уже существует__TM",
    employee: "Сотрудники",
    addingEmployee: "Добавление сотрудника",
    managersAssistant: "Помощники руководителей",
    generalDirectories: "Общие справочники",
    countries: "Страны",
    region: "Регионы",
    locality: "Населенные пункты",
    caseFile: "Номенклатура дел",
    fileRetentionPeriod: "Срок хранения дел",
    mailDeliveryMethod: "Способы доставки документов",
    documentRegistry: "Журналы регистрации",
    documentType: "Тип документа",
    documentKind: "Виды документов",
    registrationSetting: "Настройки регистрации",
    registrationGroup: "Группы регистрации",
    clericalWork: "Делопроизводство",
    contacts: "Контакты",
    associatedApp: "Обработчики приложений",
    fileType: "Типы файлов",
    invalidFileExtention: "Неверное расширение файла",
    IncomingLetter: "Входящие письма",
    outgoingLetter: "Исходящие письма",
    order: "Приказы",
    companyDirectives: "Распоряжения",
    simpleDocument: "Простые документы",
    addendum: "Приложения к документу",
    memo: "Служебные записки",
    powerOfAttorney: "Доверенности",
    allAssignments: "Все задания",
    simpleAssignments: "Простые задания",

    acquaintanceAssignments: "Задания на ознакомление",
    actionItemsExicutionAssignments: "Задания на исполнение",
    simpleNotices: "Простые уведомления",
    acquaintanceNotices: "Уведомления на ознакомления",
    actionItemsExicutionNotices: "Уведомления на поручения",
    allNotice: "Все уведомления",
    notices: "Уведомления",
    mainInfo: "Основная информация",
    relation: "Связи",
    outgoing: "Входящие",
    incomming: "Исходящие",

    user: "Пользователи",
    logs: "Логи"
  },
  buttons: {
    new: "Новые",
    obsolete: "Архив",
    all: "Все",
    showCard: "Карточка",
    downloadFile: "Загрузить файл",
    versions: "Версии",
    restart: "Рестартовать",
    abort: "Прекратить",
    start: "Запустить",
    acquaintance: "Ознакомлен",
    changePassword: "Сменить пароль",
    save: "Сохранить",
    add: "Добавить",
    completed: "Выполнено",
    accept: "Принять",
    rework: "На доработку",
    filter: "Фильтр",
    stop: "Прекратить",
    accept: "Принять",
    cancel: "Назад",
    delete: "Удалить",
    deleteLink: "Удалить ссылку",
    create: "Создать",
    createTaskByDocument: "Создать задачу на основе документа",
    send: "Отправить",
    register: "Зарегистрировать",
    preview: "Читать",
    download: "Скачать",
    back: "Назад",
    yes: "Да",
    no: "Нет",
    createAddendum: "Создать приложение",
    createRelation: "Cвязь",
    saveAndBack: "Сохранить и выйти"
  },
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
  translations: {
    fields: {
      correctedId: "Корректирует",
      isAdjustment: "Корректировочный",
      accountNumber: "Номер счета",
      accountDate: "Дата счета",
      isAutomaticRenewal: "С автопролонгацией",
      totalAmount: "Сумма",
      currencyId: "Валюта",
      IsStandard: "Типовой",
      IsStandardSupAgreement: "Типовое",
      responsibleEmployeeId: "Ответственный",
      supervisorIdRequired: "Введите контролера",
      isUnderControl: "На контроль",
      draft: "Черновик",
      underReview: "На приемке",
      recipient: "Субъект прав",
      accessRightDocument: "Доступ к документу",
      contactName: "Имя контакта",
      mailDeliveryMethod: "Способ доставки документа",
      whom: "Кому",
      fromWhom: "От кого",
      for: "для",
      from: "От: ",
      addresseeId: "Адресат",
      addresseeIdRequired: "Выберите адресата",
      assigneeId: "Исполнитель",
      assigneeIdRequired: "Введите исполнителя",
      jobTitlesNameAlreadyExists: "Такая должность уже существует",
      extensionPatternRule: "Пожалуйста введите валидное расширение",
      filesType: "Типы файлов",
      fax: "Факс",
      accessRight: "Право доступа",
      accessRights: "Права доступа",
      storing: "Хранение",
      code: "Код",
      codeRequired: "Введите код",
      codeRule: "Код должен быть без пробелов",
      codeAlreadyExists: "Код должен быть уникальным",
      name: "Наименование",
      nameRequired: "Введите наименование",
      nameAlreadyExists: "Такое наименование уже существует",
      shortName: "Короткое наименование",
      shortNameRequired: "Введите короткое наименование",
      shortNameAlreadyExists: "Такое короткое наименование уже существует",
      legalName: "Юридическое наименование",
      legalNameRequired: "Введите юридическое наименование",
      personalData: "Персональные данные",
      fullName: "ФИО",
      fullNameRequired: "ФИО не должно быть пустым",
      fullNameAlreadyExists: "Такое Имя уже существует",
      firstName: "Имя",
      firstNameRequired: "Введите имя",
      lastName: "Фамилия",
      lastNameRequired: "Введите фамилию",
      middleName: "Отчество",
      middleNameRequired: "Введите отчество",
      from: "От",
      dateOfBirth: "Дата рождения",
      dateOfBirthRequired: "Выберите дату рождения",
      sex: "Пол",
      role: "Роль",
      isSystem: "Системная роль",
      isSingleUser: "Однопользовательская роль",
      roleRequired: "Выберите роль сотруднику",
      addingRoles: "Добавление роли сотруднику",
      addNewRoles: "Добаление роли сотрудника прошло успешно",
      addNewRolesError: "При добаление роли сотрудника произошла ошибка",
      assignRole: "Назначить роль сотруднику",
      sexRequired: "Выберите пол",
      APN: "Должность, место работы и номер телефона",
      address: "Адрес",
      addressRequired: "Введите адрес",
      legalAddress: "Юридический адрес",
      legalAddressRequired: "Введите юридический адрес",
      postAddress: "Почтовый адрес",
      postAddressRequired: "Введите почтовый адрес",
      phones: "Телефон",
      phonesRequired: "Введите телефон",
      phoneFormat: "Номер должен начинаться с +993",
      phoneRule: "Номер введен не верно",
      userName: "Логин пользователя",
      userNameRequired: "Введите логин пользователя",
      userNameRule: "Логин пользователя должен быть уникальным",
      userNamePattern: "Логин должен быть без пробелов и символов",
      email: "Email",
      emailRequired: "Введите email",
      emailRule: "Email введен не верно",
      emailAlreadyExists: "Сотрудник с таким email уже существует",
      webSite: "Веб-сайт",
      webSiteRequired: "Введите веб-сайт",
      homepage: "Домашняя страница",
      tin: "ИНН",
      tinRequired: "Введите ИНН",
      tinAlreadyExists: "Такой ИНН уже существует",
      tinRule: "Инн должен быть без пробелов",
      account: "Номер счетa",
      accountRequired: "Введите номер счета",
      permissions: "Разрешения",
      nonresident: "Нерезидент",
      search: "Поиск",
      status: "Статус",
      statusRequired: "Выберите статус",
      note: "Примечание",
      noteRequired: "Введите примечание",
      description: "Описание",
      descriptionRequired: "Введите описание",
      startDate: "Начало",
      startDateRequired: "Выберите начало",
      endDate: "Конец",
      endDateRequired: "Выберите конец",
      comment: "Комментарий",
      commentRequired: "Введите комментарий",
      password: "Пароль",
      passwordRequired: "Введите пароль",
      passwordRule:
        "Пароль должен состоять из хотя бы одной латинской  буквы в верхнем регистре и в нижнем регистре  одной цифры и хотя бы одного символа",
      passwordChange: "Изменить пароль:",
      confirmPassword: "Подтвердите пароль",
      confirmPasswordRequired: "Введите подтверждения пароля",
      confirmPasswordRule: "Пароль и Подтвердить пароль не подходят",
      preparesResolution: "Готовит резолюцию для руководителя",
      prepared: "Подготовил",
      preparedRequired: "Введите того кто подготовил",
      signatory: "Подписал",
      signatoryRequired: "Введите того кто подписал",
      correspondentAccount: "Корр. счет",
      bic: "Уникальный идентификатор банка",
      bicRequired: "Введите уникальный идентификатор банка",
      bicAlreadyExists: "Такой идентификатор уже существует",
      type: "Тип",
      typeRequired: "Введите тип",
      extension: "Раcширение",
      filesTypeId: "Тип файла",
      filesTypeIdRequired: "Тип файла не может быть пустым",
      extensionRequired: "Расширение не может быть пустым",
      extensionAlreadyExists: "Такое расширение уже есть",
      nameShouldNotBeMoreThan: "Не должно быть больше 60 символов",
      orderId: "Приказ",
      company: "Компания",
      companyRequired: "Выберите компанию",
      countryId: "Страна",
      countryIdRequired: "Выберите страну",
      countryAlreadyExists: "Такая страна уже существует",
      counterPart: "Контрагент",
      counterPartRequired: "Выберите контрагента",
      documentGroupId: "Категория",
      documentGroupIdRequired: "Выберите категорию",
      contactId: "Контактное лицо",
      regionId: "Регион",
      regionIdRequired: "Выберите регион",
      localityId: "Населенный пункт",
      localityIdRequired: "Выберите населенный пункт",
      currencyId: "Валюта",
      currencyIdRequired: "Введите валюту",
      maxLength: "Максимальное количество символов должно быть не больше",
      currencyAlreadyExists: "Такая валюта уже существует",
      alphaCode: "Альфа код",
      alphaCodeRequired: "Введите альфа код валюты",
      alphaCodeAlreadyExists: "Такой код валюты уже существует",
      fractionName: "Наименование фракции",
      fractionNameRequired: "Введите наименования дробной части валюты",
      fractionNameAlreadyExists:
        "Такое наименования дробной части валюты уже существует",
      isDefault: "По умолчанию",
      numericCode: "Номер кода",
      needsReview: "На приемку",
      numericCodeRequired: "Введите цифровой код валюты",
      numericCodeAlreadyExists: "Такое цифровой код валюты уже существует",
      bankId: "Банк",
      bankIdRequired: "Выберите банк",
      userId: "Сотрудник",
      userIdRequired: "Выберите сотрудника",
      substituteId: "Заменяющий сотрудник",
      substituteIdRequired: "Выберите заменяющего сотрудника",
      parentId: "Родитель",
      comments: "Коментарии",
      managerId: "Руководитель",
      managerIdRequired: "Выберите руководителя",
      ceo: "Руководитель",
      ceoRequired: "Выберите руководителя",
      assistantId: "Ассистент",
      assistantIdRequired: "выберите ассистента",
      businessUnitId: "Организация",
      businessUnitIdRequired: "Выберите организацию",
      businessUnitAlreadyExists: "Такая организация уже существует",
      headCompanyId: "Головная организация",
      createdDate: "Дата создания",
      headOfficeId: "Головное подразделение",
      headOfficeIdRequired: "Выберите головная организация",
      jobTitleId: "Должность",
      jobTitleIdRequired: "Выберите должность",
      jobTitleIdAlreadyExists: "Такая должность уже существует",
      departmentId: "Подразделение",
      departmentIdRequired: "Выберите подразделение",
      departmentRequired: "Поле наименование отдела не должно быть пустым",
      departmentAlreadyExists: "Такой отдел уже существует",
      personId: "Физическое лицо",
      personIdRequired: "Выберите физическое лицо",
      acting: "Действующая",
      closed: "Закрытая",
      male: "Мужской",
      female: "Женский",
      title: "Заголовок",
      titleRequired: "Введите заголовок",
      titleAlreadyExists: "Такой загаловок уже существует.",
      location: "Место нахождения",
      retentionPeriodId: "Срок хранения дел",
      retentionPeriodIdRequired: "Выберите срок хранения дел",
      index: "Индекс",
      indexRequired: "Введите индекс",
      indexRule: "Индекс должен быть без пробелов",
      indexAlreadyExists: "Такой индекс уже существует",
      retentionPeriod: "Срок хранения (лет)",
      retentionPeriodRequired: "Введите срок хранения (лет)",
      documentFlow: "Документопоток",
      documentFlowRequired: "Выберите документопоток",
      responsibleId: "Ответственный за группу регистрации",
      responsibleIdRequired: "Введите ответственного за группу регистрации",
      inProccess: "В процессе",
      all: "Все",
      main: "Основное",
      incomingEnum: "Входящий",
      outcomingEnum: "Исходящий",
      inner: "Внутренний",
      contract: "Договор",
      contracts: "Договоры",
      isRegistrationAllowed: "Разрешена ли регистрация",
      year: "Год",
      continuous: "Сквозной",
      numberingPeriod: "Период нумерации",
      numberingPeriodRequired: "Выберите период нумерации",
      element: "Формирование номера документа",
      elementRequired: "Выберите формирование номера документа",
      number: "№ - Порядковый номер",
      year2Place: "Год, 2 цифры",
      year4Place: "Год, 4 цифры",
      quarter: "Квартал",
      month: "Месяц",
      inResponseToId: "В ответ на",
      leadingNumber: "№ ведущего документа",
      docKindCode: "Код вида документа",
      log: "Журнал регистрации (индекс)",
      caseFile: "Дело (индекс)",
      departmentCode: "Подразделение (код)",
      buCode: "Наша организация (код)",
      cPartyCode: "Контрагент (код)",
      customString: "Произвольная строка",
      registrPlace: "Группа регистрации (индекс)",
      separator: "Разделитель",
      numberOfDigitsInNumber: "Количество цифр в номере",
      numberOfDigitsInNumberRequired: "Введите количество цифр в номере",
      registration: "Зарегистрироваться",
      cancelRegistration: "Отменить регистрацию",
      registrationState: "Регистрация",
      registrationStateRequired: "Выберите регистрацию",
      registered: "Зарегистрирован",
      notRegistered: "Не зарегистрирован",
      reserved: "Зарезервирован",
      executionState: "Состояние исполнения документа",
      executionStateRequired: "Выберите cостояние исполнения документа",
      onReview: "На рассмотрении",
      sending: "Отправка на исполнение",
      withoutExecute: "Не требует исполнения",
      onExecution: "На исполнении",
      executed: "Исполнен",
      aborted: "Прекращено",
      subject: "Содержание",
      subjectRequired: "Введите Содержание",
      correspondentId: "Кореспондент",
      correspondentIdRequired: "Выберите кореспондент",
      deliveryMethodId: "Способ доставки документа",
      deliveryMethodIdRequired: "Выберите способ доставки документа",
      leadingDocumentId: "Ведущий документ",
      leadingDocumentIdRequired: "Введите ведущий документ",
      caseFileId: "Дело",
      caseFileIdRequired: "Выберите дело",
      placedToCaseFileDate: "Дата помещения",
      outgoingDocumentId: "В ответ на...",
      dated: "Дата от",
      regNumberDocument: "Регистрационный №",

      files: "Файлы",
      documentKindId: "Вид документа",
      documentKindIdRequired: "Выберите вид документа",
      documentRegisterId: "Журнал регистрации",
      numerable: "Нумерумый",
      notNumerable: "Не нумеруемый",
      registrable: "Регистрируемый",
      numberingType: "Тип нумерации",
      numberingTypeRequired: "Выберите тип нумерации",
      generateDocumentName: "Формировать имя документа автоматически",
      autoNumbering: "Автоматическая нумерация",
      documentTypeGuid: "Тип документа",
      documentTypeGuidRequired: "Выберите тип документа",
      registerType: "Тип журнала",
      registerTypeRequired: "Выберите тип журнала",
      registration: "Регистрация",
      numbering: "Нумерация",
      moreSettings: "Дополнительные настройки",
      moreAbout: "Подробнее",
      settingType: "Тип настройки регистрации документов",
      availableActions: "Действие по отправке",
      availableActions: "Действие по отправке",
      numberingSection: "Разрез нумерации",
      numberingSectionRequired: "Выберите разрез нумерации",
      department: "Подразделение",
      businessUnit: "Наша организация",
      noSection: "Без разреза",
      leadingDocument: "Ведущий документ",
      priority: "Приоритет",
      canRegisterIncoming: "Регистрирует входящие документы",
      canRegisterOutgoing: "Регистрирует исходящие документы",
      canRegisterInternal: "Регистрирует внутренние документы",
      canRegisterContractual: "Регистрирует договорные документы",
      invalidExeption: "Недоступное разширение",
      uploadSuccess: "Загрузка файла прошла успешна",
      uploadError: "Не удалось загрузить файл",
      members: "Участники",
      membersRequired: "Выберите участников",
      registrationGroupId: "Группа регистрации",
      registrationGroupIdRequired: "Выберите группу регистрации",
      fractionName: "Дробная часть",
      fractionNameRequired: "Введите дробную часть",
      isDefault: "По умолчанию",
      isDefaultDocumentKind: "Документ по умолчанию",
      numericCode: "Цифровой код",
      numericCodeRequired: "Введите цифровой код",
      currentNumber: "Текущий номер",
      currentNumberRequired: "Введите текущий номер",
      areYouSureCancelRegistration:
        "Вы уверены что хотите отменить регистрацию",
      validFrom: "Действителен c",
      validTill: "Действителен по",
      daysToFinishWorks: "Дней для завершения",
      validTillRequired: "Введите по какой срок действительна доверенность",
      issuedToId: "Кому выдана",
      issuedToIdRequired: "Введите кому выдана доверенность",
      deadLine: "Срок",
      deadLineRequired: "Заполните срок",
      deadLineRule: "Дата и время не должны быть просроченны",
      parallel: "паралельно",
      gradually: "друг за другом",
      start: "Старт",
      accessDenied: "Доступ запрещен",
      fullAccess: "Полный доступ",
      observers: "Наблюдатели",
      performers: "Исполнители",
      performersRequired: "Выберите исполнителя",
      acquaintMembers: "Кого ознакомить",
      acquaintMembersRequired: "Выберите кого нужно ознакомить",
      performerId: "Исполнитель",
      reading: "Просмотр",
      edit: "Изменение",
      create: "создание",
      highImportance: "Высокая важность",
      middleImportance: "Средняя важность",
      lowImportance: "Низкая важность",
      subjectTask: "Тема",
      authorId: "Автор",
      importanceMessage: "Это задание имеет высокую важность",
      completedMessage: "Задание выполнено",
      attachmentSimpleTask: "Вложение к простой задаче",
      createDocument: "Создать документ",
      completed: "Завершенно",
      regionAlreadyExists: "Такой регион уже существует",
      localityAlreadyExists: "Такой населенный пункт уже существует",
      me: "Я",
      supervisorId: "Конролер",
      maxDeadline: "Максимальный срок",
      coAssignees: "Соисполнители",
      actionItem: "Поручение",
      actionItemRequired: "Введите поручение",
      assignedById: "Постановщик"
    },
    headers: {
      addNewRecipient: "Добавить субъект прав",
      addDocumentKind: "Добавление вида документа",
      addendum: "Приложение к документу",
      memo: "Служебная записка",
      order: "Приказ",
      powerOfAttorney: "Доверенность",
      outgoingLetter: "Исходящее письмо",
      IncomingLetter: "Входящее письмо",
      companyDirective: "Распоряжение",
      simpleDocument: "Простой документ",
      addDoctKindSucces: "Добавление вида документа прошло успешно",
      addDoctKindError: "При добавлении  вида документа произошла ошибка",
      updateDocKindSucces: "Редактирование вида документа прошло успешно",
      updateDocKindError: "При редактирование вида документа  произошла ошибка",
      editDocumentKind: "Редактирование вида документа",
      addDocumentRegistry: "Добавление журнала регистрации",
      addDoctRegistrySucces: "Добавление журнала регистрации прошло успешно",
      addDoctRegistryError:
        "При добавлении  журнала регистрации  произошла ошибка",
      editDocumentRegistry: "Редактирование журнала регистрации",
      updateDocRegistrySucces:
        "Редактирование журнала регистрации  прошло успешно",
      registrationSucceded: "Документ успешно зарегистрирован",
      registrationError: "При регистрации документа произошла ошибка",
      updateDocRegistryError:
        "При редактирование журнала регистрации  произошла ошибка",
      addRegistrationGroup: "Добавление групп регистрации",
      editRegistrationGroup: "Редактирование групп регистрации",
      simpleTask: "Простая задача",
      simpleAssignment: "Простое задание",
      actionItemExicutionAssignment: "Задание на Исполнение",
      acquaintanceAssignment: "Задача на ознакомление",
      versions: "Версии",
      attachment: "Вложения",

      moreAbout: "Подробнее"
    },

    taskMessage: {
      commentRequired: "Введите отчет о выполнении поручения",
      sendComment: "Отправить отчет",
      attachmentRequired: "Добавьте вложение",
      documentAlreadyHasBeen: "Такой документ уже существует",
      Completed: "Задание завершенно",
      UnderReview: "На приемке",
      from: "От сотрудника:",
      created: "Созданно:",
      message: "Сообщение: ",
      autoGenerate: "<Имя будет сгенерированно автоматически>",
      forAcquaintance: "На ознакомление:",
      completeAssignment: "Выполните задание",
      acquaintanceDocument: "Ознакомтесь с документом(и)",
      InProcess: "В процессе",
      Unread: "Не прочитанно",
      Read: "Прочитанно",
      expired: "Просроченно"
    },
    commentType: {
      0: "Задача",
      3: "Задание",
      4: "Уведомление"
    }
  },
  registrationSettings: {
    caption:"Настройка регистрации",
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
