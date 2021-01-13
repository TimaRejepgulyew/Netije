export const TaskType = {
  SimpleTask: "Простая задача",
  AcquaintanceTask: "Задача на ознакомление с документом",
  ActionItemExecutionTask: "Задача на исполнение поручения",
  DocumentReviewTask: "Задача на рассмотрение документа",
  FreeApprovalTask: "Задача на cвободное согласование",
  ExchangeDocumentProcessingTask: "Задача на эл. обмен",
  IntranetExchangeDocumentProcessingTask: "Задача на внутренний эл. обмен"
};
export default {
  compoundActionItem: "Состовное поручение",
  actionItemType: {
    Component: "Пункт поручения"
  },
  addNewAssineers: "Добавьте исполнителей",
  sources: {
    assignment: "Задание",
    notification: "Уведомление"
  },
  quickFilter: {
    All: "Все",
    InProcess: "В работе",
    Expired: "Просроченные",
    MonthAgo: "30 дней",
    Today: "Сегодня"
  },
  confirm: {
    abortingReason: "Причина прекращения"
  },
  message: {
    acquaintDocumentMessage:
      "Ознакомьтесь с документом, подойдите к ответственному и поставьте личную подпись",
    nothaveAccessRight: "Не достаточно прав, добавьте права для этой задачи ",
    sureAbortTask: "Вы действительно хотите прекратить задачу?",
    sureRestartTask: "Вы действительно хотите рестартавать задачу?",
    sureStartTask: "Вы действительно хотите стартовать задачу?"
  },
  status: {
    InProcess: "В процессе",
    Draft: "Черновик",
    Suspended: "Приостановленно",
    Completed: "Завершено",
    Aborted: "Прекращено",
    UnderReview: "На приемке"
  },
  type: TaskType,
  prefixes: {
    actionItemExecutionTask: "Поручение"
  },
  attachment: "Вложения",
  fields: {
    boxBase: "Почтовый ящик",
    counterParty: "Контрагент",
    sender: "Отправитель",
    finalDeadline: "Общий срок",
    status: "Состояние",
    author: "Автор",
    assignedBy: "Выдал",
    parallel: "Паралельно",
    gradually: "Друг за другом",
    performers: "Исполнители",
    start: "Старт",
    addressee: "Адресат",
    deadline: "Cрок",
    createdDate: "Дата создания",
    maxDeadline: "Cрок",
    assignee: "Исполнитель",
    supervisor: "Контролер",
    subjectTask: "Тема",
    needsReview: "На контроле",
    deadLine: "Срок",
    isElectronicAcquaintance: "Ознакомление в электронном виде",
    observers: "Наблюдатели",
    acquaintMembers: "Кого ознакомить",
    excludedPerformers: "Кроме",
    comment: "Комментарий",
    coAssignees: "Соисполнители",
    actionItem: "Поручение",
    isUnderControl: "На контроль",
    approvers: "Согласующие",
    receiveOnCompletion: "По завершению получить",
    receiveNotice: "Уведомлять о замечаниях",
    copies: "Копии"
  },
  importance: {
    highImportance: "Высокая важность",
    middleImportance: "Средняя важность",
    lowImportance: "Низкая важность"
  },
  validation: {
    deadlineRequired: "Заполните срок",
    assignedByRequired: "Введите кем выдана",
    performersRequired: "Выберите исполнителя",
    addresseeRequired: "Выберите адресата",
    actionItemRequired: "Введите поручение",
    maxDeadlineRequired: "Заполните срок",
    subjectRequired: "Введите Содержание",
    supervisorRequired: "Выберите контролера",
    acquaintMembersRequired: "Выберите кого нужно ознакомить",
    assigneeRequired: "Выберите исполнителя",
    approversRequired: "Выберите согласующих",
    receiveOnCompletionRequired: "Выберите что получить по завершению"
  }
};
