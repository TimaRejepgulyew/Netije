import dataApi from "~/static/dataApi";
import * as taskStoreTemplate from "../storeTemplate/taskStore.js";
import StoreModule from "~/infrastructure/services/StoreModule.js";
export const taskModules = new StoreModule({
  moduleName: "tasks",
  storeTemplate: taskStoreTemplate
});

export async function createTask(
  context,
  params,
  urlPath = dataApi.task.CreateTask
) {
  const { data } = await context.$axios.post(urlPath, params);
  const taskId = data.task.id;
  const taskType = data.task.taskType;
  await taskModules.registerModule(context, taskId);
  context.$store.commit(`tasks/${taskId}/SET_TASK`, data);
  context.$store.commit(`tasks/${taskId}/INCREMENT_OVERLAYS`);
  context.$store.commit(`tasks/${taskId}/SET_IS_DATA_CHANGED`, true);
  context.$store.commit(`tasks/${taskId}/IS_NEW`, true);
  context.$store.commit(`tasks/${taskId}/SKIP_ROUTE_HANDLING`, true);
  return { taskId, taskType };
}

export async function createSubTask(context, params) {
  return await createTask(context, params);
}

export async function createActionItemExicutionTask(
  context,
  {
    parentAssignmentId,
    taskType
  }
) {
  return await createTask(
    context,
    {
      taskType,
      parentAssignmentId
    },
    dataApi.task.CreateDraftResolutionActionItemExecutionTask
  );
}

export async function CreateChildActionItemExecution(
  context,
  parentAssignmentId
) {
  return await createTask(
    context,
    {
      parentAssignmentId
    },
    dataApi.task.CreateChildActionItemExecution
  );
}
export async function createSubtaskByAssignment(context, assignmentId) {
  return await createTask(
    context,
    {
      assignmentId
    },
    dataApi.assignment.CreateSubtask
  );
}
export async function createSubtaskByTask(context, taskId) {
  return await createTask(
    context,
    {
      taskId
    },
    dataApi.task.CreateSubtaskByTask
  );
}
export async function createTaskByDocument(context, params) {
  return await createTask(context, params, dataApi.task.СreateTaskByDocument);
}
export async function load(context, { taskType, taskId }) {
  if (!taskModules.hasModule(taskId)) {
    await taskModules.registerModule(context, taskId);
    const { data } = await context.$axios.get(
      `${dataApi.task.GetTaskById}${taskType}/${taskId}`
    );
    context.$store.commit(`tasks/${taskId}/SET_TASK`, data);
    context.$store.commit(`tasks/${taskId}/SET_IS_DATA_CHANGED`, false);
  }
  if (!context.$store.getters[`tasks/${taskId}/isNew`]) {
    context.$store.commit(`tasks/${taskId}/INCREMENT_OVERLAYS`);
  }
  return { taskType, taskId };
}
export function unload(context, taskId) {
  const overlays = context.$store.getters[`tasks/${taskId}/overlays`];
  if (overlays === 0) {
    context.$store.commit(`tasks/${taskId}/CLEAN_STATE`);
    taskModules.unregisterModule(context, taskId);
  } else context.$store.commit(`tasks/${taskId}/DECREMENT_OVERLAYS`);
}
