import { createTask } from "~/infrastructure/services/create.js";
import TaskType from "~/infrastructure/constants/taskType.js";
export default function(context) {
  return [
    {
      id: 1,
      name: context.$t("workFlow.actionItemExecution"),
      create: async leadingDocumentId => {
        await createTask(context, {
          taskType: TaskType.ActionItemExecutionTask,
          leadingDocumentId
        });
        context.$router.push(
          `/task/detail/${TaskType.ActionItemExecutionTask}`
        );
      }
    },
    {
      id: 2,
      name: context.$t("workFlow.acquaintance"),
      create: async leadingDocumentId => {
        await createTask(context, {
          taskType: TaskType.AcquaintanceTask,
          leadingDocumentId
        });
        context.$router.push(`/task/detail/${TaskType.AcquaintanceTask}`);
      }
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
