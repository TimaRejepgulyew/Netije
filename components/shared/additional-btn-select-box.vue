<template>
  <div>
    <!-- <DxPopup
      width="90%"
      height="95%"
      :showTitle="false"
      :visible="isOpenCard"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div class="scrool-auto">
        <slot v-if="isOpenCard" name="card" />
      </div>
    </DxPopup> -->
    <DxButton
      :visible="buttonOptions.visible"
      :on-click="openCard"
      :icon="buttonOptions.icon"
      stylingMode="text"
      :hint="buttonOptions.hint"
      :useSubmitBehavior="false"
    ></DxButton>
  </div>
</template>

<script>
import { DxButton } from "devextreme-vue";
import { DxPopup } from "devextreme-vue/popup";
export default {
  components: {
    DxButton,
    DxPopup
  },
  props: ["buttonOptions"],
  data() {
    return {
      isOpenCard: false
    };
  },
  methods: {
    openCard() {
      this.isOpenCard = !this.isOpenCard;
    }
  }
};
</script>

<style scoped>
.scrool-auto {
  width: 100%;
  height: 100%;
}
</style>