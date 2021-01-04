<template>
  <main>
    <component
      :assignmentQuery="+$route.params.type"
      :is="generateGridComponentByAssignmentQuery"
    />
  </main>
</template>
<script>
import AssignmentQuery from "~/components/assignment-module/infrastructure/constants/assignmentQuery.js";
import * as assignmentGrids from "~/components/assignment-module/grid-by-query/index.js";

export default {
  components: {
    ...assignmentGrids,
  },
  computed: {
    generateGridComponentByAssignmentQuery() {
      switch (+this.$route.params.type) {
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
        case AssignmentQuery.OnApproval:
          return "onApproval";
        case AssignmentQuery.ForRework:
          return "forRework";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";

.icon--type {
  display: flex;
  margin: 0 auto;
  height: 20px;
  width: 100%;
}
</style>
