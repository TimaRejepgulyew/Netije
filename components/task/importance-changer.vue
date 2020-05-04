<template>
  <div class="navBar">
    <DxButton
      :text="$t('translations.fields.hightImportance')"
      :height="40"
      :onClick="(e)=>this.importanceChanged(1)"
      icon="sortup"
      :type="importance==1?'default':'normal'"
    ></DxButton>
    <DxButton
      :text="$t('translations.fields.middleImportance')"
      :height="40"
      :type="importance==0?'default':'normal'"
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
  data() {
    return {
      importance: 0
    };
  },
  methods: {
    importanceChanged(importanceType) {
      this.importance = importanceType;
      this.$emit("importanceChanged", this.importance);
    }
  }
};
</script>