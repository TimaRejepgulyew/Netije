export default context => {};
const simpleTaskToolbar = context => {
  
};
const acquaintanceTaskToolbar = context => {};
const actionItemExecutionTaskToolbar = context => {};
const documentReviewTaskToolbar = context => {};
const freeApprovalTaskToolbar = context => {};
class BaseToolbarItem {
  constructor(
    context,
    { location = "before", visible = true, disabled = false, ...options }
  ) {
    this.options = {
      location,
      visible,
      disabled
    };
  }
}
class ToolbarItemWithTemplate extends BaseToolbarItem {
  constructor(context, { template, location, visible, disabled, ...options }) {
    super(context, { template, location, visible, disabled, ...options });
  }
}
class ToolbarItemWidget extends BaseToolbarItem {
  constructor(
    context,
    { template, location, visible, disabled, widget = "dxButton", ...options }
  ) {
    super(context, {
      template,
      location,
      visible,
      disabled,
      widget,
      ...options
    });
  }
}
function switchToCompountBtn(context) {
  const options = { template: "swichToCompoundActionItem", };
  return new ToolbarItemWithTemplate(context, {
    template,
    location,
    visible,
    disabled
  });
}
function startBtn(context){

}
