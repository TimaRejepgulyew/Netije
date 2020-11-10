export const TaskType = {
  SimpleTask: "Простая задача",
  AcquaintanceTask: "Задача на ознакомление с документом",
  ActionItemExecutionTask: "Задача на исполнение поручения",
  DocumentReviewTask: "Задача на рассмотрение документа",
  FreeApprovalTask: "Задача на cвободное согласование"
};
export default {
  sources: {
    assignment: "Задание",
    notification: "Уведомление"
  },
  quickFilter: {
    all: "Все",
    inProcess: "В работе",
    expired: "Просроченые",
    monthAgo: "30 дней"
  },
  taskQuery: {
    all: "Все задачи",
    actionItem: "Поручения"
  },
  message: {
    acquaintDocumentMessage:
      "Ознакомьтесь с документом, подойдите к ответственному и поставьте личную подпись",
    nothaveAccessRight: "Не достаточно прав, добавте права для этой задачи ",
    sureAbortTask: "Вы действительно хотите прекратить задачи?",
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
    status: "Состояние",
    author: "Автор",
    assignedBy: "Выдал",
    parallel: "паралельно",
    gradually: "друг за другом",
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
    copies: "Копия"
  },
  importance: {
    highImportance: "Высокая важность",
    middleImportance: "Средняя важность",
    lowImportance: "Низкая важность"
  },
  validation: {
    deadlineRequired: "Заполните срок",
    assignedByRequired: "Введите кому выдана",
    performersRequired: "Выберите исполнителя",
    addresseeRequired: "Выберите адресата",
    actionItemRequired: "Введите поручение",
    maxDeadlineRequired: "Заполните срок",
    subjectRequired: "Введите Содержание",
    supervisorRequired: "Введите контролера",
    acquaintMembersRequired: "Выберите кого нужно ознакомить",
    assigneeRequired: "Введите исполнителя",
    approversRequired: "Выберите согласующих",
    receiveOnCompletionRequired: "Выберите что получить по завершению"
  }
};
