<template>
  <div>
    <DxTextArea
      ref="textArea"
      valueChangeEvent="input"
      :value.sync="text"
      :readOnly="options.readOnly || false"
      :height="options.height || 90"
      :placeholder="options.placeholder || ''"
      :max-length="options.maxLength || null"
      :autoResizeEnabled="options.autoResizeEnabled || true"
      @focusOut="valueChanged"
      @focusIn="focusIn"
    >
      <DxValidator
        v-if="options.isRequired || false"
        :validationGroup="options.validationGroup || null"
      >
        <DxRequiredRule :message="options.requiredMessage || null" />
      </DxValidator>
    </DxTextArea>

    <div
      tabindex="0"
      @focus="focusIn"
      @blur="focusOut"
      class="tag_box"
      :style="`maxWidth:${tagBoxMaxWidth}px`"
    >
      <div
        v-show="inFocus"
        class="tag"
        v-for="(item,index) in filteredText"
        :key="index"
        :title="text"
      >
        <div class="text" @click="()=>setText(item.text)">{{item.text}}</div>
        <DxButton
          icon="clear"
          styling-mode="text"
          :focusStateEnabled="false"
          :activeStateEnabled="false"
          :hoverStateEnabled="false"
          @click="deleteText(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AutoTextCategory from "~/components/autocomplete-text-area/infrastructure/constants/autoTextCategory.js";

import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxTextArea from "devextreme-vue/text-area";
import DxButton from "devextreme-vue/button";
import { mapActions } from "vuex";

export default {
  components: {
    DxTextArea,
    DxValidator,
    DxRequiredRule,
    DxButton
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tagBoxMaxWidth: 100,
      text: this.value || "",
      inFocus: false
    };
  },
  computed: {
    autoText() {
      return this.$store.getters["autocomlete-texts/getAll"]({
        category: AutoTextCategory[this.options.category],
        entityType: this.options.entityType
      });
    },
    filteredText() {
      return this.autoText.filter(item => {
        return item.text.toLowerCase().indexOf(this.text.toLowerCase()) !== -1;
      });
    }
  },
  methods: {
    ...mapActions({
      deleteText: "autocomlete-texts/deleteText"
    }),
    valueChanged(text) {
      this.$emit("valueChanged", this.text);
      this.focusOut();
    },
    focusOut() {
      this.inFocus = false;
    },
    focusIn() {
      this.inFocus = true;
    },
    setText(text) {
      this.text = text;
    }
  },
  mounted() {
    console.log(this.options);
    setTimeout(() => {
      this.tagBoxMaxWidth = this.$refs.textArea.$el.offsetWidth;
    }, 0);
  }
};
</script>

<style lang="scss">
.tag_box {
  margin: 5px 0 5px 0;
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  height: 30px;
  overflow: hidden;
  outline: none;
  .tag {
    cursor: pointer;
    height: 29px;
    padding: 0 0 0 5px;
    overflow: hidden;
    background-color: #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.1s;
    border-radius: 5%;
    &:hover {
      background-color: #aaaaaa;
    }
    .text {
      width: 100%;
      font-size: 14px;
      line-height: 29px;
      height: 29px;
      user-select: none;
    }
  }
}
</style>