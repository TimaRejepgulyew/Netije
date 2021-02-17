import documentSettingIcon from "~/static/icons/doc-flow-icon/documentSettingIcon.svg";
import regSettingIcon from "~/static/icons/doc-flow-icon/regSettingIcon.svg";
import caseFileSettingIcon from "~/static/icons/doc-flow-icon/caseFileSettingIcon.svg";
import associatedAppSettingIcon from "~/static/icons/doc-flow-icon/associatedAppSettingIcon.svg";
import EntityType from "~/infrastructure/constants/entityTypes";

export default function (context) {
  function isVisible(accessKey) {
    return context.$store.getters["permissions/allowReading"](accessKey);
  }
  const pathGenerate = detail => {
    return `/docFlow/${detail}`;
  };
  const docFlowItem = [
    {
      icon: documentSettingIcon,
      title: context.$t("docFlow.documentSetting.title"),
      visible:
        isVisible(EntityType.DocumentKind) ||
        isVisible(EntityType.DocumentGroupBase),
      items: [
        {
          name: context.$t("docFlow.documentSetting.docKind"),
          description: context.$t("docFlow.documentSetting.docKindDescr"),
          path: pathGenerate("document-kind"),
          visible: isVisible(EntityType.DocumentKind)
        },
        {
          name: context.$t("docFlow.documentSetting.categories"),
          description: context.$t("docFlow.documentSetting.categoriesDescr"),
          path: pathGenerate("contract-categories"),
          visible: isVisible(EntityType.DocumentGroupBase)
        },
        {
          name: context.$t("docFlow.documentSetting.documentTemplate"),
          description: context.$t(
            "docFlow.documentSetting.documentTemplateDescr"
          ),
          path: pathGenerate("document-template"),
          visible: isVisible(EntityType.DocumentTemplate)
        },
        {
          name: context.$t("docFlow.automaticAssignmentRules.automaticAssignmentRulesTitle"),
          description: context.$t(
            "docFlow.automaticAssignmentRules.automaticAssignmentRulesDescription"
          ),
          path: pathGenerate("automatic-assignment-rules"),
          //TODO:Fix when realize
          visible: false
        }
      ]
    },
    {
      icon: regSettingIcon,
      title: context.$t("docFlow.regSetting.title"),
      visible:
        isVisible(EntityType.DocumentRegister) ||
        isVisible(EntityType.RegistrationGroup) ||
        isVisible(EntityType.DeliveryMethod),
      items: [
        {
          name: context.$t("docFlow.regSetting.registration"),
          description: context.$t("docFlow.regSetting.registrationDescr"),
          path: pathGenerate("document-register"),
          visible: isVisible(EntityType.DocumentRegister)
        },
        {
          name: context.$t("docFlow.regSetting.regGroup"),
          description: context.$t("docFlow.regSetting.regGroupDescr"),
          path: pathGenerate("registration-group"),
          visible: isVisible(EntityType.RegistrationGroup)
        },
        {
          name: context.$t("docFlow.regSetting.registrationSettings"),
          description: context.$t(
            "docFlow.regSetting.registrationSettingsDescr"
          ),
          path: pathGenerate("registration-settings"),
          visible: isVisible(EntityType.RegistrationSetting)
        },
        {
          name: context.$t("docFlow.regSetting.deliveriMethods"),
          description: context.$t("docFlow.regSetting.deliveriMethodsDescr"),
          path: pathGenerate("delivery-method"),
          visible: isVisible(EntityType.DeliveryMethod)
        }
      ]
    },

    {
      icon: caseFileSettingIcon,
      title: context.$t("docFlow.caseFileSetting.title"),
      visible:
        isVisible(EntityType.CaseFile) ||
        isVisible(EntityType.FileRetentionPeriod),
      items: [
        {
          name: context.$t("docFlow.caseFileSetting.caseFile"),
          description: context.$t("docFlow.caseFileSetting.caseFileDescr"),
          path: pathGenerate("case-files"),
          visible: isVisible(EntityType.CaseFile)
        },
        {
          name: context.$t("docFlow.caseFileSetting.fileRetention"),
          description: context.$t("docFlow.caseFileSetting.fileRetentionDescr"),
          path: pathGenerate("file-retention-period"),
          visible: isVisible(EntityType.FileRetentionPeriod)
        }
      ]
    },
    {
      icon: associatedAppSettingIcon,
      title: context.$t("docFlow.associatedAppSetting.title"),
      visible:
        isVisible(EntityType.FilesType) ||
        isVisible(EntityType.AssociatedApplications),
      items: [
        {
          name: context.$t("docFlow.associatedAppSetting.fileType"),
          description: context.$t("docFlow.associatedAppSetting.fileTypeDescr"),
          path: pathGenerate("files-type"),
          visible: isVisible(EntityType.FilesType)
        },
        {
          name: context.$t("docFlow.associatedAppSetting.associatedApp"),
          description: context.$t(
            "docFlow.associatedAppSetting.associatedAppDescr"
          ),
          path: pathGenerate("associated-applications"),
          visible: isVisible(EntityType.AssociatedApplications)
        }
      ]
    }
  ];
  return docFlowItem;
}
