<template>
  <div>
    <DxPopup
      width="90%"
      height="90%"
      :showTitle="true"
      :visible.sync="isOpenCardUpdate"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <component
          @setCounterPart="setCounterPart"
          v-if="isOpenCardUpdate"
          :counterpartId="counterpartId"
          :isCard="true"
          :is="activeCard"
          key="update"
        />
      </div>
    </DxPopup>
    <DxPopup
      width="90%"
      height="90%"
      :showTitle="true"
      :visible.sync="isOpenCardCreate"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <component
          @setCounterPart="setCounterPart"
          v-if="isOpenCardCreate"
          :isCard="true"
          :is="activeCard"
          :counterpartId="false"
          key="create"
        />
      </div>
    </DxPopup>
    <DxButton
      :visible="showBtn"
      :on-click="this.openCard"
      icon="info"
      stylingMode="text"
      :hint="$t('translations.fields.moreAbout')"
      :useSubmitBehavior="true"
    ></DxButton>
    <DxDropDownButton
      icon="plus"
      :drop-down-options="{ width: 100 }"
      :items="items"
      display-expr="name"
      :hint="$t('buttons.add')"
      stylingMode="text"
      :style="{position:'relative',color:'green'}"
      @item-click="createCounterPart"
    />
  </div>
</template>
<script>
import { DxDropDownButton } from "devextreme-vue";
import company from "~/components/parties/company-card.vue";
import bank from "~/components/parties/bank-card.vue";
import person from "~/components/parties/person-card.vue";
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton,
    DxButton,
    DxPopup,
    company,
    bank,
    person
  },
  data() {
    return {
      activeCard: null,
      isOpenCardUpdate: false,
      isOpenCardCreate: false,
      items: [{ name: "company", type: "company" }]
    };
  },
  computed: {
    showBtn() {
      return this.counterpartId ? true : false;
    }
  },
  methods: {
    setCounterPart(data) {
    
      this.$emit("setCounterPart", data);
    },
    openCard() {
      this.activeCard = this.type.toLowerCase();
      this.isOpenCardUpdate = !this.isOpenCardUpdate;
    },
    closeCard() {
      this.isOpenCardUpdate = false;
      this.isOpenCardCreate = false;
    },
    createCounterPart({ itemData }) {
      this.activeCard = itemData.type;
      this.isOpenCardCreate = !this.isOpenCardCreate;
    }
  },
  props: ["counterpartId", "type"]
};
</script>
<style lang="scss">
</style>