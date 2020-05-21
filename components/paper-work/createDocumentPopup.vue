<template>
  <div>
    <div class="filter__content">
      <div class="option--group" v-for="(item,index) in documentButtons" :key="index">
        <DxButton width="100%" align icon="plus" :text="item.text" :on-click="createDocument" />
      </div>
    </div>
  </div>
</template>

<script>
import { DocumentButtons } from "~/infrastructure/constants/creatingItems.js";
import DxButton from "devextreme-vue/button";
export default {
  components: {
    DxButton
  },
  data() {
    return {
      documentButtons: DocumentButtons(this)
    };
  },
  methods: {
    createDocument(e) {
      const address = `paper-work/${e.path}/add`;
      this.$router.push(address);
    }
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.filter__content {
  padding: 20px 0;
  .option--group {
    padding: 10px 0;
    text-align: start;
    .dx-button-content {
      display: flex;
    }
    .option__title {
      padding: 10px 0;
    }
    .option {
      padding: 10px 10px;
    }
  }
}
</style>