const assignmentQuery = {
  All: 0,
  OnExicution: 1,
  OnReview: 2,
  OnDocumentReview: 3,
  ReviewResolution: 4,
  OnApproval: 5,
  ForRework: 6
};
export default assignmentQuery;
export function generateAssignmentQueryName(key, context) {
  const assignmentQueryNames = new Map();
  for (let item in assignmentQuery) {
    assignmentQueryNames.set(
      assignmentQuery[item],
      context.$t(`AssignmentQuery.${item[0].toLowerCase() + item.slice(1)}`)
    );
  }

  return assignmentQueryNames.get(key);
}
