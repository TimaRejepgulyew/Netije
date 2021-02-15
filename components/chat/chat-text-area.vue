<template>
  <div id="chat_text_area">
    <DxTextArea
      height="135px"
      placeholder="Введите сообщение"
      stylingMode="underlined"
      valueChangeEvent="input"
      v-model.trim="value"
      @enter-key="sendMessage"
    />
    <!-- :value.sync="value" -->
  </div>
</template>


<script>
import DxTextArea from "devextreme-vue/text-area";
export default {
  components: {
    DxTextArea
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    sendMessage(e) {
      if (this.value != "") {
        this.$emit("sendMessage", this.value);
        this.value = "";
      }
    }
  }
};
</script>

<style lang="scss">
#chat_text_area {
  .dx-texteditor.dx-editor-underlined {
    border: none !important;
  }
}
</style>