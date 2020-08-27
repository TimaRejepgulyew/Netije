export const DocumentType = {
  IncomingLetter: "Входящее письмо",
  OutgoingLetter: "Исходящее письмо",
  CompanyDirective: "Распоряжение",
  SimpleDocument: "Простой документ",
  Addendum: "Приложение к документу",
  PowerOfAttorney: "Доверенность",
  Order: "Приказ",
  Memo: "Служебная записка",
  InternalDocument: "Внутрение документы",
  SupAgreement: "Дополнительные соглашения",
  IncomingInvoice: "Входящие счета на оплату",
  ContractStatement: "Акты выполненных работ",
  IncomingTaxInvoice: "Счет-фактуры полученные",
  OutgoingTaxInvoice: "Счет-фактуры выставленные",
  UniversalTransferDocument: "Универсальные передаточный документы",
  Waybill: "Накладные",
  Contract: "Договоры"
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
  type: { ...DocumentType },
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

  },
  validation:{
    leadingDocumentIdRequired: "Введите ведущий документ",
  }
};
