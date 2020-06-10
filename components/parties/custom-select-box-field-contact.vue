<template>
  <div class="d-flex">
    <DxTextBox :placeholder="$t('shared.select')" :value="fieldData && fieldData.name" />
    <contact-btn

      @setContact="setContact"
      :type="fieldData ? fieldData.type:null"
      :counterpartId="fieldData ? fieldData.id:null"
    />
  </div>
</template>
<script>
import contactBtn from "~/components/parties/custom-select-box-btn-cantact.vue";
import { DxButton } from "devextreme-vue";
import { DxTextBox } from "devextreme-vue";
export default {
  components: {
    DxTextBox,
    DxButton,
    contactBtn
  },
  props: {
    corres
    fieldData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    setContact(data) {
      this.$emit("setContact", { selectedItem: data });
    }
  }
};
</script>