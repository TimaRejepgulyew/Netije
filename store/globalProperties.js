import DataSource from "devextreme/data/data_source";
export const state = () => ({
  whitespacePattern: /^[^\s]*$/,
  FormOptions({ context, url, filter, disabled, value = "name" }) {
    return {
      dataSource: new DataSource({
        store: context.$dxStore({
          key: "id",
          loadUrl: url
        }),
        filter
      }),

      disabled,
      showClearButton: true,
      valueExpr: "id",
      displayExpr: value,
      searchEnabled: true,
      searchExpr: value,
      paginate: true,
      pageSize: 10
    };
  },
  btnSave(context) {
    return {
      text: context.$t("buttons.save"),
      useSubmitBehavior: true,
      type: "success"
    };
  },
  btnCompleted(context) {
    return {
      text: context.$t("buttons.complete"),
      useSubmitBehavior: true,
      type: "success"
    };
  },
  btnCancel(context, onClick) {
    return {
      onClick,
      text: context.$t("buttons.cancel"),
      useSubmitBehavior: false
    };
  },
  btnSend(context) {
    return {
      icon: "arrowright",
      text: context.$t("buttons.send"),
      useSubmitBehavior: true
    };
  },
});
export const getters = {
  whitespacePattern({ whitespacePattern }) {
    return whitespacePattern;
  },
  FormOptions: ({ FormOptions }) => options => {
    return new FormOptions(options);
  },
  btnCancel: ({ btnCancel }) => (context, onClick) => {
    return btnCancel(context, onClick);
  },
  btnSave: ({ btnSave }) => context => {
    return btnSave(context);
  },
  btnCompleted: ({ btnCompleted }) => context => {
    return btnCompleted(context);
  },
  btnSend: ({ btnSend }) => context => {
    return btnSend(context);
  },
  toForm: () => (context, path = "add") => {
    return context.$router.push(`${context.$route.path}/form/${path}`);
  }
};
