<template>
  <div>
    <div class="list-container">
      <DxList :data-source="comments" :search-enabled="false">
        <template #item="item">
          <div>
            <div class="d-flex">
              <div class="list__content">{{item.data.name}}</div>
              <div class="list__btn-group"></div>
            </div>
          </div>
        </template>
      </DxList>
    </div>
    <div>
      <DxTextArea :on-value-changed="addComment" :height="90" :value="comment" />
    </div>
  </div>
</template>
<script>
import DxList from "devextreme-vue/list";
import { DxTextArea } from "devextreme-vue";
export default {
  components: {
    DxList,
    DxTextArea
  },
  props: ["comments"],
  data() {
    return {
      comment: ""
    };
  },
  methods: {
    addComment(e) {
      
      this.$emit("addComment", e.value);
    }
  }
};
</script>