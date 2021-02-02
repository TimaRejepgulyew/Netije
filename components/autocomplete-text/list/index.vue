<template>
  <div>
    <DxList
      height="70vh"
      selection-mode="single"
      search-expr="phrase"
      search-mode="contains"
      :searchEnabled="true"
      :data-source="dataSource"
      :remoteOperations="false"
      :menu-items="menuItems"
    >
      <template #item="{data}">
        <div>
          <div v-if="editingItem === data.id">
            <DxTextArea
              valueChangeEvent="input"
              ref="textArea"
              height="90px"
              @enterKey="editText"
              :value="data.phrase"
            />
            <div class="buttons">
              <DxButton :text="$t('buttons.save')" @click="editText" />
              <DxButton :text="$t('buttons.closed')" @click="closeEditing" />
            </div>
          </div>
          <div v-else>
            <div @dblclick="setText(data.phrase)">{{data.phrase}}</div>
          </div>
        </div>
      </template>
    </DxList>
    <div class="access_right_btn">
      <accessRight ref="accessRightBtn" :entityId="entityId" :entityType="entityType" />
    </div>
  </div>
</template>

<script>
import DxList from "devextreme-vue/list";
import accessRight from "~/components/access-right/entity-access-right/access-right.vue";
import dataApi from "~/static/dataApi";
import EntityType from "~/infrastructure/constants/entityTypes";
import DxTextArea from "devextreme-vue/text-area";
import DxButton from "devextreme-vue/button";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxList,
    DxTextArea,
    DxButton,
    accessRight
  },
  data() {
    return {
      entityType: EntityType.PhraseTemplate,
      entityId: null,
      editingItem: null,
      dataSource: null
    };
  },
  computed: {
    menuItems() {
      return [
        {
          text: this.$t("buttons.edit"),
          action: this.setEditingItem
        },
        {
          text: this.$t("shared.accessRight"),
          action: this.showAccessRight
        },
        {
          text: this.$t("buttons.delete"),
          action: this.deleteText
        }
      ];
    }
  },
  methods: {
    setEditingItem(e) {
      this.editingItem = e.itemData.id;
    },
    async editText(e) {
      await this.$awn.asyncBlock(
        this.$axios.put(
          dataApi.phraseTemplate.phrase + "/" + this.editingItem,
          {
            id: this.editingItem,
            phrase: this.$refs["textArea"].instance["_changedValue"]
          }
        ),
        e => {
          this.$awn.success();
          this.reloadDataSource();
          this.closeEditing();
        },
        e => {
          this.$alert();
        }
      );
    },
    async reloadDataSource() {
      const { data } = await this.$axios.get(dataApi.phraseTemplate.phrase);
      this.dataSource = data;
    },
    closeEditing(e) {
      this.editingItem = null;
    },
    setText(e) {
      this.$emit("valueChanged", e);
    },
    async deleteText(e) {
      await this.$axios.delete(
        dataApi.phraseTemplate.phrase + "/" + e.itemData.id
      );
      this.reloadDataSource();
    },
    showAccessRight(e) {
      this.entityId = e.itemData.id;
      setTimeout(() => {
        this.$refs["accessRightBtn"].$el.click();
      }, 0);
    }
  },
  async created() {
    const { data } = await this.$axios.get(dataApi.phraseTemplate.phrase);
    this.dataSource = data;
  }
};
</script>

<style lang="scss">
.access_right_btn {
  opacity: 0;
  width: 1px;
  height: 1px;
  z-index: -1;
  position: absolute;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  margin: 5px 0 0 0;
}
</style>