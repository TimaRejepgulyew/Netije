import DataSource from "devextreme/data/data_source";
export const state = () => ({
  whitespacePattern: /^[^\s]*$/,
  FormOptions(context, url, filter, disabled = false, onValueChanged) {
    return {
      dataSource: new DataSource({
        store: context.$dxStore({
          key: "id",
          loadUrl: url
        }),
        filter
      }),
      onValueChanged,
      disabled,
      showClearButton: true,
      valueExpr: "id",
      displayExpr: "name"
    };
  },
  btnSave(context) {
    return {
      text: context.$t("translations.links.save"),
      useSubmitBehavior: true,
      type: "success"
    };
  },
  btnCancel(context, onClick) {
    return {
      onClick,
      text: context.$t("translations.links.cancel"),
      useSubmitBehavior: false
    };
  }
});

export const getters = {
  whitespacePattern({ whitespacePattern }) {
    return whitespacePattern;
  },
  FormOptions: ({ FormOptions }) => ({
    context,
    url,
    filter,
    disabled,
    onValueChanged
  }) => {
    return new FormOptions(context, url, filter, disabled, onValueChanged);
  },
  btnCancel: ({ btnCancel }) => (context, onClick) => {
    return btnCancel(context, onClick);
  },
  btnSave: ({ btnSave }) => context => {
    return btnSave(context);
  }
};
