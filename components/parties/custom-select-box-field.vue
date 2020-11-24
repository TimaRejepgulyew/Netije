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
import EntityType from "~/infrastructure/constants/entityTypes";
import { DxButton } from "devextreme-vue";
import { DxTextBox } from "devextreme-vue";
export default {
  components: {
    DxTextBox,
    DxButton,
    DxDropDownButton,
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
        {},
        {
          showLoadingPanel: false,
        },
        {
          listeners: [
            { eventName: "valueChanged", handlerName: "valueChanged" },
          ],
        }
      );
    },
    openCard() {
      this.$popup.counterPartCard(
        this,
        {
          counterpartId: this.fieldData.id,
          type: this.showCardByType,
        },
        {
          listeners: [
            { eventName: "valueChanged", handlerName: "valueChanged" },
          ],
        }
      );
    },
    createCounterPart(e) {
      this.$popup.counterPartCard(
        this,
        {
          type: e.itemData.type,
        },
        {
          showLoadingPanel: false,
          listeners: [
            { eventName: "valueChanged", handlerName: "valueChanged" },
          ],
        }
      );
    },
    valueChanged(data) {
      this.$emit("valueChanged", data);
    },
  },
};
</script>
