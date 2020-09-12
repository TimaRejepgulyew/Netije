
import usersIcon from "~/static/icons/quide-page/users.svg"
export default function (context) {
  function isVisible(accessKey) {
    return context.$store.getters["permissions/allowReading"](accessKey);
  }
  const pathGenerate = detail => {
    return `/admin/${detail}`;
  };
  const administration = [
    {
      icon: usersIcon,
      title: context.$t("administration.usersAndGroups.title"),
      items: [
        {
          name: context.$t("administration.usersAndGroups.roles"),
          description: context.$t("administration.usersAndGroups.rolesDescr"),
          path: pathGenerate("roles"),
          visible: true
        },
        {
          name: context.$t("administration.usersAndGroups.users"),
          description: context.$t("administration.usersAndGroups.usersDescr"),
          visible: false
        },
        {
          name: context.$t("administration.usersAndGroups.groups"),
          description: context.$t("administration.usersAndGroups.groupsDescr"),
          visible: false
        },
        {
          name: context.$t("administration.usersAndGroups.usersAccount"),
          description: context.$t("administration.usersAndGroups.usersAccountDescr"),
          visible: false
        },
      ]
    },


  ];
  return administration;
}
