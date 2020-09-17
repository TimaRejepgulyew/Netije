

import additionalInfoIcon from "~/static/icons/quide-page/additionalInfo.svg"
import EntityType from "~/infrastructure/constants/entityTypes";
export default function (context) {
    function isVisible(accessKey) {
        return context.$store.getters["permissions/allowReading"](accessKey);
    }
    function canCreate(accessKey) {
        return context.$store.getters["permissions/allowCreating"](accessKey);
    }
    const pathGenerate = detail => {
        return `/company/${detail}`;
    };
    const sharedDirectory = [
        {
            icon: additionalInfoIcon,
            title: context.$t("companyStructure.employee.title"),
            items: [
                {
                    name: context.$t("companyStructure.employee.createEmployee"),
                    path: pathGenerate("staff/employees/create"),
                    visible: canCreate(EntityType.Employee)
                },
                {
                    name: context.$t("companyStructure.employee.employees"),
                    description: context.$t("companyStructure.employee.employeesDescr"),
                    path: pathGenerate("staff/employees"),
                    visible: isVisible(EntityType.Employee),

                },
                {
                    name: context.$t("companyStructure.employee.jobTitle"),
                    description: context.$t("companyStructure.employee.jobTitleDescr"),
                    visible: isVisible(EntityType.JobTitle),
                    path: pathGenerate("job-titles"),

                },
                {
                    name: context.$t("companyStructure.employee.managersAssistant"),
                    description: context.$t("companyStructure.employee.managersAssistantDescr"),
                    visible: isVisible(EntityType.ManagersAssistant),
                    path: pathGenerate("staaff/managers-assistant"),

                },
            ]
        },
        {
            icon: additionalInfoIcon,
            title: context.$t("company.additionalInfo.title"),
            items: [

                {
                    name: context.$t("company.additionalInfo.companies"),
                    description: context.$t("company.additionalInfo.companiesDescr"),
                    path: "/parties/organizations/companies",
                    visible: isVisible(EntityType.Counterparty),
                },
                {
                    name: context.$t("company.additionalInfo.banks"),
                    description: context.$t("company.additionalInfo.banksDescr"),
                    path: "/partiesorganizations//banks",
                    visible: isVisible(EntityType.Counterparty),
                },
                {
                    name: context.$t("company.additionalInfo.persons"),
                    description: context.$t("company.additionalInfo.personsDescr"),
                    path: "/parties/organizations/persons",
                    visible: isVisible(EntityType.Counterparty),
                },
                {
                    name: context.$t("company.additionalInfo.roles"),
                    description: context.$t("company.additionalInfo.rolesDescr"),
                    path: "/admin/roles",
                    visible: isVisible(EntityType.Roles),
                },

            ]
        },
        {
            icon: additionalInfoIcon,
            title: context.$t("company.companyStucture.title"),
            items: [
                {
                    name: context.$t("company.companyStucture.createBusinessUnit"),

                    visible: false,
                },
                {
                    name: context.$t("company.companyStucture.businessUnit"),
                    description: context.$t("company.companyStucture.businessUnitDescr"),
                    path: pathGenerate("organization-structure/business-units"),
                    visible: isVisible(EntityType.BusinessUnit),
                },
                {
                    name: context.$t("company.companyStucture.createDepartment"),
                    visible: false,
                },
                {
                    name: context.$t("company.companyStucture.department"),
                    description: context.$t("company.companyStucture.departmentDescr"),
                    path: pathGenerate("organization-structure/departments"),
                    visible: isVisible(EntityType.BusinessUnit),
                },

            ]
        },




    ];
    return sharedDirectory;
}