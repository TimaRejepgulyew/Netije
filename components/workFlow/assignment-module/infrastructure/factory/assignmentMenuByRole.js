import AssignmentQuery from "../constants/assignmentQuery";

const menuForBusinessUnitHead = context => {
  return [onReview(context), onDocumentReview(context), onApproval(context)];
};
const menuForDepartmentAssistant = context => {
  return [onApproval(context), onExicution(context), onReview(context)];
};
const menuForClerk = context => {
  return [onExicution(context), onReview(context)];
};
const menuForManagerAssistant = context => {
  return [onApproval(context), onReview(context), reviewResolution(context)];
};
const menuForEmployee = context => {
  return [onApproval(context), onExicution(context), forRework(context)];
};

const getMenuByRole = (context, rootGetters) => {
  const isManagerAssistant = rootGetters["permissions/isManagerAssistant"];
  const isClerk = rootGetters["permissions/isClerk"];
  const isBusinessHead = rootGetters["permissions/isBusinessHead"];
  const isDepartmentManager = rootGetters["permissions/isDepartmentManager"];
  if (isManagerAssistant) {
    return menuForManagerAssistant(context);
  } else if (isBusinessHead) {
    return menuForBusinessUnitHead(context);
  } else if (isDepartmentManager) {
    return menuForDepartmentAssistant(context);
  } else if (isClerk) {
    return menuForClerk(context);
  } else {
    return menuForEmployee(context);
  }
};
const onReview = context => {
  return {
    notificationType: "assignment",
    query: AssignmentQuery.OnReview,
    template: "assignment-item",
    text: context.$i18n.t("AssignmentQuery.onReview"),
    path: `/assignment/${AssignmentQuery.OnReview}`
  };
};
const onExicution = context => {
  return {
    notificationType: "assignment",
    query: AssignmentQuery.OnExicution,
    template: "assignment-item",
    text: context.$i18n.t("AssignmentQuery.onExicution"),
    path: `/assignment/${AssignmentQuery.OnExicution}`
  };
};
const forRework = context => {
  return {
    notificationType: "assignment",
    query: AssignmentQuery.ForRework,
    template: "assignment-item",
    text: context.$i18n.t("AssignmentQuery.forRework"),
    path: `/assignment/${AssignmentQuery.ForRework}`
  };
};
const onDocumentReview = context => {
  return {
    notificationType: "assignment",
    query: AssignmentQuery.OnDocumentReview,
    template: "assignment-item",
    text: context.$i18n.t("AssignmentQuery.onDocumentReview"),
    path: `/assignment/${AssignmentQuery.OnDocumentReview}`
  };
};
const reviewResolution = context => {
  return {
    notificationType: "assignment",
    query: AssignmentQuery.ReviewResolution,
    template: "assignment-item",
    text: context.$i18n.t("AssignmentQuery.reviewResolution"),
    path: `/assignment/${AssignmentQuery.ReviewResolution}`
  };
};
const onApproval = context => {
  return {
    notificationType: "assignment",
    query: AssignmentQuery.OnApproval,
    template: "assignment-item",
    text: context.$i18n.t("AssignmentQuery.onApproval"),
    path: `/assignment/${AssignmentQuery.OnApproval}`
  };
};

export default (context, rootGetters) => {
  return getMenuByRole(context, rootGetters);
};
