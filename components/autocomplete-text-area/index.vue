<template>
  <div>
    <DxTextArea ref="textArea" valueChangeEvent="input" :height="90" :value.sync="value" />
    <div class="tag_box" :style="`maxWidth:${tagBoxMaxWidth}px`">
      <div class="tag" v-for="(text,index) in filteredText" :key="index" :title="text">
        <div class="text" @click="setText(text)">{{text}}</div>
        <DxButton
          icon="clear"
          styling-mode="text"
          :focusStateEnabled="false"
          :activeStateEnabled="false"
          :hoverStateEnabled="false"
          @click="removeText"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DxTextArea from "devextreme-vue/text-area";
import DxButton from "devextreme-vue/button";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    DxTextArea,
    DxButton
  },
  props: {
    options: {
      type: Object
    },
    category: {
      type: String
    },
    entityType: {
      type: Number
    }
  },
  data() {
    return {
      tagBoxMaxWidth: 300,
      value: "",
      autocompleteTextItems: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem et quo perspiciatis fuga commodi assumenda qui quisquam esse eos dolore? Iste dolorem beatae ipsum adipisci, quisquam ullam hic optio nesciunt.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem et quo perspiciatis fuga commodi assumenda qui quisquam esse eos dolore? Iste dolorem beatae ipsum adipisci, quisquam ullam hic optio nesciunt."
      ]
    };
  },
  computed: {
    autoText() {
      return this.$store.getters["autocomlete-texts/getAll"]({
        category: 1,
        entityType: 1
      });
    },
    filteredText() {
      return this.autocompleteTextItems.filter(item => {
        return item.indexOf(this.value) !== -1;
      });
    }
  },
  methods: {
    setText(text) {
      this.value = text;
    },
    removeText() {
      console.log("removed");
    }
  },
  created() {
    // console.log(this.autoText, "auto", this.entityType);
  },
  mounted() {
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
  min-height: 30px;
  max-height: 70px;
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