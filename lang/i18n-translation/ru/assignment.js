import assignmentType from "./assignmentType";
export default {
  addApprover: "Добавление согласующего",
  gridFileName: "Задание",
  stores: {
    doNotSend: "Не отправлять",
    sendForApproval: "Отправить на согласование",
    sendNotice: "Отправить уведомление"
  },
  fields: {
    action: "Действие",
    approved: "Согласованно",
    approver: "Согласующий",
    approvers: "Согласующий",
    newDeadline: "Новый срок",
    deadline: "Срок",
    authorId: "Автор",
    status: "Статус",
    created: "Создано",
    subject: "Содержание"
  },
  quickFilter: {
    all: "Все",
    new: "Новые",
    inProcess: "В работе",
    expired: "Просроченые",
    monthAgo: "30 дней",
    today: "Сегодня"
  },
  confirmMessage: {
    sureAbortConfirmation: "Вы действительно ходтите прекратить задачу?",
    sureApprovalReworkAssignmentConfirmation:
      "Вы действительно исправили задачу",
    sureFreeApprovalAssignmentConfirmation:
      "Вы действительно хотите согласовать документ?",
    sureFreeApprovalFinishAssignment:
      "Вы действительно хотите завершить согласование документа?",
    sureFreeApprovalConfirmation:
      "Вы действительно хотите переадресовать согласование",
    sureApprovalForwardConfirmation:
      "Вы действительно хотите переадресовать согласование документа?",
    sureAddResolutionAllSelection:
      "Вы действительно хотите утвердить резолюции по все выделенным заданиям?",
    headerHasChildActionItem: "Прекратить подчиненные поручения?",
    hasChildActionItem: "Есть незавершенные подчиненные поручения.",
    sureDocumentReviewAcceptConfirmation:
      "После принятия к сведению задание завершится без исполнения",
    sureDocumentReviewReworkConfirmation:
      "Вы действительно хотите вернуть помощнику на доработку?",
    sureDocumentReviewApproveRosolutionConfirmation:
      "Вы действительно хотите утвердить проект резолюции?",
    sureDocumentReviewSendToResolutionConfirmation:
      "Вы действительно хотите отправить резолюцию на рассмотрение?",
    sureDocumentReviewSendToAssigneeConfirmation:
      "Вы действительно отправили документ на исполнение?",
    sureDocumentReviewExploredConfirmation:
      "Вы действительно ознакомились с документом?",
    sureDocumentReviewForwardConfirmation:
      "Вы действительно хотите переадресовать рассмотрение документа?",
    sureDocumentReviewAddresolutionConfirmation:
      "Вы действительно вынесли резолюцию по документу?",
    sureActionItemForReworkConfirmation:
      "Вы действительно хотите отправить поручение на доработку?",
    sureActionItemAcceptConfirmation:
      "Вы действительно хотите принять работы по поручению?",
    sureActionItemDoneConfirmation:
      "Вы действительно хотите выполнить поручения?",
    sureReturnManagersAssistant: "Вы уверенны что хотите вернуть помощнику?",
    sureComplete: "Вы действительно хотите выполнить задание?",
    sureAcquaintance: "Вы действительно ознакомились с документом?",
    sureFinishAcquaintance: "Вы уверенны что хотите завершить ознакомление?",
    sureCompleteSupervisor: "Подтвердите что бы завершить задачу",
    sureRework: "Вы действительно хотите отправить задачу на доработку?",
    sureAccept: "Вы действительно хотите принять задачу?"

    //TODO Добавить перевод предупреждения  о том что не создано ни одного поручение : выполнить задание без создание и отправки на поручение?
  },
  takeIntoMessage:
    "После принятия к сведению задание завершится без исполнения",
  readdressToEmployee: "Переадресовать сотруднику",

  result: {
    Acquainted: "Ознакомлен",
    SendForReview: "Отправлено на рассмотрение",
    Complete: "Завершено",
    Accept: "Принято",
    Informed: "Принято к сведению",
    ForRework: "На доработку",
    AddAssignment: "Отправлено на исполнение",
    AddResolution: "Вынесена резолюция",
    Explored: "Принято к сведению",
    Forward: "Переадресовано",
    ForExecution: "Отправлено на исполнения",
    Completed: "Завершено",
    Approved: "Согласованно",
    Reworked: "Исправленно"
  },

  status: {
    All: "Все",
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
    freeApprovalAssignment: "Введите текст задания...",
    actionItemSupervisorAssignment:
      "Введите комментарий к отчету исполнителя...",
    acquaintanceAssignment:
      "Оставьте комментарий прежде чем выполнить задание...",
    simpleAssignment: "Введите текст задания...",
    acquaintanceFinishAssignment: "Введите текст задания...",
    actionAtiemExecution: "Оставьте отчет по исполнению поручения...",
    preparingDraftResolutionAssignment: "Введите текст задания...",
    reviewDraftResolutionAssignment: "Введите текст задания...",
    reviewResolutionAssignment: "Текст резолюции...",
    reviewManagerAssignment: "Текст резолюции..."
  },
  validation: {
    approversRequired: "Выберите согласующих",
    bodyRequired: "Введите текст задания..."
  }
};
