import Vue from "vue";
import VueAWN from "vue-awesome-notifications";
export default ({ app }, inject) => {
  const options = {
    icons: {
      async: "~/static/icons/loading.gif"
    },
    labels: {
      info: app.i18n.t("translations.notification.labels.info"),
      success: app.i18n.t("translations.notification.labels.success"),
      alert: app.i18n.t("translations.notification.labels.alert"),
      warning: app.i18n.t("translations.notification.labels.warning"),
      async: app.i18n.t("translations.notification.labels.async")
    },
    messages: {
      info: app.i18n.t("translations.notification.messages.info"),
      success: app.i18n.t("translations.notification.messages.success"),
      alert: app.i18n.t("translations.notification.messages.alert"),
      warning: app.i18n.t("translations.notification.messages.warning"),
      async: app.i18n.t("translations.notification.messages.async"),
      "async-block": app.i18n.t("translations.notification.messages.asyncBlock")
    },
    position: "bottom-right"
  };
  Vue.use(VueAWN, options);
};
