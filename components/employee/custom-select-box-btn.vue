<template>
  <div>
    <DxPopup
      :showTitle="true"
      :visible.sync="isOpenCard"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <updateCard v-if="isOpenCard" :isCard="true" :employeeId="employeeId" />
      </div>
    </DxPopup>
    <DxButton
      :visible="showBtn"
      :on-click="this.openCard"
      icon="info"
      stylingMode="text"
      :hint="$t('translations.fields.moreAbout')"
      :useSubmitBehavior="true"
      type="default"
    ></DxButton>
  </div>
</template>
<script>
import updateCard from "~/components/employee/employee-card.vue";
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton,
    DxPopup,
    updateCard
  },
  data() {
    return {
      isOpenCard: false
    };
  },
  computed: {
    showBtn() {
      return this.employeeId ? true : false;
    }
  },
  methods: {
    openCard(cardType) {
      this.isOpenCard = !this.isOpenCard;
    }
  },
  props: ["employeeId"]
};
</script>
