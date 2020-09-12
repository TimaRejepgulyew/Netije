
import territorialStructureIcon from "~/static/icons/quide-page/territorialStructure.svg"
import additionalInfoIcon from "~/static/icons/quide-page/additionalInfo.svg"
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
      icon: territorialStructureIcon,
      title: context.$t("sharedDirectory.territorialStructure.title"),
      items: [
        {
          name: context.$t("sharedDirectory.territorialStructure.createLocalities"),
          visible: false
        },
        {
          name: context.$t("sharedDirectory.territorialStructure.localities"),
          description: context.$t("sharedDirectory.territorialStructure.localitiesDescr"),
          path: pathGenerate("territorial-structure/localities"),
          visible: isVisible(EntityType.Locality),

        },
        {
          name: context.$t("sharedDirectory.territorialStructure.region"),
          description: context.$t("sharedDirectory.territorialStructure.regionDescr"),
          visible: isVisible(EntityType.Region),
          path: pathGenerate("territorial-structure/region"),

        },
        {
          name: context.$t("sharedDirectory.territorialStructure.country"),
          description: context.$t("sharedDirectory.territorialStructure.countryDescr"),
          visible: isVisible(EntityType.Country),
          path: pathGenerate("territorial-structure/countries"),

        },
      ]
    },
    {
      icon: additionalInfoIcon,
      title: context.$t("sharedDirectory.additionalInfo.title"),
      items: [

        {
          name: context.$t("sharedDirectory.additionalInfo.currencies"),
          description: context.$t("sharedDirectory.additionalInfo.currenciesDescr"),
          path: pathGenerate("currencies"),
          visible: isVisible(EntityType.Currencies),
        },

      ]
    },



  ];
  return sharedDirectory;
}
