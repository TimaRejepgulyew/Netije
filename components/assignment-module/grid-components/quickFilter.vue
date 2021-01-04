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
import QuiсkFilterGuid from "../infrastructure/constants/quickFilter";
import AssignmentQuickFilterModel from "../infrastructure/models/QuickFilter";
export default {
  components: { QuickFilter },
  props: ["assignmentQuery"],
  data() {
    return {
      defaultFilter: QuiсkFilterGuid.InProcess,
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
    valueChanged(data) {
      this.$emit("valueChanged", data);
    },
  },
};
</script>

<style></style>
