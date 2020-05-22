<template>
  <div class="lang-panel">

    <DxSelectBox
      styling-mode
      v-model="activeLang"
      :items=" languages"
      :grouped="true"
      display-expr="name"
      value-expr="value"
      :width="150"
      
    >
    
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
      this.$i18n.setLocaleCookie(val);
      window.location.href = this.switchLocalePath(val);
    }
  },
  components: {
    DxSelectBox
  }
};
</script>

<style lang="scss"  >
@import "~assets/themes/generated/variables.base.scss";

.lang-icon {
  position: relative;
  top: 25%;
  width: 25px;
  height: 25px;
}
.lang-panel {
  display: flex;
  align-items: center;
}

</style>
