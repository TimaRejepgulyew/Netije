import assignmentType from "./assignmentType";
export default {
  addApprover: "Täze ylalaşyjy",
  gridFileName: "Tabşyryklar",
  stores: {
    doNotSend: "Hiç zat ibermek",
    sendForApproval: "Ylalaşyga ibermek",
    sendNotice: "Habarnamany ibermek"
  },
  fields: {
    action: "Hereketi",
    approved: "Ylalyşyldy",
    approver: "Ylalaşyjy",
    approvers: "Ylalaşyjylar",
    newDeadline: "Täze möhlet",
    deadline: "Möhleti",
    authorId: "Awtory",
    status: "Ýagdaýy",
    created: "Döredildi",
    subject: "Mazmuny"
  },
  quickFilter: {
    All: "Hemmesi",
    New: "Täzeler",
    InProcess: "Işlenýäni",
    Expired: "Möhleti gijikdirilen",
    MonthAgo: "Bir aý öň",
    Today: "Şu gün"
  },
  confirmMessage: {
    sureTerminatedAssignmentConfirmation:
      "Hakykatdanam hem giriş resminamany işläp- taýýarlamakdan ret etmekçimi",
    sureProcessedAssignmentConfirmation:
      "Hakykatdanam hem giriş resminamany işläp-taýýarlamakçy",
    sureInformedAssignmentConfirmation: " Hakykatdan hem garalmaga kabul ettiňiz",
    sureAbortConfirmation: "Siz hakykatdanam ýumuşy işlemegi besetjek mi ?",
    sureApprovalReworkAssignmentConfirmation:
      "Siz hakykatdan ýumuşy gaýtadan işlendiňiz",
    sureFreeApprovalAssignmentConfirmation:
      "Siz hakykatdan resminama bilen ylalaşýarsyňyz?",
    sureFreeApprovalFinishAssignment:
      "Siz hakykatdan resminama ylalaşygy tammalajak?",
    sureFreeApprovalConfirmation: "Siz hakykatdan resminama bilen ylalaşdyňyz?",
    sureApprovalForwardConfirmation:
      "Siz hakykatdan hem resminama  ylalaşygy  başga birine geçirmekçi?",
    sureAddResolutionAllSelection:
      "Siz resminamanyň ylalaşygy tassyklaýarsyňyz my?",
    sureAddResolutionAllSelection:
      "Siz hakykatdanam hemme bellenen tabşyryklaryň rezalyusiyalaryny tassyklamakçy?",
    headerHasChildActionItem: "Ikinji derejeli tabşyryklary bes etmek?",
    hasChildActionItem: "Tamamlanmadyk ikinji derejeli tabşyryklar barmy",
    sureDocumentReviewAcceptConfirmation:
      " Gözden geçirmäge kabul edilenden soň resminama ýerin ýetirmezden tamamlanar",
    sureDocumentReviewReworkConfirmation:
      "Hakykatdan hem kömekçä işlemek üçin yzyna bermekçimi?",
    sureDocumentReviewApproveRosolutionConfirmation:
      " Hakykatdan hem rezolýusiýanyňtaslamasyny tassyklamak isleýärsiňizmi?",
    sureDocumentReviewSendToResolutionConfirmation:
      "Hakykattanam rezalýusiýany garalmaga  ibermek isleýärsiňizmi?",
    sureDocumentReviewSendToAssigneeConfirmation:
      "Siz hakykatda hem ýerine ýetirmek üçin ibermekçi?",
    sureDocumentReviewExploredConfirmation:
      "Siz hakykatdan hem resminama bilen tanyş bolduňyzmy?",
    sureDocumentReviewForwardConfirmation:
      "Siz hakykatdan hem resminamany  seretmek üçin başga birisine geçirmek isleýärsiňizmi?",
    sureDocumentReviewAddresolutionConfirmation:
      "Siz hakykatdan hem resminama boýunça rezolýusiýa çykardyňyzmy?",
    sureActionItemForReworkConfirmation:
      "Siz hakykatdan hem tabşyrygy gaýtadan işlemek üçin ibermek isleýärsiňizmi?",
    sureActionItemAcceptConfirmation:
      "Siz hakykatdan hem tabşyryk boýunça işleri kabul etmek isleýärsiňizmi?",
    sureActionItemDoneConfirmation:
      "Siz hakykatdan hem tabşyryklary ýerien ýetirmek isleýärsiňizmi",
    sureReturnManagersAssistant: "Siz kömekçä yzyna bermek isleýärsiňizmi?",
    sureComplete: "Siz hakykatdan hem ýumuşy ýerine ýetirmek isleýärsiňizmi?",
    sureAcquaintance: "Siz hakykatdan hem resminama bilen tanyş bolduňyzmy?",
    sureFinishAcquaintance: "Tanyşmagy tamamlamak isleýärsiňizmi ?",
    sureCompleteSupervisor: "Ýumuşy tamamlaýandygyňyzy tassyklaň",
    sureRework: "Ýumuşy gaýtadan işlemek üçin ibermek isleýärsiňizmi?",
    sureAccept: "Ýumuşy kabul etmek isleýärsiňizmi?"
    //TODO Добавить перевод предупреждения  о том что не создано ни одного поручение : выполнить задание без создание и отправки на поручение?
  },
  takeIntoMessage:
    " Gözden geçirmäge kabul edilenden soň resminama ýerin ýetirmezden tamamlanar",
  readdressToEmployee: "Işgäriň salgysyna geçirmelimi",

  result: {
    Reworked: "Düzedildi",
    Completed: "Tamamlandy",
    Approved: "Ylalaşyldy",
    Acquainted: "Tanyşdym",
    SendForReview: "Seretmek üçin iberildi",
    Complete: "Tamamlandy",
    Accept: "Kabul edildi",
    Informed: "Kabul edildi",
    ForRework: "Gaýtadan işlemäge iberildi",
    AddAssignment: "Ýerine ýetirmek üçin iberildi",
    AddResolution: "Rezolýusiýa çykaryldy",
    Explored: "Kabul edildi",
    Forward: "Iberilen",
    ForExecution: "Ýerine ýetirmek üçin iberildi"
  },

  status: {
    All: "Hemmesi",
    InProcess: "Işlenýär",
    Draft: "Garalama",
    Suspended: "Wagtlaýyn bes edildi",
    Completed: "Tamamlandy",
    Aborted: "Bes edildi",
    UnderReview: "Kabul etmek üçin seredilýär"
  },
  type: assignmentType,
  prefixes: {
    actionItemSupervisorAssignment: "Işleri kabul etmegiňizi soraýarys",
    actionItemExecutionAssignment: "Işleri ýerine ýetirmegiňizi soraýarys",
    actionItemExecutionNotification: "Işler kabul edildi",
    acquaintanceAssignment: "Tabşyryk bilen tanyşmagyňyzy soraýarys",
    acquaintanceNotification: "Resminama bilen tanyşmak",
    acquaintanceFinishAssignment: "Tanyşmak boýunça işleri tamamlaň",
    actionItemObserversNotification: "Işlere başlandy"
  },
  comment: "Bellikler",
  body: {
    freeApprovalAssignment: "Tabşyrygyň tekstini giriziň...",
    actionItemSupervisorAssignment:
      "Ýerine ýetirijiniň hasabaty boýunça bellikleri giriziň",
    acquaintanceAssignment: "Tabşyryga başlamazdan öň bellikleri galdyryň",
    simpleAssignment: "Tabşyrygyň tekstini giriziň...",
    acquaintanceFinishAssignment: "Tabşyrygyň tekstini giriziň...",
    actionAtiemExecution: "Tabşyrygy ýerine ýetirmek boýunça hasabaty galdyryň",
    preparingDraftResolutionAssignment: "Tabşyrygyň tekstini giriziň...",
    reviewDraftResolutionAssignment: "Tabşyrygyň tekstini giriziň...",
    reviewResolutionAssignment: "Rezolýusiýanyň teksti...",
    reviewManagerAssignment: "Rezolýusiýanyň teksti"
  },
  validation: {
    approversRequired: "Ylalyşyjyny saýlaň",
    bodyRequired: "Tabşyrygyň tekstini giriziň..."
  }
};
