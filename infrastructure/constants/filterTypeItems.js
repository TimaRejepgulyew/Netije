export default {
  assignmentType(context) {
    return [
      {
        id: 0,
        name: context.$t("translations.menu.simpleAssignments")
      },
      {
        id: 1,
        name: context.$t("translations.menu.acquaintanceAssignments")
      },
      {
        id: 2,
        name: context.$t("translations.menu.actionItemsExicutionAssignments")
      },
      {
        id: 3,
        name: context.$t("translations.menu.simpleNotices")
      },
      {
        id: 4,
        name: context.$t("translations.menu.actionItemsExicutionNotices")
      },
      {
        id: 5,
        name: context.$t("translations.menu.acquaintanceNotices")
      },

      // {
      //   id: 99,
      //   name: context.$t("translations.menu.allAssignments")
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
