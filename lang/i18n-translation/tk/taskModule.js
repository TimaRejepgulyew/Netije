export const TaskType = {
  SimpleTask: "Ýönekeý ýumuş",
  AcquaintanceTask: "Resminama bilen tanyşmak ýumuşy",
  ActionItemExecutionTask: "Tabşyrygy ýerine ýetirmek üçin ýumuşy",
  DocumentReviewTask: "Resminamany gözden geçirmek ýumuşy",
  FreeApprovalTask: "Erkin ylalyşyk ýumuşy"
};
export default {
  compoundActionItem: "Birleşdirilen tabşyryk",
  actionItemType: {
    Component: "Ýumuş elementi"
  },
  addNewAssineers: "Ýerine ýetirijileri goşuň",
  quickFilter: {
    All: "Hemmesi",
    InProcess: "Işjeň ýagdaýda",
    Expired: "Möhleti geçen",
    MonthAgo: "30 gün",
    Today: "Şu gün"
  },
  confirm: {
    abortingReason: "Gutarmagyň sebäbi"
  },
  message: {
    acquaintDocumentMessage:
      "Resminama bilen tanyşyň, jogapkäriň ýanyna bayň we şahsy goluňyzy goýuň",
    nothaveAccessRight:
      "ullanyjy hukugy ýok, bu meseläni işlemek üçin hukuk beriň",
    sureAbortTask: "Siz hakykatdanam meseläni işlemegi besetjek mi ?",
    sureRestartTask:
      "Siz hakykatdanam bu meseläni täzeden goýmak isleýäňiz mi ?",
    sureStartTask: "Siz hakykatdanam meseläni başlamak isleýäňizmi ?"
  },
  status: {
    InProcess: "Iş dowam edýär",
    Draft: "Garalama",
    Suspended: "Togtadylan",
    Completed: "Tamamlandy",
    Aborted: "Ýatyrylan",
    UnderReview: "Kabul edilişde"
  },
  type: TaskType,
  prefixes: {
    actionItemExecutionTask: "Tabşyryk"
  },
  attachment: "Goşundylar",
  sources: {
    assignment: "Tabşyryk",
    notification: "Tanyşdyrma"
  },
  fields: {
    finalDeadline: "Umumy möhlet",
    status: "Ýagdaýy",
    author: "Dörediji",
    assignedBy: "Berdi",
    parallel: "Parallel",
    gradually: "Biri-biriniň yzyndan",
    performers: "Ýerine ýetirijiler",
    start: "Başla",
    addressee: "Barmaly ýeri",
    deadline: "Gutormaly wagty",
    createdDate: "Döredilen senesi",
    maxDeadline: "iň soňky möhlet",
    assignee: "Ýerine ýetiriji",
    supervisor: "Gözegçi",
    subjectTask: "Mowzuk",
    needsReview: "Göz astynda",
    deadLine: "Soňky senesi",
    isElectronicAcquaintance: "Elektron görnüşinde tanyşmak",
    observers: "Gözegçiler",  

    
    acquaintMembers: "Kime tanyşdyrmaly",
    excludedPerformers: "Mundan başga",
    comment: "Teswir",
    coAssignees: "Ýerine ýetirijiler",
    actionItem: "Tabşyryk",
    isUnderControl: "Gözegçilige",
    approvers: "Ylalaşyjylar",
    copies: "Kopiýalar",
    receiveOnCompletion: "Tammam. soň ugradyjygy",
    receiveNotice: "Bellikler barada duýdurmak"
  },
  importance: {
    highImportance: "Ýokary ähmiýetli",
    middleImportance: "Orta ähmiýetli",
    lowImportance: "Pes ähmiýetli"
  },
  validation: {
    approversRerquired: "Ylalaşyjylary goşuň",
    deadlineRequired: "Möhletleri dolduryň",
    assignedByRequired: "Kime berlendigini görkeziň",
    performersRequired: "Ýerine ýetirijini saýlaň",
    addresseeRequired: "Barmaly salgyny saýlaň",
    actionItemRequired: "Tabşyrygy giriziň",
    maxDeadlineRequired: "Möhleti bellemek",
    subjectRequired: "Mazmuny giriziň",
    supervisorRequired: "Gözegçini giriziň",
    acquaintMembersRequired: "Haýsy işgärler bilen tanyşdyrmaly saýlaň",
    assigneeRequired: "Ýerine ýetirijini giriziň",
    receiveOnCompletionRequired: "Tammamlan wagty ugradyjygy saýlaň"
  }
};
