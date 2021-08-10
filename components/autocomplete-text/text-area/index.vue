<template>
  <div>
    <div
      class="text_area_wrapper"
      :class="{
        focused: inFocus && !options.readOnly,
        readOnly: options.readOnly,
      }"
      tabindex="-1"
    >
      <div>
        <DxTextArea
          ref="textArea"
          stylingMode="underlined"
          valueChangeEvent="input"
          :hoverStateEnabled="false"
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
      </div>
      <div v-if="!options.readOnly">
        <DxButton
          icon="hidepanel"
          styling-mode="text"
          :focusStateEnabled="false"
          :hint="$t('companyStructure.additionally.phraseTemplates')"
          :activeStateEnabled="false"
          :hoverStateEnabled="false"
          @click="showAutoTextPopup"
        />
        <DxButton
          icon="plus"
          styling-mode="text"
          :hint="$t('buttons.add')"
          :focusStateEnabled="false"
          :activeStateEnabled="false"
          :hoverStateEnabled="false"
          @click="addAutoText"
        />
      </div>
    </div>

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
        v-for="(item, index) in filteredText"
        :key="index"
        :title="text"
      >
        <div class="text" @click="() => setText(item.text)">
          {{ item.text }}
        </div>
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
import AutoTextCategory from "~/components/autocomplete-text/infrastructure/constants/autoTextCategory.js";

import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxTextArea from "devextreme-vue/text-area";
import DxButton from "devextreme-vue/button";
import { mapActions } from "vuex";
import Widget from "devextreme/ui/widget/ui.widget";

export default {
  components: {
    DxTextArea,
    DxValidator,
    DxRequiredRule,
    DxButton,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tagBoxMaxWidth: 100,
      text: this.value || "",
      inFocus: false,
    };
  },
  computed: {
    autoText() {
      return this.$store.getters["autocomlete-texts/getAll"]({
        category: AutoTextCategory[this.options.category],
        entityType: this.options.entityType,
      });
    },
    autoTextPopupButtonOptions() {
      return {
        icon: "endswith",
        stylingMode: "text",
      };
    },
    filteredText() {
      return this.autoText.filter((item) => {
        return item.text.toLowerCase().indexOf(this.text.toLowerCase()) !== -1;
      });
    },
  },
  methods: {
    ...mapActions({
      deleteText: "autocomlete-texts/deleteText",
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
      this.$emit("focusIn", this.text);
    },
    setText(text) {
      this.text = text;
      this.valueChanged(text);
    },
    addAutoText() {
      this.$awn.asyncBlock(
        this.$axios.post(this.$dataApi.phraseTemplate.phrase, {
          phrase: this.text,
        }),
        (e) => {
          this.$awn.success();
        },
        (e) => {
          this.$alert();
        }
      );
    },
    showAutoTextPopup() {
      this.$popup.autoText(
        this,
        {},
        {
          showLoadingPanel: false,
          position: "flex-start",
          width: "60vw",
          height: "80vh",
          listeners: [{ eventName: "valueChanged", handlerName: "setText" }],
        }
      );
    },
  },
  mounted() {
    setTimeout(() => {
      this.tagBoxMaxWidth = this.$refs.textArea.$el.offsetWidth;
    }, 0);
  },
};
</script>

<style lang="scss">
.text_area_wrapper {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 40px;
  padding: 0 0 0 7px;
  border: 1px solid rgba($color: #ddd, $alpha: 1);
  outline: none;
  &:focus {
    border: 1px solid rgba($color: #4cae4c, $alpha: 0.5);
  }
  &:hover {
    border: 1px solid rgba($color: #4cae4c, $alpha: 0.5);
  }
  &.focused {
    border: 1px solid #009a40;
  }
  .dx-texteditor.dx-editor-underlined {
    border: none !important;
  }
}
.readOnly {
  border: 1px dashed rgba($color: #ddd, $alpha: 1);
  &.focused {
    border: 1px dashed #009a40;
  }
  &:focus {
    border: 1px dashed rgba($color: #4cae4c, $alpha: 0.5);
  }
  &:hover {
    border: 1px dashed rgba($color: #4cae4c, $alpha: 0.5);
  }
}
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