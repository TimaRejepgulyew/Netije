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
        id: 3,
        name: context.$t("menu.simpleNotices")
      },
      {
        id: 4,
        name: context.$t("menu.acquaintanceNotices")
      },
      {
        id: 5,
        name: context.$t("menu.actionItemsExicutionNotices")
      },
      // {
      //   id: 99,
      //   name: context.$t("menu.allAssignments")
      // },
      {
        id: null,
        name: context.$t("translations.fields.all")
      }
    ];
  },
  statusType(context) {
    return [
      {
        id: 0,
        name: context.$t("translations.fields.inProccess")
      },
      {
        id: null,
        name: context.$t("translations.fields.all")
      }
    ];
  }
};
