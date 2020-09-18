

import additionalInfoIcon from "~/static/icons/quide-page/additionalInfo.svg"
import companyStructureIcon from "~/static/icons/quide-page/company-structure.svg"
import EntityType from "~/infrastructure/constants/entityTypes";
import employeeIcon from "~/static/icons/parties/person.svg"
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
    const companyStructure = [
        {
            icon: employeeIcon,
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
            title: context.$t("companyStructure.additionalInfo.title"),
            items: [

                {
                    name: context.$t("companyStructure.additionalInfo.companies"),
                    description: context.$t("companyStructure.additionalInfo.companiesDescr"),
                    path: "/parties/organizations/companies",
                    visible: isVisible(EntityType.Counterparty),
                },
                {
                    name: context.$t("companyStructure.additionalInfo.banks"),
                    description: context.$t("companyStructure.additionalInfo.banksDescr"),
                    path: "/parties/organizations/banks",
                    visible: isVisible(EntityType.Counterparty),
                },
                {
                    name: context.$t("companyStructure.additionalInfo.persons"),
                    description: context.$t("companyStructure.additionalInfo.personsDescr"),
                    path: "/parties/persons",
                    visible: isVisible(EntityType.Counterparty),
                },
                {
                    name: context.$t("companyStructure.additionalInfo.roles"),
                    description: context.$t("companyStructure.additionalInfo.rolesDescr"),
                    path: "/admin/roles",
                    visible: isVisible(EntityType.Roles),
                },

            ]
        },
        {
            icon: companyStructureIcon,
            title: context.$t("companyStructure.company.title"),
            items: [
                {
                    name: context.$t("companyStructure.company.createBusinessUnit"),

                    visible: false,
                },
                {
                    name: context.$t("companyStructure.company.businessUnit"),
                    description: context.$t("companyStructure.company.businessUnitDescr"),
                    path: pathGenerate("organization-structure/business-units"),
                    visible: isVisible(EntityType.BusinessUnit),
                },
                {
                    name: context.$t("companyStructure.company.createDepartment"),
                    visible: false,
                },
                {
                    name: context.$t("companyStructure.company.department"),
                    description: context.$t("companyStructure.company.departmentDescr"),
                    path: pathGenerate("organization-structure/departments"),
                    visible: isVisible(EntityType.BusinessUnit),
                },

            ]
        },




    ];
    return companyStructure;
}