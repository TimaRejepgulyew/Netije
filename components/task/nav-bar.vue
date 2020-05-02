<template>
  <div class="navBar">
    <div>
      <slot></slot>
    </div>

    <DxButton
      :disabled="btnDisabled"
      :text="$t('translations.fields.hightImportance')"
      :height="40"
      :onClick="(e)=>this.importanceChanged(1)"
      icon="sortup"
      :type="hightImportance?'default':'normal'"
    ></DxButton>
    <DxButton
      :disabled="btnDisabled"
      :text="$t('translations.fields.middleImportance')"
      :height="40"
      icon="sorted"
      :type="middleImportance?'default':'normal'"
      :onClick="(e)=>this.importanceChanged(0)"
    ></DxButton>
  
  </div>
</template>
<script>
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import notify from "devextreme/ui/notify";
export default {
  components: {
    DxButton
  },
  props: ["btnDisabled"],
  data() {
    return {
      hightImportance: false,
      middleImportance: true,
      lowImportance: false
    };
  },
  methods: {
    importanceChanged(importanceType) {
    
      this.$emit("importanceChanged", importanceType);
    }
  }
};
</script>
<style  lang="scss" scoped>
.text--warning {
  color: crimson;
}
</style>