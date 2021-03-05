<template>
  <div id="constructor_chat_room_header">
    <div class="selector">
      <!-- <EmployeeTaxBox
        :activeStateEnabled="false"
        :hoverStateEnabled="false"
        :focusStateEnabled="false"
        :stylingMode="'underlined'"
        :height="60"
      />-->
      <EmployeeSelectBox />
    </div>
  </div>
</template>

<script>
import EmployeeTaxBox from "~/components/employee/custom-tag-box.vue";
import EmployeeSelectBox from "~/components/employee/custom-select-box.vue";
export default {
  components: {
    EmployeeTaxBox,
    EmployeeSelectBox
  }
};
</script>

<style lang="scss">
#constructor_chat_room_header {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 5px 0 5px;
  .selector {
    flex-grow: 1;
  }
}
</style>