import assignmentType from "./assignmentType"
export default {
  prefixes: {
    actionItemSupervisorAssignment: "Примите работы: ",
    actionItemExecutionAssignment: "Исполните: ",
    actionItemExecutionNotification: "Приняты работы: ",
    acquaintanceAssignment: "Ознакомьтесь: ",
    acquaintanceNotification: "Ознакомление с документом: ",
    acquaintanceFinishAssignment: "Завершите работы по ознакомлению: ",
    actionItemObserversNotification: "Начаты работы: "
  },
  returnManagersAssistantMessage: "Вы уверенны что хотите вернуть помощнику",
  sureCompleteMessage: "Вы действительно выполнили задачу",
  sureAcquaintanceMessage: "Вы действительно ознакомились с документом",
  sureCompleteAcquaintanceMessage:
    "Вы уверенны что хотите завершить ознакомление",
  sureCompleteSupervisor: "Потвердите что бы завершить задачу",
  sureReworkMessage: "Вы уверенны что хотите отправить на доработку",
  takeIntoMessage:
    "После принятия к сведению задание завершится без исполнения",
  acceptAssignmentMessage: "Вы действительно приняли задачу",
  readdressToEmployee: "Переадресовать сотруднику",
  fields: {
    newDeadline: "Новый срок",
  },
  result: {
    Acquainted: "Ознакомлен",
    SendForReview: "Отправлено на рассмотрение",
    Complete: "Завершено",
    Accept: "Принято",
    ForRework: "На доработку",
    AddAssignment: "Отправлено на исполнение",
    AddResolution: "Вынесена резолюция",
    Explored: "Принято к сведению",
    Forward: "Переадресовано"
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
