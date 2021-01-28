<template>
  <div>
    <toolbar
      :isCard="true"
      :canExchange="false"
      @saveChanges="submit"
      :canSave="true"
    />
    <DxForm ref="form" :form-data="counterPart" col-count="1">
      <DxGroupItem :caption="$t('exchange.fields.settings')" :col-count="2">
        <DxSimpleItem data-field="canExchange">
          <DxLabel location="left" :text="$t('exchange.fields.canExchange')" />
        </DxSimpleItem>
        <DxSimpleItem
          :visible="!isIntranet"
          editor-type="dxSelectBox"
          :editor-options="exchangeBoxTypeOptions"
          data-field="exchangeBoxType"
        >
          <DxLabel
            location="left"
            :text="$t('exchange.fields.exchangeBoxType')"
          />
        </DxSimpleItem>
      </DxGroupItem>

      <DxGroupItem>
        <DxGroupItem :caption="$t('exchange.fields.reception')">
          <DxSimpleItem
            :isRequired="true"
            :visible="isIntranet"
            data-field="responsibleEmployee"
            template="employee"
          >
            <DxLabel
              location="left"
              :text="$t('exchange.fields.responsibleEmployee')"
            />
          </DxSimpleItem>
          <DxSimpleItem :visible="!isIntranet" data-field="organizationId">
            <DxLabel
              location="left"
              :text="$t('exchange.fields.organizationId')"
            />
          </DxSimpleItem>
          <DxSimpleItem :visible="!isIntranet" data-field="publicKey">
            <DxLabel location="left" :text="$t('exchange.fields.publicKey')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxGroupItem
          :visible="!isIntranet"
          :caption="$t('exchange.fields.dispatch')"
        >
          <DxSimpleItem editor-type="dxTextArea" data-field="url">
            <DxLabel location="left" text="URL" />
          </DxSimpleItem>
        </DxGroupItem>
      </DxGroupItem>

      <template #employee>
        <employee-select-box
          :value="counterPart.responsibleEmployee"
          @valueChanged="changeEmployee"
        />
      </template>
    </DxForm>
  </div>
</template>

<script>
import DxForm, {
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
  DxButtonItem,
  DxGroupItem,
} from "devextreme-vue/form";
import Toolbar from "~/components/shared/base-toolbar.vue";
import EmployeeSelectBox from "~/components/employee/custom-select-box.vue";

import dataApi from "~/static/dataApi.js";
import counterpartyExchangeBoxType from "~/components/integration-exchage/infrastructure/constants/counterpartyExchangeBoxType.js";
export default {
  components: {
    DxForm,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxButtonItem,
    DxGroupItem,
    EmployeeSelectBox,
    Toolbar,
  },
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      exchangeBoxType: this.data.exchangeBoxType,
    };
  },
  computed: {
    counterPart() {
      return {
        counterpartyId: 0,
        canExchange: true,
        exchangeBoxType: 0,
        responsibleEmployee: null,
        organizationId: null,
        url: null,
        publicKey: null,
        ...this.data,
      };
    },
    exchangeBoxTypeOptions() {
      var arr = Object.values(counterpartyExchangeBoxType);
      arr.pop();
      return {
        dataSource: arr,
        displayExpr: this.customizeText,
        onValueChanged: (e) => {
          this.counterPart.responsibleEmployee = null;
          this.exchangeBoxType = e.value;
        },
      };
    },
    isIntranet() {
      return this.exchangeBoxType === counterpartyExchangeBoxType.intranet;
    },
  },
  methods: {
    changeEmployee(value) {
      this.counterPart.responsibleEmployee = value;
      this.$refs["form"].instance.repaint();
    },
    submit() {
      if (this.$refs["form"].instance.validate().isValid) {
        this.$awn.asyncBlock(
          this.$axios.post(
            dataApi.exchange.UpdateExchangeInfo,
            this.counterPart
          ),
          (e) => {
            this.$emit("close");
            this.$awn.success();
          },
          (e) => {
            this.$awn.alert();
          }
        );
      }
    },
    customizeText(e) {
      for (const key in counterpartyExchangeBoxType) {
        if (counterpartyExchangeBoxType[key] == e) {
          return this.$t(`exchange.providers.${key}`);
        }
      }
    },
  },
};
</script>

