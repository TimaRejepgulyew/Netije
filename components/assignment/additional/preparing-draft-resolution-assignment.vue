<template>
  <div class="d-flex align-center">
    <label class="pr-2">{{$t("assignment.readdressToEmployee")}}</label>
    <div class="f-grow-1">
      <employee-select-box
        :read-only="!inProccess"
        :value="addresseeId"
        @valueChanged="valueChanged"
      />
    </div>
  </div>
</template>

<script>
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import updateCard from "~/components/employee/employee-card.vue";
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import customSelectItem from "~/components/employee/custom-select-box-item.vue";
import customField from "~/components/employee/custom-employee-field";
import dataApi from "~/static/dataApi";
import { DxSelectBox } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxSelectBox,
    customSelectItem,
    customField,
    updateCard,
    DxPopup,
    DxButton,
    employeeSelectBox
  },
  data() {
    return {
      employeeStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.storeApi || dataApi.company.Employee
        })
      }),
      isCardOpened: false
    };
  },
  methods: {
    valueChanged(id) {
      this.$store.commit("currentAssignment/SET_ADDRESSEE_ID", id);
      console.log(
        this.$store.getters["currentAssignment/assignment"].addresseeId
      );
    }
  },
  computed: {
    addresseeId() {
      return this.$store.getters["currentAssignment/assignment"].addresseeId;
    },
    inProccess() {
      return this.$store.getters["currentAssignment/inProccess"];
    }
  }
};
</script>

<style>
.pr-2 {
  padding-right: 20px;
}
</style>