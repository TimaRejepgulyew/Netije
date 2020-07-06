<template>
  <div class="d-flex">
    <DxTextBox :placeholder="$t('shared.select')" :value="fieldData && fieldData.name" />

    <DxDropDownButton
      icon="plus"
      :drop-down-options="{ width: 150 }"
      :items="dropDownBtnItems"
      display-expr="name"
      :hint="$t('buttons.add')"
      stylingMode="text"
      :style="{position:'relative',color:'green'}"
      @item-click="createCounterPart"
    />
    <DxPopup
      width="90%"
      height="auto"
      :showTitle="false"
      :visible.sync="isOpenCardCreate"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <component
          v-if="isOpenCardCreate"
          :is="activeCard"
          @valueChanged="valueChanged"
          :isCard="true"
        />
      </div>
    </DxPopup>

    <additional-btn :button-options="cardDetailCounterPartOptions">
      <component
        slot="card"
        :counterpartId="fieldData && fieldData.id"
        :is="showCardByType"
        @valueChanged="valueUpdated"
        :isCard="true"
      />
    </additional-btn>
    <additional-btn :button-options="cardGridBtnOptions">
      <counter-part-grid slot="card" @valueChanged="valueChanged" :isCard="true" />
    </additional-btn>
  </div>
</template>
<script>
import { DxDropDownButton } from "devextreme-vue";
import { DxPopup } from "devextreme-vue/popup";
import company from "~/components/parties/company-card.vue";
import bank from "~/components/parties/bank-card.vue";
import person from "~/components/parties/person-card.vue";
import additionalBtn from "~/components/shared/additional-btn-select-box.vue";
import EntityType from "~/infrastructure/constants/entityTypes";
import { DxButton } from "devextreme-vue";
import { DxTextBox } from "devextreme-vue";
import counterPartGrid from "~/components/parties/counter-part-grid.vue";
export default {
  components: {
    DxTextBox,
    DxButton,
    DxPopup,
    DxDropDownButton,
    additionalBtn,
    counterPartGrid,
    company,
    bank,
    person
  },
  props: {
    readOnly: {
      type: Boolean,
      default: true
    },
    notPerson: {},
    fieldData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      EntityType,
      activeCard: null,
      isOpenCardCreate: false,
      dropDownBtnItems: [
        { name: this.$t("counterPart.Company"), type: "company" },
        { name: this.$t("counterPart.Bank"), type: "bank" },

        {
          name: this.$t("counterPart.Person"),
          type: "person",
          visible: !this.notPerson
        }
      ]
    };
  },
  computed: {
    cardGridBtnOptions() {
      return {
        icon: "more",
        hint: this.$t("buttons.showCard"),
        visible: !this.readOnly
      };
    },
    cardDetailCounterPartOptions() {
      return {
        icon: "info",
        hint: this.$t("buttons.showCard"),
        visible: this.isSelected
      };
    },
    isSelected() {
      return this.fieldData?.id ? true : false;
    },
    showCardByType() {
      return this.fieldData?.type.toLowerCase();
    }
  },
  methods: {
    createCounterPart(e) {
      this.activeCard = itemData.type;
      this.isOpenCardCreate = !this.isOpenCardCreate;
    },
    valueChanged(data) {
      this.$emit("valueChanged", { data });
    },
    valueUpdated(data) {
      this.$emit("valueChanged", { data, updated: true });
    }
  }
};
</script>