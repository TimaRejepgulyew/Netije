import dataApi from "~/static/dataApi";
import * as assignmentStoreTemplate from "~/infrastructure/storeTemplate/assignmentStore.js";
const registeredModules = {};

export async function load(context, assignmentId) {
  if (!registeredModules[assignmentId]) {
    await context.$store.registerModule(`assignments/${assignmentId}`, {
      namespaced: true,
      ...assignmentStoreTemplate
    });

    await context.$store.dispatch(
      `assignments/${assignmentId}/load`,
      assignmentId
    );
    registeredModules[assignmentId] = true;
  }
  context.$store.commit(`assignments/${assignmentId}/INCREMENT_OVERLAYS`);
}
export function unload(context, assignmentId) {
  const overlays =
    context.$store.getters[`assignments/${assignmentId}/overlays`];
  if (!overlays) {
    context.$store.unregisterModule(`assignments/${assignmentId}`);
    registeredModules[assignmentId] = false;
  } else
    context.$store.commit(`assignments/${assignmentId}/DECREMENT_OVERLAYS`);
}
