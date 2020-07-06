import { createTaskRequest } from "~/infrastructure/constants/creatingItems.js";
import TaskType from "~/infrastructure/constants/taskType.js";
export default function(context) {
  return [
    {
      id: 1,
      name: context.$t("workFlow.actionItemExecution"),
      async create(params) {
        await createTaskRequest(context, {
          taskType: TaskType.ActionItemExecutionTask,
          ...params
        });
      }
    },
    {
      id: 2,
      name: context.$t("workFlow.acquaintance"),
      async create(params) {
        await createTaskRequest(context, {
          taskType: TaskType.AcquaintanceTask,
          ...params
        });
      }
    },
    {
      id: 3,
      name: context.$t("workFlow.reviewManager"),
      async create(params) {
        await createTaskRequest(context, {
          taskType: TaskType.DocumentReviewTask,
          ...params
        });
      }
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
