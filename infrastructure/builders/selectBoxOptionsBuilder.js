import DataSource from "devextreme/data/data_source";

export default class SelectBoxOptionBuilder {
  constructor() {
    this.deferRendering = true;
    this.valueExpr = "id";
    this.showClearButton = true;
    this.displayExpr = "name";
    this.searchEnabled = true;
    this.searchExpr = "name";
    this.paginate = true;
    this.pageSize = 10;
    this.acceptCustomValue = false;
    this.focusStateEnabled = false;
    this.key = "id";
  }

  withoutDeferRendering() {
    this.deferRendering = false;
    return this;
  }
  setValueExpr(data) {
    this.valueExpr = data;
    return this;
  }
  withUrl(url) {
    this.url = url;
    return this;
  }

  focusStateDisabled() {
    this.focusStateEnabled = false;
    return this;
  }
  setKey(key) {
    this.key = key;
    return this;
  }
  acceptCustomValues(callback) {
    this.acceptCustomValue = true;
    this.onCustomItemCreating = callback;
    return this;
  }

  filter(filter) {
    this.filter = filter;
    return this;
  }

  clearValueExpr() {
    delete this.valueExpr;
    return this;
  }

  build(context) {
    const obj = {
      dataSource: new DataSource({
        store: context.$dxStore({
          key: this.key,
          loadUrl: this.url
        }),
        paginate: true,
        pageSize: 10,
        filter: this.filter
      }),
      focusStateEnabled: this.focusStateEnabled,
      acceptCustomValue: this.acceptCustomValue,
      deferRendering: this.deferRendering,
      valueExpr: this.valueExpr,
      showClearButton: this.showClearButton,
      displayExpr: this.displayExpr,
      searchEnabled: this.searchEnabled,
      searchExpr: this.searchExpr,
      paginate: this.paginate,
      pageSize: this.pageSize
    };

    if (this.onCustomItemCreating) {
      Object.assign(obj, this.onCustomItemCreating);
    }

    return obj;
  }
}
