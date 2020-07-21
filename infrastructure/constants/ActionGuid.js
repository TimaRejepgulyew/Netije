import { createTaskByDocument } from "~/infrastructure/services/taskService.js";
import TaskType from "~/infrastructure/constants/taskType.js";

export default function(context) {
  return [
    {
      id: 1,
      name: context.$t("workFlow.actionItemExecution"),
      async create(params) {
        const { taskType, taskId } = await createTaskByDocument(context, {
          taskType: TaskType.ActionItemExecutionTask,
          ...params
        });
        context.$router.push(`/task/detail/${taskType}/${taskId}`);
      }
    },
    {
      id: 2,
      name: context.$t("workFlow.acquaintance"),
      async create(params) {
        const { taskType, taskId } = await createTaskByDocument(context, {
          taskType: TaskType.AcquaintanceTask,
          ...params
        });
        context.$router.push(`/task/detail/${taskType}/${taskId}`);
      }
    },
    {
      id: 3,
      name: context.$t("workFlow.reviewManager"),
      async create(params) {
        const { taskType, taskId } = await createTaskByDocument(context, {
          taskType: TaskType.DocumentReviewTask,
          ...params
        });
        context.$router.push(`/task/detail/${taskType}/${taskId}`);
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
