<template>
  <div>
    <QuickFilter
      :defaultValue="defaultFilter"
      :dataSource="QuiсkFilterItems"
      :storeKey="'assignment-' + assignmentQuery"
      @valueChanged="valueChanged"
    />
  </div>
</template>

<script>
import QuickFilter from "~/components/quick-filter/index.vue";
import QuiсkFilterGuid from "../../infrastructure/constants/quickFilter/assignmentQuickFilter";
import AssignmentQuickFilterModel from "../../infrastructure/models/AssignmentQuickFilter";
export default {
  components: { QuickFilter },
  props: ["assignmentQuery"],
  data() {
    return {
      defaultFilter: QuiсkFilterGuid.InProcess,
      QuiсkFilterGuid,
    };
  },
  computed: {
    QuiсkFilterItems() {
      return Object.values(new AssignmentQuickFilterModel(this).getAll()).map(
        (item) => {
          item.hint = item.text;
          return item;
        }
      );
    },
  },
  methods: {
    valueChanged(quickFilter, filter) {
      this.$emit("valueChanged", quickFilter, filter);
    },
  },
};
</script>

<style></style>
