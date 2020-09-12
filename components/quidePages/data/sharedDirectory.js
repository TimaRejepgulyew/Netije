
import territorialStructureIcon from "~/static/icons/quide-page/users.svg"
import additionalInfoIcon from "~/static/icons/quide-page/users.svg"
import EntityType from "~/infrastructure/constants/entityTypes";
export default function (context) {
  function isVisible(accessKey) {
    return context.$store.getters["permissions/allowReading"](accessKey);
  }
  const pathGenerate = detail => {
    return `/shared-directory/${detail}`;
  };
  const sharedDirectory = [
    {
      icon: usersIcon,
      title: context.$t("sharedDirectory.territorialStructure.title"),
      items: [
        {
          name: context.$t("sharedDirectory.territorialStructure.createLocalities"),
          visible: true
        },
        {
          name: context.$t("sharedDirectory.territorialStructure.localities"),
          description: context.$t("sharedDirectory.territorialStructure.localitiesDescr"),
          path: pathGenerate("localities"),
          visible: isVisible(EntityType.Locality),

        },
        {
          name: context.$t("sharedDirectory.territorialStructure.region"),
          description: context.$t("sharedDirectory.territorialStructure.regionDescr"),
          visible: isVisible(EntityType.Region),
          path: pathGenerate("region"),

        },
        {
          name: context.$t("sharedDirectory.territorialStructure.country"),
          description: context.$t("sharedDirectory.territorialStructure.countryDescr"),
          visible: isVisible(EntityType.Country),
          path: pathGenerate("countries"),

        },
      ]
    },
    {
      icon: usersIcon,
      title: context.$t("sharedDirectory.additionalInfo.title"),
      items: [
        {
          name: context.$t("sharedDirectory.currintiies.createLocalities"),
          visible: true
        },
        {
          name: context.$t("sharedDirectory.territorialStructure.localities"),
          description: context.$t("sharedDirectory.territorialStructure.localitiesDescr"),
          path: pathGenerate("localities"),
          visible: true
        },
        {
          name: context.$t("sharedDirectory.territorialStructure.region"),
          description: context.$t("sharedDirectory.territorialStructure.regionDescr"),
          path: pathGenerate("region"),
          visible: true
        },
        {
          name: context.$t("sharedDirectory.territorialStructure.country"),
          description: context.$t("sharedDirectory.territorialStructure.countryDescr"),
          path: pathGenerate("country"),
          visible: true
        },
      ]
    },



  ];
  return sharedDirectory;
}
