<template>
  <div class="d-flex">
    <DxTextBox
      :placeholder="$t('shared.select')"
      :read-only="readOnly"
      :value="fieldData && fieldData.name"
    />
    <DxDropDownButton
      :focusStateEnabled="false"
      :hoverStateEnabled="false"
      :showArrowIcon="false"
      :visible="allowCreateCounterPart"
      icon="plus"
      :drop-down-options="{ width: 150 }"
      :items="dropDownBtnItems"
      display-expr="name"
      :hint="$t('buttons.add')"
      stylingMode="text"
      :style="{ position: 'relative', color: 'green' }"
      @item-click="createCounterPart"
    />
    <DxButton
      :on-click="openCard"
      :visible="this.isSelected && this.allowReadCounterPartDetails"
      icon="info"
      stylingMode="text"
      :hint="$t('buttons.showCard')"
    />
    <DxButton
      :on-click="openGird"
      :visible="!this.readOnly && this.allowReadCounterPartDetails"
      icon="more"
      stylingMode="text"
    />
  </div>
</template>
<script>
import { DxDropDownButton } from "devextreme-vue";
import company from "~/components/parties/company-card.vue";
import bank from "~/components/parties/bank-card.vue";
import person from "~/components/parties/person-card.vue";
import EntityType from "~/infrastructure/constants/entityTypes";
import { DxButton } from "devextreme-vue";
import { DxTextBox } from "devextreme-vue";
import counterPartGrid from "~/components/parties/counter-part-grid.vue";
export default {
  components: {
    DxTextBox,
    DxButton,
    DxDropDownButton,
    counterPartGrid,
    company,
    bank,
    person,
  },
  props: {
    readOnly: {
      type: Boolean,
    },
    notPerson: {},
    fieldData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      activeCard: null,
      isOpenCardCreate: false,
      dropDownBtnItems: [
        { name: this.$t("counterPart.Company"), type: "company" },
        { name: this.$t("counterPart.Bank"), type: "bank" },
        {
          name: this.$t("counterPart.Person"),
          type: "person",
          visible: !this.notPerson,
        },
      ],
    };
  },
  computed: {
    allowReadCounterPartDetails() {
      return this.$store.getters["permissions/allowReading"](
        EntityType.Counterparty
      );
    },
    allowCreateCounterPart() {
      return this.$store.getters["permissions/allowCreating"](
        EntityType.Counterparty
      );
    },
    cardGridBtnOptions() {
      return {
        icon: "more",
        visible: !this.readOnly && this.allowReadCounterPartDetails,
      };
    },
    cardDetailCounterPartOptions() {
      return {
        icon: "info",
        hint: this.$t("buttons.showCard"),
        visible: this.isSelected && this.allowReadCounterPartDetails,
      };
    },
    isSelected() {
      return this.fieldData?.id ? true : false;
    },
    showCardByType() {
      return this.fieldData?.type.toLowerCase();
    },
  },
  methods: {
    openGird() {
      this.$popup.counterPartGrid(
        this,
        {
          emits: { valueChanged: "valueChanged" },
        },
        {
          showLoadingPanel: false,
        }
      );
    },
    openCard() {
      this.$popup.counterPartCard(this, {
        counterpartId: this.fieldData.id,
        type: this.showCardByType,
      });
    },
    createCounterPart(e) {
      this.$popup.counterPartCard(
        this,
        {
          type: e.itemData.type,
        },
        {
          showLoadingPanel: false,
        }
      );
    },
    valueChanged(data) {
      this.$emit("valueChanged", { data });
    },
    valueUpdated(data) {
      this.$emit("valueChanged", { data, updated: true });
    },
  },
};
</script>
