import DataSource from "devextreme/data/data_source";
export const state = () => ({
  whitespacePattern: /^[^\s]*$/,
  FormOptions(context, url, filter, disabled=false, onValueChanged,) {
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
      displayExpr: "name",
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
  }
};
