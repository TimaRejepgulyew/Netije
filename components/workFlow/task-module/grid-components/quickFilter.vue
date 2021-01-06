<template>
  <div>
    <QuickFilter
      :defaultValue="defaultFilter"
      :dataSource="QuiсkFilterItems"
      :storeKey="'task-' + taskQuery"
      @valueChanged="valueChanged"
    />
  </div>
</template>

<script>
import QuickFilter from "~/components/quick-filter/index.vue";
import QuiсkFilterGuid from "../../infrastructure/constants/quickFilter/taskQuickFilter.js";
import TaskQuickFilterModel from "../../infrastructure/models/TaskQuickFilter.js";
export default {
  components: { QuickFilter },
  props: ["taskQuery"],
  data() {
    return {
      defaultFilter: QuiсkFilterGuid.InProcess
    };
  },
  computed: {
    QuiсkFilterItems() {
      return Object.values(new TaskQuickFilterModel(this).getAll()).map(
        item => {
          item.hint = item.text;
          return item;
        }
      );
    }
  },
  methods: {
    valueChanged(data) {
      this.$emit("valueChanged", data);
    }
  }
};
</script>

<style></style>