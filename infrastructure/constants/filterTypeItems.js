import AssigmentStatus from "~/infrastructure/constants/assignmentStatus.js";
export default {
  assignmentType(context) {
    return [
      {
        id: 0,
        name: context.$t("menu.simpleAssignments")
      },
      {
        id: 1,
        name: context.$t("menu.acquaintanceAssignments")
      },
      {
        id: 2,
        name: context.$t("menu.actionItemsExicutionAssignments")
      },
      {
        id: 9,
        name: context.$t("createItemDialog.documentReviewTask")
      },
      {
        id: 3,
        name: context.$t("menu.simpleNotices")
      },
      {
        id: 4,
        name: context.$t("menu.actionItemsExicutionNotices")
      },
      {
        id: 5,
        name: context.$t("menu.acquaintanceNotices")
      },

      {
        id: null,
        name: context.$t("translations.fields.all")
      }
    ];
  },

  statusType(context) {
    return [
      {
        id: AssigmentStatus.InProccess,
        name: context.$t("translations.fields.inProccess")
      },
      {
        id: AssigmentStatus.Completed,
        name: context.$t("translations.fields.completed")
      },
      {
        id: AssigmentStatus.Aborted,
        name: context.$t("translations.fields.aborted")
      },

      {
        id: null,
        name: context.$t("translations.fields.all")
      }
    ];
  }
};
