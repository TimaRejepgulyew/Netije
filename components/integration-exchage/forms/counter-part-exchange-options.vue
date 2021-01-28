<template>
  <div>
    <toolbar :isCard="true" :canExchange="false" @saveChanges="submit" :canSave="true" />
    <DxForm ref="form" :form-data="counterPart" col-count="1">
      <DxGroupItem :caption="$t('exchange.fields.settings')" :col-count="2">
        <DxSimpleItem data-field="canExchange">
          <DxLabel location="left" :text="$t('exchange.fields.canExchange')" />
        </DxSimpleItem>
        <DxSimpleItem
          editor-type="dxSelectBox"
          :editor-options="exchangeBoxTypeOptions"
          data-field="exchangeBoxType"
        >
          <DxLabel location="left" :text="$t('exchange.fields.exchangeBoxType')" />
        </DxSimpleItem>
      </DxGroupItem>

      <DxGroupItem>
        <DxGroupItem :caption="$t('exchange.fields.reception')">
          <DxSimpleItem :visible="isIntranet" data-field="employee" template="employee">
            <DxLabel location="left" :text="$t('exchange.fields.responsibleEmployee')" />
          </DxSimpleItem>
          <DxSimpleItem :visible="!isIntranet" data-field="organizationId">
            <DxLabel location="left" :text="$t('exchange.fields.organizationId')" />
          </DxSimpleItem>
          <DxSimpleItem :visible="!isIntranet" data-field="publicKey">
            <DxLabel location="left" :text="$t('exchange.fields.publicKey')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxGroupItem :visible="!isIntranet" :caption="$t('exchange.fields.dispatch')">
          <DxSimpleItem editor-type="dxTextArea" data-field="url">
            <DxLabel location="left" text="URL" />
          </DxSimpleItem>
          <!-- <DxGroupItem :visible="ifEResminama">
          <DxSimpleItem data-field="eId"></DxSimpleItem>
          <DxSimpleItem data-field="ePass" :editor-options="{mode:'password'}"></DxSimpleItem>
          </DxGroupItem>-->
        </DxGroupItem>
      </DxGroupItem>

      <template #employee>
        <employee-select-box :value="counterPart.employee" @valueChanged="changeEmployee" />
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
  DxGroupItem
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
    Toolbar
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      exchangeBoxType: null
    };
  },
  computed: {
    counterPart() {
      return {
        counterpartyId: 0,
        canExchange: true,
        exchangeBoxType: 0,
        employee: null,
        organizationId: null,
        url: null,
        publicKey: null,
        ...this.data
      };
    },
    exchangeBoxTypeOptions() {
      return {
        dataSource: Object.values(counterpartyExchangeBoxType),
        displayExpr: this.customizeText,
        onValueChanged: e => {
<<<<<<< HEAD
          this.counterPart.employee = null;
=======
>>>>>>> recipient-visibility-restriction
          this.exchangeBoxType = e.value;
        }
      };
    },
<<<<<<< HEAD
    isIntranet() {
      return this.exchangeBoxType === counterpartyExchangeBoxType.intranet;
    },
    ifEResminama() {
      return this.exchangeBoxType === counterpartyExchangeBoxType.eResminama;
=======
    ifEResminama() {
      return this.exchangeBoxType == counterpartyExchangeBoxType.eResminama;
>>>>>>> recipient-visibility-restriction
    }
  },
  methods: {
    changeEmployee(value) {
      this.counterPart.employee = value;
      this.$refs["form"].instance.repaint();
    },
    submit() {
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.exchange.UpdateExchangeInfo, this.counterPart),
        e => {
          this.$emit("close");
          this.$awn.success();
        },
        e => {
          this.$awn.alert();
        }
      );
    },
    customizeText(e) {
      for (const key in counterpartyExchangeBoxType) {
        if (counterpartyExchangeBoxType[key] == e) {
          return this.$t(`exchange.providers.${key}`);
        }
      }
    }
  }
};
</script>

