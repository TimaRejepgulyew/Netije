export default function(context) {
  return [
    {
      id: 10,
      name: context.$t("history.create")
    },
    {
      id: 20,
      name: context.$t("history.read")
    },
    {
      id: 30,
      name: context.$t("history.update")
    },
    {
      id: 40,
      name: context.$t("history.createVersion")
    },
    {
      id: 41,
      name:context.$t("history.removeVersion")
    },
    {
      id: 50,
      name: context.$t("history.delete")
    },
    {
      id: 60,
      name: context.$t("history.manage")
    },
    {
      id: 70,
      name: context.$t("history.registration")
    },
    {
      id: 80,
      name: context.$t("history.deregistration")
    },
    {
      id: 90,
      name: context.$t("history.downloadVersion")
    },
    {
      id: 100,
      name: context.$t("history.previewVersion")
    },
    {
      id: 200,
      name: context.$t("history.login")
    },
    {
      id: 300,
      name: context.$t("history.loginFailed")
    },
    {
      id: 400,
      name: context.$t("history.logout")
    }
  ];
}
