import BaseToolbarItem from "./Base.js";
export default class ToolbarItemTypeTemplate extends BaseToolbarItem {
  constructor(
    context,
    { template, location, visible, disabled, ...otherOptions }
  ) {
    super(context, { template, location, visible, disabled, ...otherOptions });
  }
}
