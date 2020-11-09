<template>
  <div class="d-flex">
    <DxTextBox
      :placeholder="$t('shared.select')"
      :read-only="readOnly"
      :value="fieldData && fieldData.name"
    />
    <contact-btn
      :correspondentId="correspondentId"
      @valueChanged="valueChanged"
      :type="fieldData ? fieldData.type : null"
      :id="fieldData ? fieldData.id : null"
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
    readOnly: {
      type: Boolean
    },
    correspondentId: {},
    fieldData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    allowReadContactDetails() {
      return this.$store.getters["permissions/allowReading"](
        EntityType.Contact
      );
    }
  },
  methods: {
    valueChanged(data) {
      this.$emit("valueChanged", data);
    }
  }
};
</script>
