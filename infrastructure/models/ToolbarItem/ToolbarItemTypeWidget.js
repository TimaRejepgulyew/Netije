import BaseToolbarItem from "./Base.js";
export default class ToolbarItemTypeWidget extends BaseToolbarItem {
  constructor(
    context,
    {
      template,
      location,
      visible,
      disabled,
      widget = "dxButton",
      options,
      ...otherOptions
    }
  ) {
    super(context, {
      template,
      location,
      visible,
      disabled,
      widget,
      options,

      ...otherOptions
    });
  }
}
