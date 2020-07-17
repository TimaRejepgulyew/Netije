import dataApi from "~/static/dataApi";
import * as assignmentStoreTemplate from "~/infrastructure/storeTemplate/assignmentStore.js";
export async function loadAssignment(context, assignmentId) {
  await context.$store.registerModule(`assignments/${assignmentId}`, {
    namespaced: true,
    ...assignmentStoreTemplate
  });
  console.log(context.$store);
  await context.$store.dispatch(
    `assignments/${assignmentId}/load`,
    assignmentId
  );
}
