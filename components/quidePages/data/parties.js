import additionalInfoIcon from "~/static/icons/quide-page/additionalInfo.svg";
import organizationIcon from "~/static/icons/parties/company.svg";
import contactIcon from "~/static/icons/quide-page/contact-person.svg";
import EntityType from "~/infrastructure/constants/entityTypes";
import personIcon from "~/static/icons/parties/person.svg";
export default function (context) {
  function isVisible(accessKey) {
    return context.$store.getters["permissions/allowReading"](accessKey);
  }

  function canCreate(accessKey) {
    return context.$store.getters["permissions/allowCreating"](accessKey);
  }
  const pathGenerate = detail => {
    return `/parties/${detail}`;
  };
  const parties = [
    {
      icon: organizationIcon,
      title: context.$t("parties.organizations.title"),
      items: [
        {
          name: context.$t("parties.organizations.createCompany"),
          path: pathGenerate("company/create"), //TODO add path and add route like that
          visible: canCreate(EntityType.Counterparty)
        },
        {
          name: context.$t("parties.organizations.company"),
          description: context.$t("parties.organizations.companyDescr"),
          path: pathGenerate("company"),
          visible: isVisible(EntityType.Counterparty)
        },
        {
          name: context.$t("parties.organizations.createBank"),
          path: pathGenerate("bank/create"), //TODO add path and add route like that
          visible: canCreate(EntityType.Counterparty)
        },
        {
          name: context.$t("parties.organizations.banks"),
          description: context.$t("parties.organizations.banksDescr"),
          visible: isVisible(EntityType.Counterparty),
          path: pathGenerate("bank")
        }
      ]
    },
    {
      icon: personIcon,
      title: context.$t("parties.person.title"),
      items: [
        {
          name: context.$t("parties.organizations.createPerson"),
          path: pathGenerate("person/create"), //TODO add path and add route like that
          visible: canCreate(EntityType.Counterparty)
        },
        {
          name: context.$t("parties.person.persons"),
          description: context.$t("parties.person.personsDescr"),
          path: pathGenerate("person"),
          visible: isVisible(EntityType.Counterparty)
        }
      ]
    },
    {
      icon: contactIcon,
      title: context.$t("parties.contactPerson.title"),
      items: [
        {
          name: context.$t("parties.contactPerson.сreateContact"),
          visible: false
        },
        {
          name: context.$t("parties.contactPerson.contact"),
          description: context.$t("parties.contactPerson.contactDescr"),
          path: pathGenerate("organizations/contacts"),
          visible: isVisible(EntityType.Contact)
        }
      ]
    },
    {
      icon: additionalInfoIcon,
      title: context.$t("parties.additionalInfo.title"),
      items: [
        {
          name: context.$t("parties.additionalInfo.localities"),
          description: context.$t("parties.additionalInfo.localitiesDescr"),
          path: "/shared-directory/territorial-structure/localities",
          visible: isVisible(EntityType.Locality)
        },
        {
          name: context.$t("parties.additionalInfo.regions"),
          description: context.$t("parties.additionalInfo.regionsDescr"),
          path: "/shared-directory/territorial-structure/region",
          visible: isVisible(EntityType.Region)
        },
        {
          name: context.$t("parties.additionalInfo.countries"),
          description: context.$t("parties.additionalInfo.countriesDescr"),
          path: "/shared-directory/territorial-structure/countries",
          visible: isVisible(EntityType.Country)
        },
        {
          name: context.$t("parties.additionalInfo.categories"),
          description: context.$t("parties.additionalInfo.categoriesDescr"),
          path: "/shared-directory/territorial-structure/categories",
          visible: true
        }
      ]
    }
  ];
  return parties;
}
