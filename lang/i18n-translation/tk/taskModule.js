export const TaskType = {
  SimpleTask : "Ýönekeý mesele",
  AcquaintanceTask : "Resminama bilen tanyşmak meselesi",
  ActionItemExecutionTask : "Tabşyrygy ýerine ýetirmek üçin mesele",
  DocumentReviewTask : "Resminamany gözden geçirmek wezipesi"
};
export default {
  quickFilter : {
    all : "Hemmesi",
    inProcess : "Işjeň ýagdaýda",
    expired : "Möhleti geçen",
    monthAgo : "30 gün"
  },
  taskQuery: {
    all: "Все задачи",
    actionItem: "Поручения"
  },
  message: {
    message : {
      acquaintDocumentMessage : "Resminama bilen tanyşyň, jogapkäriň ýanyna bayň we şahsy goluňyzy goýuň",
      nothaveAccessRight : "ullanyjy hukugy ýok, bu meseläni işlemek üçin hukuk beriň",
      sureAbortTask : "Siz hakykatdanam meseläni işlemegi besetjek mi ?",
      sureRestartTask : "Siz hakykatdanam bu meseläni täzeden goýmak isleýäňiz mi ?",
      sureStartTask : "Siz hakykatdanam meseläni başlamak isleýäňizmi ?"
    },
  },
  status: {
    InProcess : "Iş dowam edýär",
    Draft : "Garalama",
    Suspended : "Togtadylan",
    Completed : "Gadagan edilen",
    Aborted : "Ýatyrylan",
    UnderReview : "Kabul edilişde"
  },
  type: TaskType,
  prefixes: {
    actionItemExecutionTask : "Tabşyryk"
  },
  attachment : "Goşundylar",
  fields: {
    status : "Ýagdaýy",
    author : "Dörediji",
    assignedBy : "Berdi",
    parallel : "Paralel",
    gradually : "biri-biriniň yzyndan",
    performers : "Ýerine ýetirijiler",
    start : "Başla",
    addressee : "Barmaly ýeri",
    deadline : "Gutormaly wagty",
    createdDate : "Döredilen senesi",
    maxDeadline : "iň soňky möhlet",
    assignee : "Ýerine ýetiriji",
    supervisor : "Gözegçi",
    subjectTask : "Mowzuk",
    needsReview : "Göz astynda",
    deadLine : "Soňky senesi",
    isElectronicAcquaintance : "Elektron görnüşinde tanyşmak",
    observers : "Gözegçiler",
    acquaintMembers : "Kime tanyşdyrmaly",
    excludedPerformers : "Mundan başga",
    comment : "Teswir",
    coAssignees : "Ýerine ýetirijiler",
    actionItem : "Tabşyryk",
    isUnderControl : "Gözegçilige"
  },
  importance: {
    highImportance : "Ýokary ähmiýetli",
    middleImportance : "Orta ähmiýetli",
    lowImportance : "Pes ähmiýetli"
  },
  validation: {
    deadlineRequired : "Möhletleri dolduryň",
    assignedByRequired : "Kime berlendigini görkeziň",
    performersRequired : "Ýerine ýetirijini saýlaň",
    addresseeRequired : "Barmaly salgyny saýlaň",
    actionItemRequired : "Tabşyrygy giriziň",
    maxDeadlineRequired : "Möhleti bellemek",
    subjectRequired : "Mazmuny giriziň",
    supervisorRequired : "Gözegçini giriziň",
    acquaintMembersRequired : "Haýsy işgärler bilen tanyşdyrmaly saýlaň",
    assigneeRequired : "Ýerine ýetirijini giriziň"
  }
};
