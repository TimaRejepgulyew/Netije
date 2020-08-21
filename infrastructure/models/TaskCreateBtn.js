import TaskType from "~/infrastructure/models/TaskType.js";
import { createTask } from "~/infrastructure/services/taskService.js";
import toRouter from "~/infrastructure/services/toRouterDetail.js";
async function create(context, params) {
  const { taskId, taskType } = await createTask(context, params);
  const route = `/task/detail/${+taskType}/${taskId}`;
  const replaceOldRoute = context.$store.getters[`tasks/${taskId}/isNew`];
  toRouter(context, { route, replaceOldRoute });
}
export default class CreateTaskBtn extends TaskType {
  init() {
    for (let element in this.elements) {
      console.log(element);
      this.elements[element].create = context =>
        create(context, { taskType: +element });
    }
    return this;
  }
}
