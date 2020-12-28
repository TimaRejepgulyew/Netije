import dataApi from "~/static/dataApi";
import * as assignmentStoreTemplate from "~/infrastructure/storeTemplate/assignmentStore.js";
import StoreModule from "~/infrastructure/services/StoreModule.js";
const assignmentModules = new StoreModule({
  moduleName: "assignments",
  storeTemplate: assignmentStoreTemplate
});

export async function load(context, assignmentId) {
  if (!assignmentModules.hasModule(assignmentId)) {
    assignmentModules.registerModule(context, assignmentId);
    await context.$store.dispatch(
      `assignments/${assignmentId}/load`,
      assignmentId
    );
  }
  context.$store.commit(`assignments/${assignmentId}/INCREMENT_OVERLAYS`);
}

export function unload(context, assignmentId) {
  const overlays =
    context.$store.getters[`assignments/${assignmentId}/overlays`];
  if (overlays === 0) {
    context.$store.commit(`assignments/${assignmentId}/CLEAN_STATE`);
    assignmentModules.unregisterModule(context, assignmentId);
  } else
    context.$store.commit(`assignments/${assignmentId}/DECREMENT_OVERLAYS`);
}

export async function sendResult(
  context,
  { id, assignmentType, result, body },
  params
) {
  const assignmentJson = JSON.stringify({ id, result, body });
  await context.$axios.post(dataApi.assignment.CompleteAssignment, {
    assignmentId: id,
    assignmentType,
    assignmentJson,
    ...params
  });
}
