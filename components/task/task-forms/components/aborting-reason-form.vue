<template>
  <form @submit.prevent="abort" action="custom">
    <DxTextArea
      :placeholder="$t('task.confirm.abortingReason')"
      :height="90"
      :width="500"
      v-model="abortingReason"
    />
    <DxButton
      :disabled="!abortingReason"
      :hint="$t('buttons.confirm')"
      :text="$t('buttons.confirm')"
      :useSubmitBehavior="true"
    />
    <DxButton
      :hint="$t('buttons.cancel')"
      :text="$t('buttons.cancel')"
      @click="cancel"
      :useSubmitBehavior="false"
    />
  </form>
</template>

<script>
import DxButton from "devextreme-vue/button";
import { DxTextArea } from "devextreme-vue";
import abortIcon from "~/static/icons/stop.svg";
export default {
  components: {
    DxTextArea,
    DxButton
  },
  data() {
    return {
      abortIcon,
      abortingReason: null
    };
  },
  methods: {
    onValueChanged(abortingReason) {
      this.$emit("");
    },
    abort() {
      this.$emit("abort", this.abortingReason);
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style></style>
