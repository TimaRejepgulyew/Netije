<template>
  <div id="chat_text_area">
    <DxTextArea
      id="text-area"
      height="135px"
      placeholder="Введите сообщение"
      stylingMode="underlined"
      valueChangeEvent="input"
      v-model.trim="value"
      @enter-key="sendMessage"
    />

    <DxButton
      icon="export"
      type="success"
      stylingMode="text"
      @click="sendMessage"
    />
  </div>
</template>


<script>
import DxTextArea from "devextreme-vue/text-area";
import DxButton from "devextreme-vue/button";
export default {
  components: {
    DxTextArea,
    DxButton
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
  display: flex;
  .dx-texteditor.dx-editor-underlined {
    border: none !important;
  }
  #text-area {
    flex-grow: 1;
  }
}
</style>