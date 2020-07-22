import dataApi from "~/static/dataApi";
import * as taskStoreTemplate from "~/infrastructure/storeTemplate/taskStore.js";
import StoreModule from "~/infrastructure/services/StoreModule.js";
import TaskType from "~/infrastructure/constants/TaskType.js";
export const taskModules = new StoreModule({
  moduleName: "tasks",
  storeTemplate: taskStoreTemplate
});

export async function createTask(context, params) {
  const { data } = await context.$axios.post(dataApi.task.CreateTask, params);
  const taskId = data.task.id;
  const taskType = data.task.taskType;
  await taskModules.registerModule(context, taskId);
  context.$store.commit(`tasks/${taskId}/SET_TASK`, data);
  context.$store.commit(`tasks/${taskId}/SET_IS_DATA_CHANGED`, true);
  context.$store.commit(`tasks/${taskId}/IS_NEW`, true);
  context.$store.commit(`tasks/${taskId}/INCREMENT_OVERLAYS`);
  return { taskId, taskType };
}

export async function createSubTask(context, params) {
  return await createTask(context, params);
}

export async function createActionItemExicutionTask(context, parentAssignment) {
  return await createTask(context, {
    parentAssignment,
    taskType: TaskType.ActionItemExecutionTask
  });
}
export async function createTaskByDocument(context, params) {
  return await createTask(context, params);
}
export async function load(context, { taskType, taskId }) {
  if (!taskModules.hasModule(taskId)) {
    const { data } = await context.$axios.get(
      `${dataApi.task.GetTaskById}${taskType}/${taskId}`
    );
    await taskModules.registerModule(context, taskId);
    context.$store.commit(`tasks/${taskId}/SET_TASK`, data);
  }
  context.$store.commit(`tasks/${taskId}/INCREMENT_OVERLAYS`);
}
export function unload(context, taskId) {
  const overlays = context.$store.getters[`tasks/${taskId}/overlays`];
  console.log(overlays);
  if (!overlays) {
    taskModules.unregisterModule(context, taskId);
  } else context.$store.commit(`tasks/${taskId}/DECREMENT_OVERLAYS`);
}
