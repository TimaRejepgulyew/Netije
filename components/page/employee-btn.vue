<template>
  <div>
    <DxPopup
      accesskey="2324"
      :showTitle="true"
      :visible.sync="isOpenCard"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <component :isCard="true" :is="activeCard" :employeeId="employeeId" />
      </div>
    </DxPopup>
    <DxButton
      :visible="showBtn"
      :on-click="(e)=>{this.openCard(e,'update-card')}"
      icon="info"
      stylingMode="text"
      :hint="$t('translations.fields.moreAbout')"
      :useSubmitBehavior="true"
      type="default"
    ></DxButton>
    <DxButton
      :style="{position:'relative'}"
      :on-click="openCard"
      icon="plus"
      stylingMode="text"
      :hint="$t('buttons.add')"
      :useSubmitBehavior="true"
      type="default"
    ></DxButton>
  </div>
</template>
<script>
import createCard from "~/components/employee/employee-card-create.vue";
import updateCard from "~/components/employee/employee-card.vue";
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton,
    DxPopup,
    updateCard,
    createCard
  },
  data() {
    return {
      activeCard: "create-card",
      isOpenCard: false
    };
  },
  computed: {
    showBtn() {
      return this.employeeId ? true : false;
    }
  },
  methods: {
    openCard(e) {
      this.isOpenCard = !this.isOpenCard;
    }
  },
  props: ["employeeId"]
};
</script>
