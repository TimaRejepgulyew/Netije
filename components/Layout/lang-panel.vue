<template>
  <div class="user-info">
    <DxSelectBox
      drop-down-button-template="globalIcon"
      styling-mode="filled"
      v-model="activeLang"
      :items=" languages"
      :grouped="true"
      display-expr="name"
      value-expr="value"
      :width="150"
    >
      <template #globalIcon>
        <img src="~assets/icon/global.svg" class="lang-icon" />
      </template>
    </DxSelectBox>
  </div>
</template>

<script>
import DxSelectBox from "devextreme-vue/select-box";

export default {
  data() {
    return {
      activeLang: this.$i18n.locale,
      languages: [
        {
          items: [
            { name: "Русский", value: "ru" },
            { name: "Turkmen", value: "tk" }
          ]
        }
      ]
    };
  },
  watch: {
    activeLang: function changeLang(val) {
      window.location.href = this.switchLocalePath(val);
    }
  },
  components: {
    DxSelectBox
  }
};
</script>

<style lang="scss" scoped >
@import "~assets/themes/generated/variables.base.scss";
.lang-icon {
  position: relative;
  top: 25%;
  width: 25px;
  height: 25px;
}
</style>
