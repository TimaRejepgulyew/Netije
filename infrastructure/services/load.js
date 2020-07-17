import dataApi from "~/static/dataApi";
import * as assignmentStoreTemplate from "~/infrastructure/storeTemplate/assignmentStore.js";
export async function loadAssignment(context, assignmentId) {
  if (true) {
    console.log(context.$store);
    await context.$store.registerModule(`assignments/${assignmentId}`, {
      namespaced: true,
      ...assignmentStoreTemplate
    });
  }

  await context.$store.dispatch(
    `assignments/${assignmentId}/load`,
    assignmentId
  );
}
