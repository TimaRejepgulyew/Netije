const assignmentQuery = {
  All: 0,
  OnExicution: 1,
  OnReview: 2,
  OnAcquaintance: 3,
  OnDocumentReview: 4,
  ReviewResolution: 5,
  OnApproval: 6
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
