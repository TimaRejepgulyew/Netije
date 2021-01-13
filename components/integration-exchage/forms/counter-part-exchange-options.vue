<template>
  <div>
    <toolbar :isCard="true" :canExchange="false" @saveChanges="submit" :canSave="true" />
    <DxForm :form-data="counterPart" col-count="2">
      <DxGroupItem :caption="$t('exchange.fields.reception')">
        <DxSimpleItem data-field="organizationId">
          <DxLabel location="left" :text="$t('exchange.fields.organizationId')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="publicKey">
          <DxLabel location="left" :text="$t('exchange.fields.publicKey')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :caption="$t('exchange.fields.dispatch')">
        <DxSimpleItem
          editor-type="dxSelectBox"
          :editor-options="exchangeBoxTypeOptions"
          data-field="exchangeBoxType"
        >
          <DxLabel location="left" :text="$t('exchange.fields.exchangeBoxType')" />
        </DxSimpleItem>
        <DxSimpleItem editor-type="dxTextArea" data-field="url">
          <DxLabel location="left" text="URL" />
        </DxSimpleItem>
        <!-- <DxGroupItem :visible="ifEResminama">
          <DxSimpleItem data-field="eId"></DxSimpleItem>
          <DxSimpleItem data-field="ePass" :editor-options="{mode:'password'}"></DxSimpleItem>
        </DxGroupItem> -->
      </DxGroupItem>

      <DxSimpleItem :col-span="2" data-field="canExchange">
        <DxLabel location="left" :text="$t('exchange.fields.canExchange')" />
      </DxSimpleItem>
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
import dataApi from "~/static/dataApi";
import counterpartyExchangeBoxType from "~/components/integration-exchage/infrastructure/constants/counterpartyExchangeBoxType.js";
export default {
  components: {
    DxForm,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxButtonItem,
    DxGroupItem,
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
          this.exchangeBoxType = e.value;
        }
      };
    },
    ifEResminama() {
      return this.exchangeBoxType == counterpartyExchangeBoxType.eResminama;
    }
  },
  methods: {
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

