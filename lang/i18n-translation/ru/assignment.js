import assignmentType from "./assignmentType"
export default {
  fields: {
    newDeadline: "Новый срок",
    deadline: "Срок",
    authorId: "Автор",
    status: "Статус",
    created: "Создано",
    subject: "Содержание",
  },
  quickFilter: {
    all: "Все", new: "Новые", inProcess: "В работе", expired: "Просроченые", monthAgo: "30 дней"
  },
  confirmMessage:{
    sureDocumentReviewExploredConfirmetion:"Вы действительно ознакомились с документом?",
    sureDocumentReviewForwardConfirmetion:"Вы действительно хотите переадресовать рассмотрение документа?",
    sureDocumentReviewAddresolutionConfirmetion:"Вы действительно вынесли резолюцию по документу?",
    sureDocumentReviewForwardConfirmetion:"Вы действительно хотите переадресовать рассмотрение документа?",
    sureActionItemForReworkConfirmetion:"Вы действительно хотите отправить поручение на доработку?",
    sureActionItemAcceptConfirmetion:"Вы действительно хотите принять работы по поручению?",
    sureActionItemDoneConfirmetion:"Вы действительно хотите выполнить поручения?",
    sureReturnManagersAssistant: "Вы уверенны что хотите вернуть помощнику?",
    sureComplete: "Вы действительно хотите выполнить задание?",
    sureAcquaintance: "Вы действительно ознакомились с документом?",
    sureFinishAcquaintance:
      "Вы уверенны что хотите завершить ознакомление?",
    sureCompleteSupervisor: "Подтвердите что бы завершить задачу",
    sureRework: "Вы действительно хотите отправить задачу на доработку?",
    
    //TODO Добавить перевод предупреждения  о том что не создано ни одного поручение : выполнить задание без создание и отправки на поручение?
  },
  takeIntoMessage:
    "После принятия к сведению задание завершится без исполнения",
  acceptAssignmentMessage: "Вы действительно хотите принять задачу?",
  readdressToEmployee: "Переадресовать сотруднику",

  result: {
    Acquainted: "Ознакомлен",
    SendForReview: "Отправлено на рассмотрение",
    Complete: "Завершено",
    Accept: "Принято",
    ForRework: "На доработку",
    AddAssignment: "Отправлено на исполнение",
    AddResolution: "Вынесена резолюция",
    Explored: "Принято к сведению",
    Forward: "Переадресовано",
    ForExecution: "Отправлено на исполнения"
  },

  status: {
    InProcess: "В процессе",
    Draft: "Черновик",
    Suspended: "Приостановленно",
    Completed: "Завершено",
    Aborted: "Прекращено",
    UnderReview: "На приемке"
  },
  type: assignmentType,
  prefixes: {
    actionItemSupervisorAssignment: "Примите работы: ",
    actionItemExecutionAssignment: "Исполните: ",
    actionItemExecutionNotification: "Приняты работы: ",
    acquaintanceAssignment: "Ознакомьтесь: ",
    acquaintanceNotification: "Ознакомление с документом: ",
    acquaintanceFinishAssignment: "Завершите работы по ознакомлению: ",
    actionItemObserversNotification: "Начаты работы: "
  },
  comment: "Комментарий",
  body: {
    actionItemSupervisorAssignment: "Введите комментарий к отчету исполнителя...",
    acquaintanceAssignment: "Оставьте комментарий прежде чем выполнить задание...",
    simpleAssignment: "Введите текст задания...",
    acquaintanceFinishAssignment: "Введите текст задания...",
    actionAtiemExecution: "Оставьте отчет по исполнению поручения...",
    preparingDraftResolutionAssignment: "Введите текст задания...",
    reviewDraftResolutionAssignment: "Введите текст задания...",
    reviewResolutionAssignment: "Текст резолюции...",
    reviewManagerAssignment: "Текст резолюции..."
  },
  validation: {
    bodyRequired: "Введите текст задания...",
  }
}
