export default {
  items(context) {
    return [
      {
        id: 0,
        name: context.$t("translations.menu.simpleAssignments")
      },
      {
        id: null,
        name: context.$t("translations.menu.acquaintanceAssignments")
      },
      {
        id: 2,
        name: context.$t("translations.menu.actionAssignments")
      },
      {
        id: 3,
        name: context.$t("translations.menu.notices")
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
  }
};
