<template>
  <div>
    <div v-if="!isRework">
      <label class="pr-2">{{ $t("assignment.readdressToEmployee") }}</label>
      <div class="f-grow-1">
        <employee-select-box
          :read-only="!canUpdate"
          :value="addressee"
          @valueChanged="valueChanged"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ReaddresseMixin from "../../../../infrastructure/mixins/assignmentReaddressee.js";
export default {
  mixins: [ReaddresseMixin],
};
</script>