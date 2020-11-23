export default class BaseToolbarItem {
  constructor(
    context,
    { location = "before", visible = true, disabled = false, ...otherOptions }
  ) {
    this.options = {
      location,
      visible,
      disabled,
      ...otherOptions
    };
  }
}
