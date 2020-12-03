import licensingIcon from "~/static/icons/quide-page/licensing.svg";
import usersIcon from "~/static/icons/quide-page/users.svg";
import importIcon from "~/static/icons/quide-page/import-icon.svg";
import dataApi from "~/static/dataApi";
export default function (context) {
  function isVisible(accessKey) {
    return context.$store.getters["permissions/allowReading"](accessKey);
  }
  const pathGenerate = detail => {
    return `/admin/${detail}`;
  };
  const administration = [
    {
      icon: importIcon,
      title: context.$t("companyStructure.imports.title"),
      items: [
        {
          name: context.$t("companyStructure.imports.importCompanies"),
          path: "import-btn",
          params: {
            async onChange(context, file) {
              await context.$axios.post(dataApi.import.companies, file);
            }
          },
          visible: true,
          componentType: "uploadBtn"
        },
        {
          name: context.$t("companyStructure.imports.importBank"),
          path: "import-btn",
          params: {
            async onChange(context, file) {
              await context.$axios.post(dataApi.import.banks, file);
            }
          },
          visible: true,
          componentType: "uploadBtn"
        },
        {
          name: context.$t("companyStructure.imports.importJobTitle"),
          path: "import-btn",
          params: {
            async onChange(context, file) {
              await context.$axios.post(dataApi.import.jobTitles, file);
            }
          },
          visible: true,
          componentType: "uploadBtn"
        },
        {
          name: context.$t("companyStructure.imports.importEmployees"),
          path: "import-btn",
          params: {
            async onChange(context, file) {
              await context.$axios.post(dataApi.import.employees, file);
            }
          },
          visible: true,
          componentType: "uploadBtn"
        },
        {
          name: context.$t("companyStructure.imports.importPersons"),
          path: "import-btn",
          params: {
            async onChange(context, file) {
              await context.$axios.post(dataApi.import.persons, file);
            }
          },
          visible: true,
          componentType: "uploadBtn"
        }
      ]
    },
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
          description: context.$t(
            "administration.usersAndGroups.usersAccountDescr"
          ),
          visible: false
        },
        {
          name: context.$t("administration.usersAndGroups.activeUsers"),
          description: context.$t(
            "administration.usersAndGroups.activeUsersDescr"
          ),
          path: pathGenerate("online-users"),
          visible: true
        }
      ]
    },
    {
      icon: licensingIcon,
      title: context.$t("licensing.headerTitle"),
      items: [
        {
          name: context.$t("licensing.information.title"),
          path: pathGenerate("roles"),
          visible: true,
          componentType: "licenseInformationBtn",
        },
      ]
    }
  ];
  return administration;
}
