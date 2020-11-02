import assignmentType from "./assignmentType"
export default {
  gridFileName: "Tabşyryklar",
  fields: {
    newDeadline: "Täze möhlet",
    deadline: "Möhleti",
    authorId: "Awtory",
    status: "Ýagdaýy",
    created: "Döredildi",
    subject: "Mazmuny"
  },
  quickFilter: {
    all: "Hemmesi",
    new: "Täzeler",
    inProcess: "Işlenýäni",
    expired: "Möhleti gijikdirilen",
    monthAgo: "Bir aý öň"
  },
  confirmMessage: {
    sureAddResolutionAllSelection:"Siz hakykatdanam hemme bellenen tabşyryklaryň rezalyusiyalaryny tassyklamakçy?",
    headerHasChildActionItem: "Ikinji derejeli tabşyryklary bes etmek?",
    hasChildActionItem: "Tamamlanmadyk ikinji derejeli tabşyryklar barmy",
    sureDocumentReviewAcceptConfirmetion: " Gözden geçirmäge kabul edilenden soň resminama ýerin ýetirmezden tamamlanar",
    sureDocumentReviewReworkConfirmetion: "Hakykatdan hem kömekçä işlemek üçin yzyna bermekçimi?",
    sureDocumentReviewApproveRosolutionConfirmetion: " Hakykatdan hem rezolýusiýanyňtaslamasyny tassyklamak isleýärsiňizmi?",
    sureDocumentReviewSendToResolutionConfirmetion: "Siz hakykatdan hem rezolýusiýa üçin ibermek isleýärsiňizmi?",
    sureDocumentReviewSendToAssigneeConfirmetion: "Siz hakykatda hem ýerine ýetirmek üçin ibermek isleýärsiňizmi?",
    sureDocumentReviewExploredConfirmetion: "Siz hakykatdan hem resminama bilen tanyş bolduňyzmy?",
    sureDocumentReviewForwardConfirmetion: "Siz hakykatdan hem resminamany  gaýtadan seretmek üçin başga birisine geçirmek isleýärsiňizmi?",
    sureDocumentReviewAddresolutionConfirmetion: "Siz hakykatdan hem resminama boýunça rezolýusiýa çykardyňyzmy?",
    sureActionItemForReworkConfirmetion: "Siz hakykatdan hem tabşyrygy gaýtadan işlemek üçin ibermek isleýärsiňizmi?",
    sureActionItemAcceptConfirmetion: "Siz hakykatdan hem tabşyryk boýunça işleri kabul etmek isleýärsiňizmi?",
    sureActionItemDoneConfirmetion: "Siz hakykatdan hem tabşyryklary ýerien ýetirmek isleýärsiňizmi",
    sureReturnManagersAssistant: "Siz kömekçä yzyna bermek isleýärsiňizmi?",
    sureComplete: "Siz hakykatdan hem ýumuşy ýerine ýetirmek isleýärsiňizmi?",
    sureAcquaintance: "Siz hakykatdan hem resminama bilen tanyş bolduňyzmy?",
    sureFinishAcquaintance: "Tanyşmagy tamamlamak isleýärsiňizmi ?",
    sureCompleteSupervisor: "Ýumuşy tamamlaýandygyňyzy tassyklaň",
    sureRework: "Ýumuşy gaýtadan işlemek üçin ibermek isleýärsiňizmi?",
    sureAccept: "Ýumuşy kabul etmek isleýärsiňizmi?"
    //TODO Добавить перевод предупреждения  о том что не создано ни одного поручение : выполнить задание без создание и отправки на поручение?
  },
  takeIntoMessage: " Gözden geçirmäge kabul edilenden soň resminama ýerin ýetirmezden tamamlanar",
  readdressToEmployee: "Işgäriň salgysyna geçirmelimi",

  result: {
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
    actionItemSupervisorAssignment: "Ýerine ýetirijiniň hasabaty boýunça bellikleri giriziň",
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
    bodyRequired: "Tabşyrygyň tekstini giriziň..."
  }
}
