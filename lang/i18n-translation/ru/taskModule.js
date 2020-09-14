export const TaskType = {
  SimpleTask: "Простая задача",
  AcquaintanceTask: "Задача на ознакомление с документом",
  ActionItemExecutionTask: "Задача на исполнение поручения",
  DocumentReviewTask: "Задача на рассмотрение документа"
};
export default {
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
    authorId: "Автор",
    assignedBy: "Выдал",
    parallel: "паралельно",
    gradually: "друг за другом",
    performers: "Исполнители",
    start: "Старт",
    addressee: "Адресат",
    deadline: "Cрок",
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
    isUnderControl: "На контроль"
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
    assigneeRequired: "Введите исполнителя"
  }
};
