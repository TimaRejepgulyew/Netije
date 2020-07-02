import personalSettingIcon from "~/static/icons/doc-flow-icon/personalSettingIcon.svg";
import documentSettingIcon from "~/static/icons/doc-flow-icon/documentSettingIcon.svg";
import regSettingIcon from "~/static/icons/doc-flow-icon/regSettingIcon.svg";
import caseFileSettingIcon from "~/static/icons/doc-flow-icon/caseFileSettingIcon.svg";
import associatedAppSettingIcon from "~/static/icons/doc-flow-icon/associatedAppSettingIcon.svg";
export default function(context) {
  const pathGenerate = detail => {
    return `/docFlow/${detail}`;
  };
  const docFlowItem = [
    {
      icon: personalSettingIcon,
      title: context.$t("docFlow.personalSetting.title"),
      items: [
        {
          name: context.$t("docFlow.personalSetting.mySetting"),
          description: context.$t("docFlow.personalSetting.mySettingDescr"),
          path: pathGenerate("personal-settings")
        }
      ]
    },
    {
      icon: documentSettingIcon,
      title: context.$t("docFlow.documentSetting.title"),
      items: [
        {
          name: context.$t("docFlow.documentSetting.docKind"),
          description: context.$t("docFlow.documentSetting.docKindDescr"),
          path: pathGenerate("document-kind")
        },
        {
          name: context.$t("docFlow.documentSetting.categories"),
          description: context.$t("docFlow.documentSetting.categoriesDescr"),
          path: pathGenerate("contract-categories")
        }
      ]
    },
    {
      icon: regSettingIcon,
      title: context.$t("docFlow.regSetting.title"),
      items: [
        {
          name: context.$t("docFlow.regSetting.registration"),
          description: context.$t("docFlow.regSetting.registrationDescr"),
          path: pathGenerate("document-register")
        },

        {
          name: context.$t("docFlow.regSetting.regGroup"),
          description: context.$t("docFlow.regSetting.regGroupDescr"),
          path: pathGenerate("registration-group")
        },
        {
          name: context.$t("docFlow.documentSetting.deliveriMethods"),
          description: context.$t(
            "docFlow.documentSetting.deliveriMethodsDescr"
          ),
          path: pathGenerate("mail-delivery-method")
        }
      ]
    },

    {
      icon: caseFileSettingIcon,
      title: context.$t("docFlow.caseFileSetting.title"),
      items: [
        {
          name: context.$t("docFlow.caseFileSetting.caseFile"),
          description: context.$t("docFlow.caseFileSetting.caseFileDescr"),
          path: pathGenerate("case-files")
        },
        {
          name: context.$t("docFlow.caseFileSetting.fileRetention"),
          description: context.$t("docFlow.caseFileSetting.fileRetentionDescr"),
          path: pathGenerate("file-retention-period")
        }
      ]
    },
    {
      icon: associatedAppSettingIcon,
      title: context.$t("docFlow.associatedAppSetting.title"),
      items: [
        {
          name: context.$t("docFlow.associatedAppSetting.fileType"),
          description: context.$t("docFlow.associatedAppSetting.fileTypeDescr"),
          path: pathGenerate("files-type")
        },
        {
          name: context.$t("docFlow.associatedAppSetting.associatedApp"),
          description: context.$t(
            "docFlow.associatedAppSetting.associatedAppDescr"
          ),
          path: pathGenerate("associated-applications")
        }
      ]
    }
  ];
  return docFlowItem;
}
