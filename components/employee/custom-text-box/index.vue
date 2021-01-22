<template>
  <div>
    <DxTextBox
      :read-only="true"
      :value="value.name"
      field-template="customfield"
      :buttons="buttonOptions"
    >
    </DxTextBox>
  </div>
</template>

<script>
import customField from "~/components/employee/custom-employee-field";
import EntityType from "~/infrastructure/constants/entityTypes";
import { DxTextBox } from "devextreme-vue";
export default {
  components: {
    DxTextBox,
    customField,
  },
  props: {
    value: {},
    valueExpr: {},
  },
  methods: {
    showCard() {
      this.$popup.employeeCard(
        this,
        {
          employeeId: this.employeeId,
        },
        {
          height: "auto",
        }
      );
    },
  },
  computed: {
    showBtn() {
      return this.employeeId !== null
        ? this.$store.getters["permissions/allowReading"](EntityType.Employee)
        : false;
    },
    buttonOptions() {
      return [
        {
          name: "just",
          location: "after",
          options: {
            type: "default",
            stylingMode: "text",
            hint: this.$t("translations.fields.moreAbout"),
            icon: "info",
            disabled: false,
            visible: this.showBtn,
            onClick: this.showCard,
          },
        },
      ];
    },
    employeeId() {
      return this.valueExpr ? this.value : this.value?.id;
    },
  },
};
</script>

<style></style>
