<template>
  <main>
    <component
      :assignmentQuery="AssignmentQuery.All"
      :is="generateGridComponentByAssignmentQuery"
    />
  </main>
</template>
<script>
import AssignmentQuery from "~/components/workFlow//infrastructure/constants/query/assignmentQuery.js";
import * as assignmentGrids from "~/components/workFlow/assignment-module/grid-by-query/index.js";
export default {
  components: {
    ...assignmentGrids,
  },
  data() {
    return {
      AssignmentQuery,
    };
  },
  computed: {
    generateGridComponentByAssignmentQuery() {
      switch (+this.$route.params.type || AssignmentQuery.All) {
        case AssignmentQuery.All:
          return "allAssignment";
        case AssignmentQuery.OnExicution:
          return "onExicution";
        case AssignmentQuery.OnReview:
          return "onReview";
        case AssignmentQuery.OnAcquaintance:
          return "onAcquaintance";
        case AssignmentQuery.OnDocumentReview:
          return "onDocumentReview";
        case AssignmentQuery.ReviewResolution:
          return "reviewResolution";
      }
    },
  },
};
</script>
<style lang="scss" scoped >
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";

.icon--type {
  display: flex;
  margin: 0 auto;
  height: 20px;
  width: 100%;
}
</style>
