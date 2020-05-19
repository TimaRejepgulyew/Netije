<template>
  <div>
    <div>
      <DxList
        :hover-state-enabled="false"
        :activeStateEnabled="false"
        :focusStateEnabled="false"
        :data-source="comments"
        :search-enabled="false"
      >
        <template #item="item">
          <div class="list-container">
            <comment :comment="item.data" />
          </div>
        </template>
      </DxList>
    </div>
  </div>
</template>
<script>
import Comment from "~/components/workFlow/comments-item.vue";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import DxList from "devextreme-vue/list";
import moment from "moment";
export default {
  components: {
    DxList,
    Comment
  },
  props: ["url"],
  data() {
    return {
      comments: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.url + this.$route.params.id
        })
      })
    };
  }
};
</script>
<style  scoped>
.list-container {
  box-sizing: border-box;
  width: 100%;
}
</style>
