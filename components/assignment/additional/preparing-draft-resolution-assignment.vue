<template>
  <div class="">
    <label class="pr-2">{{$t("assignment.readdressToEmployee")}}</label>
    <div class="f-grow-1">
      <employee-select-box
        :read-only="!InProcess"
        :value="addresseeId"
        @valueChanged="valueChanged"
      />
    </div>
  </div>
</template>

<script>
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import dataApi from "~/static/dataApi";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
  
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
    }
  },
  computed: {
    addresseeId() {
      return this.$store.getters["currentAssignment/assignment"].addresseeId;
    },
    InProcess() {
      return this.$store.getters["currentAssignment/InProcess"];
    }
  }
};
</script>

<style>
.pr-2 {
  padding-right: 20px;
}
</style>