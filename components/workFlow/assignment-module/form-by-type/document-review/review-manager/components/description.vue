<template>
  <div v-if="showReaddressee">
    <label class="pr-2">{{ $t("assignment.readdressToEmployee") }}</label>
    <div class="f-grow-1">
      <employee-select-box
        :read-only="!inProcess"
        :value="addressee"
        @valueChanged="valueChanged"
      />
    </div>
  </div>
</template>

<script>
import ReaddresseMixin from "../../../../infrastructure/mixins/assignmentReaddressee.js";
export default {
  mixins: [ReaddresseMixin],
};
</script>

<style>
.pr-2 {
  padding-right: 20px;
}
</style>