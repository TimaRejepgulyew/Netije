<template>
  <div class="d-flex">
    <DxTextBox :placeholder="$t('shared.select')" :value="fieldData && fieldData.name" />
    <contact-btn
      v-if="$store.getters['permissions/allowReading'](EntityType.Contact)"
      :correspondentId="correspondentId"
      @valueChanged="valueChanged"
      :type="fieldData ? fieldData.type:null"
      :id="fieldData ? fieldData.id:null"
    />
  </div>
</template>
<script>
import EntityType from "~/infrastructure/constants/entityTypes";
import contactBtn from "~/components/parties/contact/custom-select-box-btn.vue";
import { DxButton } from "devextreme-vue";
import { DxTextBox } from "devextreme-vue";
export default {
  components: {
    DxTextBox,
    DxButton,
    contactBtn
  },
  props: {
    correspondentId: {},
    fieldData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      EntityType
    };
  },
  methods: {
    valueChanged(data) {
      this.$emit("valueChanged", data);
    }
  }
};
</script>