export const DocumentType = {
  IncomingLetter: "Входящее письмо",
  OutgoingLetter: "Исходящее письмо",
  CompanyDirective: "Распоряжение",
  SimpleDocument: "Простой документ",
  Addendum: "Приложение к документу",
  PowerOfAttorney: "Доверенность",
  Order: "Приказ",
  Memo: "Служебная записка",
  InternalDocument: "Внутрений документ",
  SupAgreement: "Дополнительное соглашение",
  IncomingInvoice: "Входящий счет на оплату",
  ContractStatement: "Акт выполненных работ",
  IncomingTaxInvoice: "Счет-фактура полученный",
  OutgoingTaxInvoice: "Счет-фактура выставленный",
  UniversalTransferDocument: "Универсальный передаточный документ",
  Waybill: "Накладная",
  Contract: "Договор",
  DocumentTemplate: "Шаблон документов"
};
export default {
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
  refreshMergeFieldParams: "Обновить параметры",
  type: DocumentType,
  confirmMessage: {
    sureDeleteVersion: "Удаление версии необратимо"
  },
  quickFilter: {
    All: "Все",
    New: "Новый",
    Obsolete: "Архив",
    Today: "Сегодня"
  },
  tabs: {
    main: "Свойства",
    relations: "Связи",
    history: "История",
    tasks: "Задачи"
  },
  groups: {
    captions: {
      main: "Основное",
      numberAndDate: "Дата и номер",
      storing: "Хранение",
      lifeCycle: "Жизненный цикл",
      versions: "Версии",
      params: "Параметры"
    }
  },
  fields: {
    value: "Значение",
    status: "Состояние",
    lifeCycle: "Жизненый цикл",
    state: "Состояние",
    registrationState: "Регистрация",
    internalApprovalState: "Согласование",
    externalApprovalState: "Согл. с контрагентом",
    executionState: "Исполнение",
    controlExecutionState: "Контроль исполнения",
    note: "Комментарий",
    invalidExeption: "Недоступное разширение",
    isStandardSupAgreement: "Типовое",
    isAdjustment: "Корректировочный",
    correctedId: "Корректирует",
    isAutomaticRenewal: "С автопролонгацией",
    currencyId: "Валюта",
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
    signatory: "Подписал",
    counterPart: "Контрагент",
    counterpartySignatoryId: "Подписал",
    caseFileId: "Дело",
    placedToCaseFileDate: "Дата помещения",
    contactId: "Контактное лицо",
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
    addresseeId: "Адресат",
    businessUnitId: "Огранизация",
    departmentId: "Отдел",
    leadingDocumentId: "Ведущий документ",
    documentTypeGuid: "Тип документа",
    regNumberDocument: "Вх. Рег. номер",
    validFrom: "Действителен c",
    validTill: "Действителен по",
    issuedToId: "Кому выдана",
    daysToFinishWorks: "Дней для завершения",
    documentGroupId: "Категория",
    isStandard: "Типовой",
    ourSide: "Наша сторона",
    responsibleEmployeeId: "Ответственный",
    conditions: "Условия",
    accountDate: "Дата счета",
    whom: "Кому",
    documentKinds: "Виды документов",
    businessUnits: "Огранизации",
    departments: "Отделы",
    description: "Описание"
  },
  validation: {
    paramsValueRequired: "Введите значение",
    paramsValueRule: "Значение введенно не корректно",
    stateRequired: "Введите состояние",
    issuedToIdRequired: "Введите кому выдана доверенность",
    ourSignatoryRequired: "Введите того кто подписал",
    validTillRequired: "Введите по какой срок действительна доверенность",
    addresseeIdRequired: "Введите адресата",
    nameRequired: "Введите наименование",
    subjectRequired: "Введите содержания",
    preparedRequired: "Введите того кто подготовил",
    documentKindIdRequired: "Введите вид документа",
    departmentIdRequired: "Выберите подразделение",
    businessUnitIdRequired: "Выберите организацию",
    counterPartRequired: "Выберите контрагента",
    documentGroupIdRequired: "Выберите категорию",
    leadingDocumentIdRequired: "Введите ведущий документ",
    contractRequired: "Выберите договор",
    documentTypeRequired: "Выберите тип документа"
  },
  headers: {
    documentTemplate: "Шаблон документа",
    pdfFileReader: "Просмотр pdf файлов",
    documentEditor: "Редактор документов",
    documentTemplate: "Шаблон документа",
    imageViewer: "Просмотр изображений",
    xlsxEditor: "Редактор Exсel документов"
  }
};
