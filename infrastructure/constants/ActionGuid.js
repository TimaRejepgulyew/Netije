export default function(context) {
  return [
    {
      id: 1,
      name: context.$t("workFlow.actionItemExecution"),
      path: "/task/action-item-execution/create"
    },
    {
      id: 2,
      name: context.$t("workFlow.acquaintance"),
      path: "/task/acquaintance/create"
    },
    {
      id: 3,
      name: context.$t("workFlow.reviewManager")
    },
    {
      id: 4,
      name: context.$t("workFlow.freeApproval")
    },
    {
      id: 5,
      name: context.$t("workFlow.approval")
    }
  ];
}
