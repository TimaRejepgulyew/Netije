<template>
  <div>
    <DxForm ref="form" :form-data="documentTracking">
      <DxSimpleItem
        template="employee"
        :editor-options="cardOptions"
        data-field="deliveryToEmployeeId"
      >
        <DxRequiredRule />
        <DxLabel location="left" :text="$t('documentTracking.fileds.deliveryToEmployee')" />
      </DxSimpleItem>
      <template #employee>
        <employee-select-box
          displayExpr="name"
          :readOnly="isCard"
          :value="documentTracking.deliveryTo"
          @valueChanged="onEmployeeChanged"
        ></employee-select-box>
      </template>
      <DxSimpleItem :editor-options="cardOptions" data-field="deliveryDate" editor-type="dxDateBox">
        <DxRequiredRule />
        <DxLabel location="left" :text="$t('documentTracking.fileds.deliveryDate')" />
      </DxSimpleItem>
      <DxSimpleItem
        :editor-options="cardOptions"
        data-field="returnDeadline"
        editor-type="dxDateBox"
      >
        <DxLabel location="left" :text="$t('documentTracking.fileds.returnDeadline')" />
      </DxSimpleItem>

      <DxSimpleItem data-field="note" :editor-options="noteOptions" editor-type="dxTextArea">
        <DxLabel location="top" :text="$t('documentTracking.fileds.note')" />
      </DxSimpleItem>
      <DxSimpleItem :editor-options="cardOptions" data-field="isOriginal" editor-type="dxCheckBox">
        <DxLabel location="left" :text="$t('documentTracking.fileds.isOriginal')" />
      </DxSimpleItem>
      <DxGroupItem :col-count="4" :visible="isCard">
        <DxSimpleItem :col-span="1" data-field="returnResult" editor-type="dxCheckBox">
          <DxRequiredRule />
          <DxLabel location="left" :text="$t('documentTracking.fileds.returnResult')" />
        </DxSimpleItem>
        <DxSimpleItem :col-span="3" data-field="returnDate" editor-type="dxDateBox">
          <DxRequiredRule />
          <DxLabel location="left" :text="$t('documentTracking.fileds.returnDate')" />
        </DxSimpleItem>
      </DxGroupItem>

      <DxButtonItem :button-options="buttonOptions" horizontal-alignment="right" />
    </DxForm>
  </div>
</template>

<script>
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import dataApi from "~/static/dataApi";
import { generateNameByDocQuery } from "~/infrastructure/constants/query/documentQuery.js";
import DxForm, {
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule,
  DxGroupItem
} from "devextreme-vue/form";
export default {
  components: {
    employeeSelectBox,
    DxSimpleItem,
    DxGroupItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxForm
  },
  props: {
    options: {
      type: Object
    }
  },
  computed: {
    isCard() {
      return this.options.isCard ? true : false;
    },
    documentTracking() {
      return {
        officialDocumentId: this.options.documentId,
        action: 0,
        returnDate: null,
        deliveryTo: null,
        isOriginal: false,
        deliveryDate: null,
        returnDeadline: null,
        note: null,
        ...this.options?.currentExtradition
      };
    },
    cardOptions() {
      return {
        disabled: this.isCard
      };
    },
    returnDateOptions() {
      return {
        visible: this.isCard
      };
    },
    noteOptions() {
      return {
        height: 70,
        autoResizeEnabled: true,
        disabled: this.isCard
      };
    },
    buttonOptions() {
      return {
        text: "Сохранить",
        useSubmitBehavior: true,
        onClick: this.saveExtradition
      };
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onEmployeeChanged(e) {
      this.documentTracking.deliveryTo = e;
    },
    saveExtradition() {
      if (this.$refs["form"].instance.validate().isValid) {
        if (this.isCard) {
          this.updateExtradition();
        } else {
          this.registerExtradition();
        }
      } else {
        return false;
      }
    },
    updateExtradition() {
      this.$awn.asyncBlock(
        this.$axios.put(
          dataApi.DocumentTracking.putDocumentTracking,
          this.documentTracking
        ),
        e => {
          this.$awn.success();
          this.close();
        },
        e => {
          this.$awn.alert();
        }
      );
    },
    registerExtradition() {
      this.$awn.asyncBlock(
        this.$axios.post(
          dataApi.DocumentTracking.postDocumentTracking,
          this.documentTracking
        ),
        e => {
          this.$awn.success();
          this.close();
        },
        e => {
          this.$awn.alert();
        }
      );
    }
  },
  mounted() {
    this.$emit("loadStatus");
    this.$emit("showTitle", this.$t("documentTracking.title"));
  }
};
</script>

<style></style>
