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
  Contract: "Договор"
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
  type: DocumentType,
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
      lifeCycle: "ЖИЗНЕННЫЙ ЦИКЛ",
      versions: "Версии"
    }
  },
  fields: {
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
    addresseeId: "Адрессат",
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
    whom: "Кому"
  },
  validation: {
    validTillRequired:"Введите до какого",
    addresseeIdRequired:"Введите адрессата",
    nameRequired:"Введите наименование",
    subjectRequired: "Введите содержания",
    preparedRequired:"Введите того кто подготовил",
    documentKindIdRequired: "Введите вид документа",
    departmentIdRequired: "Выберите подразделение",
    businessUnitIdRequired: "Выберите организацию",
    counterPartRequired: "Выберите контрагента",
    documentGroupIdRequired: "Выберите категорию",
    leadingDocumentIdRequired: "Введите ведущий документ"
  }
};
