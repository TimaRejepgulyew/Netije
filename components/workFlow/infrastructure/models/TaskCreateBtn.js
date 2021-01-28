import TaskType from "./TaskType";
import TaskTypeGuid from "../constants/taskType.js";
import { createTask } from "../services/taskService.js";
import toRouter from "~/infrastructure/services/toRouterDetail.js";
async function create(context, params) {
  const { taskId, taskType } = await createTask(context, params);
  const route = `/task/detail/${+taskType}/${taskId}`;
  let replaceOldRoute = false;
  if (context.$route.name.includes("task-detail-type-id")) {
    replaceOldRoute =
      context.$store.getters[`tasks/${context.$route.params.id}/isNew`];
  } else {
    replaceOldRoute = false;
  }

  toRouter(context, { route, replaceOldRoute });
  return { taskId, taskType };
}
export default class CreateTaskBtn extends TaskType {
  init() {
    this.elements = this.getExcludeBy([
      TaskTypeGuid.ExchangeDocumentProcessingTask,
      TaskTypeGuid.IntranetExchangeDocumentProcessingTask
    ]);

    for (let element in this.elements) {
      this.elements[element].create = context =>
        create(context, { taskType: +element });
    }
    return this;
  }
}
